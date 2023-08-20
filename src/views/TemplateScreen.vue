<template>
  <div style="background-color: #fff" class="container-fluid py-4">
    <h2>{{ template.name }}</h2>
    <div v-html="template.description"></div>
    <div class="col-12">
      <form @submit.prevent="submitForm">
        <div v-for="(question, index) in questions" :key="index">
          <strong>{{ question.question }}</strong>
          <template v-if="question.type === 'single'">
            <div style="display: flex; flex-direction: column;" class="form-control">
              <label v-for="(option, optionIndex) in question.user_answers" :key="optionIndex">
                <input type="radio" :value="option.id" v-model="items[index]" @change="addItem({question: question.id, answer: option.id})"/>
                {{ option.answer }}
              </label>
            </div>
          </template>
          <template v-else-if="question.type === 'multiple'">
            <div style="display: flex; flex-direction: column;" class="form-control">
            <label v-for="(option, optionIndex) in question.user_answers" :key="optionIndex">
              <input type="checkbox" :value="{question: question.id, answer: option.id}" v-model="selectedAnswers" />
              {{ option.answer }}
            </label>
          </div>
          </template>
        </div>
        <button class="btn btn-info mt-3" type="submit">Submit</button>
      </form>
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
    store.dispatch('fetchTemplateQuestions', { id: id });
    store.dispatch('fetchTemplate', { id: id });

    let questions = computed(function () {
      return store.getters.getTemplateQuestions
    });
    let template = computed(function () {
      return store.getters.getTemplate
    });
    console.log('Questions: ', questions);
    return {
      questions,
      template
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
    async submitForm() {
      if(this.selectedAnswers.length < this.questions.length){
        toast('Please answer all question!', {
        autoClose: 3000,
        type: toast.TYPE.ERROR
      })
      }
      // Process and submit selectedAnswers to your backend, or handle the data as needed
      // console.log('Selected Answers:', _.uniqBy(JSON.parse(JSON.stringify(this.selectedAnswers)),'answers'));
      // console.log('USER::: ', this.$store.getters.getUser.data.user.id);
      var output = [];

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
          axios.post('${process.env.VUE_APP_DEV}/user-submissions', {
            "data": {
              "user_question": data[index].question,
              "user_answers": data[index].answer,
              "user": this.$store.getters.getUser.data.user.id,
              "template": this.template.id
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
      this.$router.push('/my-surveys');
    },
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
  