<template>
  <!-- Bug report form modal -->
  <div v-if="isModalOpen" class="modal-overlay"
    aria-hidden="true">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="bugReportModalLabel">Bug Report</h5>
          <button type="button" @click="closeModal" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- Bug report form -->
          <div>

            <input type="hidden" id="bugSurveyId" name="surveyId" value="" />
            <div class="form-group">
              <label for="page">Page</label>
              <input v-model="page" class="form-control" name="page" id="pageNum" placeholder="Enter page number">
            </div>
            <div class="form-group">
              <label for="type">Type</label>
              <select name="type" class="form-control form-select" id="type" v-model="type">
                <option value="0">-- SELECT --</option>
                <option value="technical">Technical</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label for="bugDescription">Bug Description</label>
              <textarea class="form-control" id="bugDescription" name="desc" rows="3"
                placeholder="Enter bug description" v-model="desc"></textarea>
            </div>
            <!-- Add more fields as needed -->
            <button @click="submitReport" type="button" id="SubmitButton" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
 
  </div>
  <div style="background-color: #fff" class="container-fluid py-4">
    <h2>{{ survey.attributes.name }}</h2>
    <div v-html="survey.attributes.description"></div>
    <div class="col-12">
      <form @submit.prevent="submitForm">
        <div v-for="(question, index) in questions" :key="index">
          <strong>{{ question.attributes.question }}</strong>
          <template v-if="question.attributes.type === 'single'">
            <div style="display: flex; flex-direction: column;" class="form-control">
              <label v-for="(option, optionIndex) in question.attributes.answers.data" :key="optionIndex">
                <input type="radio" :value="option.id" v-model="items[question.id]" @change="addItem(question.id, option.id)"/>
                {{ option.attributes.answer }}
              </label>
            </div>
          </template>
          <template v-else-if="question.attributes.type === 'multiple'">
            <div style="display: flex; flex-direction: column;" class="form-control">
            <label v-for="(option, optionIndex) in question.attributes.answers.data" :key="optionIndex">
              <input type="checkbox" :value="option.id" @change="addItem(question.id, option.id)" />
              {{ option.attributes.answer }}
            </label>
          </div>
          </template>
        </div>
        <button class="btn btn-info mt-3" type="submit">Submit</button>
      </form>
      <a @click="showModal" style="color: #fff;" class="btn btn-primary floating-button" data-toggle="modal" data-target="#bugReportModal">
        Report Bug
      </a>
    </div>
  </div>
</template>
  
<script>
import _ from 'lodash';
import { computed } from 'vue';
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { toast } from 'vue3-toastify';
import axios from 'axios';
import 'vue3-toastify/dist/index.css';
export default {
  data() {
    return {
      selectedAnswers: [],
      items: [],
      isModalOpen: false,
      page: '',
      type: '0',
      desc: '',
      checker: '',
    };
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const id = route.params.id;
    console.log("Survey id", id);
    store.dispatch('fetchQuestions', { id: id });
    store.dispatch('fetchSurvey', { id: id });

    let questions = computed(function () {
      return store.getters.getQuestions
    });
    let survey = computed(function () {
      return store.getters.getSurvey
    });
    console.log('Questions: ', questions);
    return {
      questions,
      survey
    }
  },
  mounted() {

  },
  async created() {
    // Fetch data from your database, replace this with your actual API call or data retrieval method

    // Initialize selectedAnswers with default values
  },
  methods: {
    emitChanges() {
      this.$emit('responses', this.selectedAnswers);
    },
    addItem(question, answers) {
      this.selectedAnswers.push({ id: question, answers: answers });
      //this.emitChanges();
    },
    showModal() {
      this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
    async submitForm() {
      // Process and submit selectedAnswers to your backend, or handle the data as needed
      console.log('Selected Answers:', _.uniqBy(JSON.parse(JSON.stringify(this.selectedAnswers)),'answers'));
      console.log('USER::: ', this.$store.getters.getUser.data.user.id);
      const data = _.uniqBy(JSON.parse(JSON.stringify(this.selectedAnswers)), 'answers');
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.getters.getUser.data.jwt}`;

      if(data.length == 0){
        toast('Please fill out the form!', {
          autoClose: 5000,
          type: toast.TYPE.ERROR
        })
        return;
      }
      for (let index = 0; index < data.length; index++) {
        if (data[index]) {
          axios.post('https://psb.sitebix.com/api/submissions', {
            "data": {
              "question": data[index].id,
              "answers": data[index].answers,
              "user": this.$store.getters.getUser.data.user.id,
              "survey": this.survey.id
            }
          }).then(() => {
            this.checker = true;
          })
            .catch(error => {
              this.checker = false;
              console.log(error);
            })
        }
      }
      toast('Submission Successfull!', {
        autoClose: 5000,
        type: toast.TYPE.SUCCESS
      })
      
    },
    submitReport(){
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.getters.getUser.data.jwt}`;
      axios.post('https://psb.sitebix.com/api/bugs', {
        "data": {
          "page": this.page,
          "description": this.desc,
          "type": this.type,
          "survey": this.survey.id,
          "status": "Not Addressed",
        }
          }).then(() => {
            toast('Bug Submitted Successfull!', {
              autoClose: 5000,
              type: toast.TYPE.SUCCESS
            })
            this.closeModal();
          })
            .catch(error => {
              toast('Bug Submission Failed!', {
                autoClose: 5000,
                type: toast.TYPE.ERROR
              })
              this.closeModal();
              console.log(error);
            })
    }
  },
};
</script>
  
<style>
.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  min-width: 400px;
  width: auto !important;
  border-radius: 5px;
}
.form-control input[type="radio"],
  .form-control input[type="checkbox"] {
      display: inline-block;
      width: auto;
  }
</style>
  