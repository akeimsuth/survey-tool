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
    <h2>{{ survey.name }}</h2>
    <div v-html="survey.description"></div>
    <div class="col-12">
      <form @submit.prevent="submitForm">
        <div v-for="(question, index) in questions" :key="index">
          <strong>{{ question.question }}</strong>
          <template v-if="question.type === 'single'">
            <div style="display: flex; flex-direction: column;" class="form-control">
              <label v-for="(option, optionIndex) in question.answers" :key="optionIndex">
                <input type="radio" :value="option.id" v-model="items[index]" @change="addItem({question: question.id, answer: option.id})"/>
                {{ option.answer }}
              </label>
            </div>
          </template>
          <template v-else-if="question.type === 'multiple'">
            <div style="display: flex; flex-direction: column;" class="form-control">
            <label v-for="(option, optionIndex) in question.answers" :key="optionIndex">
              <input type="checkbox" :value="{question: question.id, answer: option.id}" v-model="selectedAnswers" />
              {{ option.answer }}
            </label>
          </div>
          </template>
          <template v-else-if="question.type === 'input'">
            <div style="display: flex; flex-direction: column;" class="form-control">
            <input type="text" v-model="feedback" />
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
      feedback: [],
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

  },
  methods: {
    addItem(obj) {
      var match = _.find(this.selectedAnswers, {'question': obj.question});
      console.log('match: ', match);
      if(match){
          var index = _.indexOf(this.selectedAnswers, _.find(this.selectedAnswers, {'question': obj.question}));
          this.selectedAnswers.splice(index, 1, obj);
      } else {
        this.selectedAnswers.push(obj);
      }
    },
    showModal() {
      this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
    async submitForm() {
      function detectBrowser() {
        let userAgent = navigator.userAgent;
        let browserName;

        if (userAgent.match(/chrome|chromium|crios/i)) {
          browserName = "Chrome";
        } else if (userAgent.match(/firefox|fxios/i)) {
          browserName = "Firefox";
        } else if (userAgent.match(/safari/i)) {
          browserName = "Safari";
        } else if (userAgent.match(/opr\//i)) {
          browserName = "Opera";
        } else if (userAgent.match(/edg/i)) {
          browserName = "Edge";
        } else if (userAgent.match(/android/i)) {
          browserName = "Android";
        } else if (userAgent.match(/iphone/i)) {
          browserName = "iPhone";
        } else {
          browserName = "Unknown";
        }

        return browserName;
        }
        
      // Process and submit selectedAnswers to your backend, or handle the data as needed
      // console.log('Selected Answers:', _.uniqBy(JSON.parse(JSON.stringify(this.selectedAnswers)),'answers'));
      // console.log('USER::: ', this.$store.getters.getUser.data.user.id);
      var output = [];
      if(this.selectedAnswers.length < this.questions.length){
          toast('Please answer all question!', {
          autoClose: 3000,
          type: toast.TYPE.ERROR
        })
      }

      this.selectedAnswers.forEach(function(item) {
        var existing = output.filter(function(v) {
          return v.question == item.question;
        });
        if (existing.length) {
          console.log('Existing: ', existing);
          var existingIndex = output.indexOf(existing[0]);
          console.log('Existing Index: ', existingIndex);
          output[existingIndex].answer = output[existingIndex].answer.toString().concat(',',item.answer.toString()).split(",");
        } else {
          if (typeof item.answer == 'string') {
            item.answer = [item.answer];
          }
          output.push(item);
        }
      });
      console.log("Ready for API ", output);
      const data = JSON.parse(JSON.stringify(output));

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
          axios.post(`${process.env.VUE_APP_DEV}/submissions`, {
            "data": {
              "question": data[index].question,
              "answers": data[index].answer,
              "user": this.$store.getters.getUser.data.user.id,
              "survey": this.survey.id,
              "devicePlatform": window.navigator.userAgentData.platform,
              "deviceBrowser": detectBrowser(),
              "feedback": this.feedback.toString()
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
        autoClose: 3000,
        type: toast.TYPE.SUCCESS
      })
      setTimeout(() => {
        this.$router.push('/my-surveys');
      }, 3000);
    },
    submitReport(){
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.getters.getUser.data.jwt}`;
      axios.post(`${process.env.VUE_APP_DEV}/bugs`, {
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
  