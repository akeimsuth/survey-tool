<template>
  <div style="background-color: #fff" class="container-fluid py-4">
    <h2>{{ survey.name }}</h2>
    <div v-html="survey.description"></div>
    <div class="col-12">
      <div class="mb-4">
        <div style="position: relative;">

          <div v-for="(question, index) in savedQuestions" :key="index" class="question form-group">
            <div style="display: flex; justify-content: end;" class="input-group-append">
                  <!-- <button class="btn btn-outline-primary btn-remove-answer btn-sm px-2 mb-0" @click="updateQuestion(index)">Update Content</button> -->
                  <button class="btn btn-outline-danger btn-remove-answer btn-sm px-2 mb-0" @click="removeApiQuestion(question.id)">
                    <i class="fas fa-trash me-2" aria-hidden="true"></i>Remove Question</button>
            </div>
            <div>
              <label class="label" for="questionType">Select Question Type:</label>
              <select :value="question.type" class="form-control form-select question-type">
                <option value="0">--SELECT--</option>
                <option value="single">Single Choice</option>
                <option value="multiple">Multiple Choice</option>
                <option value="input">Input</option>
              </select>
            </div>
            <label class="label">Question {{ index + 1 }}:</label>
            <input class="form-control question-content" type="text" :value="question.question" placeholder="Enter your question" required>
            
            <div v-for="(answer, answerIndex) in question.answers" :key="answerIndex" class="answer-container">
              <div class="input-group">
                <input class="form-control question-options" type="text" :value="answer.answer" placeholder="Enter your answer" required>
                <div class="input-group-append">
                  <button class="btn btn-outline-danger btn-remove-answer btn-sm px-2 mb-0" @click="removeApiAnswer(answer.id)">Remove Answer</button>
                </div>
              </div>
            </div>
            <button v-if="question.type !== 'input'" class="btn btn-sm btn-secondary add-options my-3" @click="addAnswer(question)">Add Answer</button>
          </div>

          <div v-for="(question, index) in questions" :key="index" class="question form-group">
            <div style="display: flex; justify-content: end;" class="input-group-append">
                  <button class="btn btn-outline-danger btn-remove-answer btn-sm px-2 mb-0" @click="removeQuestion(index)">Remove Question</button>
            </div>
            <div>
              <label class="label" for="questionType">Select Question Type:</label>
              <select v-model="question.type" class="form-control form-select question-type">
                <option value="0">--SELECT--</option>
                <option value="single">Single Choice</option>
                <option value="multiple">Multiple Choice</option>
                <option value="input">Input</option>
              </select>
            </div>
            <label class="label">Question {{ index + 1 + savedQuestions.length }}:</label>
            <input class="form-control question-content" type="text" v-model="question.text" placeholder="Enter your question" required>
            
            <div v-for="(answer, answerIndex) in question.answers" :key="answerIndex" class="answer-container">
              <div class="input-group">
                <input class="form-control question-options" type="text" v-model="answer.text" placeholder="Enter your answer" required>
                <div class="input-group-append">
                  <button class="btn btn-outline-danger btn-remove-answer btn-sm px-2 mb-0" @click="removeAnswer(question, answerIndex)">Remove Answer</button>
                </div>
              </div>
            </div>
            <button v-if="question.type !== 'input'" class="btn btn-sm btn-secondary add-options my-3" @click="addAnswer(question)">Add Answer</button>
          </div>

          <!-- Add more questions and answer options as needed -->
          <div class="col-4 mt-4 mb-4">
            <button class="btn btn-secondary mx-4" type="button" @click="addQuestion">Add Question</button>
            <button class="btn btn-primary" @click="submit">Submit</button>
          </div>

        </div>
      </div>
    </div>




  </div>
</template>

<script>
import { ref } from 'vue';
import { computed } from 'vue';
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { toast } from 'vue3-toastify';
import axios from 'axios';
import 'vue3-toastify/dist/index.css';
export default {
  name: 'QuestionCreator',
  setup() {
    const selectedType = ref('single');
    const questions = ref([]);
    const store = useStore();
    const route = useRoute();
    const id = route.params.id;
    store.dispatch('fetchSurvey', { id: id });
    store.dispatch('fetchQuestions', { id: id });
    let survey = computed(function () {
      return store.getters.getSurvey
    });

    let savedQuestions = computed(function () {
      return store.getters.getQuestions
    });
    
    
    console.log('Questions: ', id);
    
    const addQuestion = () => {
      questions.value.push({ type: 'none', text: '', answers: [] });
    };

    const addAnswer = (question) => {
      question.answers.push({ text: '' });
    };

    const removeAnswer = (question, index) => {
      question.answers.splice(index, 1);
    };
    const removeQuestion = (index) => {
      questions.value.splice(index, 1);
    };
    const removeApiAnswer = (id) => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.getUser.data.jwt}`;
      axios.delete(`https://psb.sitebix.com/api/answers/${id}`)
      .then(() => {
        store.dispatch('fetchQuestions', { id: survey.value.id });
      }).catch(error => console.log(error));
    }
    const removeApiQuestion = (id) => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.getUser.data.jwt}`;
      axios.delete(`https://psb.sitebix.com/api/questions/${id}`)
      .then(() => {
        store.dispatch('fetchQuestions', { id: survey.value.id });
      }).catch(error => console.log(error));
    }
    const updateContent = async() =>{
      let checker = true;
      axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.getUser.data.jwt}`;
      for (let index = 0; index < questions.value.length; index++){
          if(questions.value[index].type === 'input' || questions.value[index].answers.length > 0){
            const quest = await axios.put(`https://psb.sitebix.com/api/questions`, {
              "data": {
                "question": questions.value[index].text,
                "order": index + 1,
                "type": questions.value[index].type,
                "survey": survey.value.id
              }
            })
            if(quest.data.data.id){
              for (let j = 0; j < questions.value[index].answers.length; j++){
                    console.log('QUEST: ', quest.data.data);
                    await axios.put('https://psb.sitebix.com/api/answers', {
                    "data": {
                      "answer": questions.value[index].answers[j].text,
                      "question": quest.data.data.id
                    }
                  });
              }
              checker = true;
            }
          } else {
            toast("Questions must have answers!", {
                autoClose: 3000,
                type: toast.TYPE.ERROR
              });
              checker = false;
          }
      }

      console.log('Submitted Questions and Answers:', questions.value);
      if(checker){
        toast("Questions and Answers Submitted!", {
          autoClose: 3000,
          type: toast.TYPE.SUCCESS
        });
      }
    }
    const submit = async() => {
      // Perform submission logic here, e.g., send data to a server
      let checker = true;
      axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.getUser.data.jwt}`;
      for (let index = 0; index < questions.value.length; index++){
          if(questions.value[index].type === 'input' || questions.value[index].answers.length > 0){
            const quest = await axios.post('https://psb.sitebix.com/api/questions', {
              "data": {
                "question": questions.value[index].text,
                "order": index + 1,
                "type": questions.value[index].type,
                "survey": survey.value.id
              }
            })
            if(quest.data.data.id){
              for (let j = 0; j < questions.value[index].answers.length; j++){
                    console.log('QUEST: ', quest.data.data);
                    await axios.post('https://psb.sitebix.com/api/answers', {
                    "data": {
                      "answer": questions.value[index].answers[j].text,
                      "question": quest.data.data.id
                    }
                  });
              }
              checker = true;
            }
          } else {
            toast("Questions must have answers!", {
                autoClose: 3000,
                type: toast.TYPE.ERROR
              });
              checker = false;
          }
      }

      console.log('Submitted Questions and Answers:', questions.value);
      if(checker){
        toast("Questions and Answers Submitted!", {
          autoClose: 3000,
          type: toast.TYPE.SUCCESS
        });
      }
    };

    return {
      selectedType,
      questions,
      survey,
      savedQuestions,
      addQuestion,
      addAnswer,
      removeAnswer,
      removeQuestion,
      removeApiQuestion,
      removeApiAnswer,
      submit,
      updateContent,
    };
  },
};
</script>

<style>
.question-container {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}

.answer-container {
  margin-top: 10px;
}
.question {
    border: 1px solid #d4d4d4;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 1px 1px 1px #c7c6c6;
}
.label {
  font-size: 1.1em;
}
</style>
