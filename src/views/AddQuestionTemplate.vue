<template>
  <div style="background-color: #fff" class="container-fluid py-4">
    <h2>{{ template.name }}</h2>
    <div v-html="template.description"></div>
    <div class="col-12">
      <div class="mb-4">
        <div style="position: relative;">

          <div v-for="(question, index) in savedQuestions" :key="index" class="question form-group">
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
            <input class="form-control question-content" type="text" :value="question.question"
              placeholder="Enter your question" required>

            <div v-for="(answer, answerIndex) in question.user_answers" :key="answerIndex" class="answer-container">
              <div class="input-group">
                <input class="form-control question-options" type="text" :value="answer.answer"
                  placeholder="Enter your answer" required>
                <div class="input-group-append">
                  <button class="btn btn-outline-danger btn-remove-answer btn-sm px-2 mb-0"
                    @click="removeApiAnswer(answer.id)">Remove Answer</button>
                </div>
              </div>
            </div>
            <button v-if="question.type !== 'input'" class="btn btn-sm btn-secondary add-options my-3"
              @click="addAnswer(question)">Add Answer</button>
          </div>

          <div v-for="(question, index) in questions" :key="index" class="question form-group">
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
            <input class="form-control question-content" type="text" v-model="question.text"
              placeholder="Enter your question" required>

            <div v-for="(answer, answerIndex) in question.answers" :key="answerIndex" class="answer-container">
              <div class="input-group">
                <input class="form-control question-options" type="text" v-model="answer.text"
                  placeholder="Enter your answer" required>
                <div class="input-group-append">
                  <button class="btn btn-outline-danger btn-remove-answer btn-sm px-2 mb-0"
                    @click="removeAnswer(question, answerIndex)">Remove Answer</button>
                </div>
              </div>
            </div>
            <button v-if="question.type !== 'input'" class="btn btn-sm btn-secondary add-options my-3"
              @click="addAnswer(question)">Add Answer</button>
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
import axios from "axios";
// import _ from "lodash";
import 'vue3-toastify/dist/index.css';
export default {
  name: 'QuestionCreator',
  setup() {
    const selectedType = ref('single');
    const questions = ref([]);
    const store = useStore();
    const route = useRoute();
    const id = route.params.id;
    store.dispatch('fetchTemplate', { id: id });
    store.dispatch('fetchTemplateQuestions', { id: id });
    let template = computed(function () {
      return store.getters.getTemplate
    });

    let savedQuestions = computed(function () {
      return store.getters.getTemplateQuestions
    });

    const addQuestion = () => {
      questions.value.push({ type: 'none', text: '', answers: [] });
    };

    const addAnswer = (question) => {
      question.answers.push({ text: '' });
    };

    const removeAnswer = (question, index) => {
      question.answers.splice(index, 1);
    };

    const removeApiAnswer = (id) => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.getUser.data.jwt}`;
      axios.delete(`https://psb.sitebix.com/api/user-answers/${id}`)
        .then(() => {
          store.dispatch('fetchTemplateQuestions', { id: template.value.id });
        }).catch(error => console.log(error));
    }

    const submit = async () => {
      //const save_questions = _.map(savedQuestions, 'id');
      let checker = false;
      // Perform submission logic here, e.g., send data to a server
      axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.getUser.data.jwt}`;
      for (let index = 0; index < questions.value.length; index++) {
        if (questions.value[index].type === 'input' || questions.value[index].answers.length > 0) {
          const quest = await axios.post('https://psb.sitebix.com/api/user-questions', {
            "data": {
              "question": questions.value[index].text,
              "order": index + 1,
              "type": questions.value[index].type,
              "user_template": template.value.id
            }
          })
          checker = true;
          if (quest.data.data.id) {
            //save_questions.push(quest.data.data.id);
            for (let j = 0; j < questions.value[index].answers.length; j++) {
              console.log('QUEST: ', quest.data.data);
              await axios.post('https://psb.sitebix.com/api/user-answers', {
                "data": {
                  "answer": questions.value[index].answers[j].text,
                  "user_question": quest.data.data.id
                }
              });
            }
          }
        } else {
          toast("Questions must have answers!", {
            autoClose: 3000,
            type: toast.TYPE.ERROR
          });
          checker = false;
        }
      }
      if (checker) {
        toast("Questions and Answers Created Successfully!", {
          autoClose: 3000,
          type: toast.TYPE.SUCCESS
        });
      }

      console.log('Submitted Questions and Answers:', questions.value);

    };

    return {
      selectedType,
      questions,
      template,
      savedQuestions,
      addQuestion,
      addAnswer,
      removeAnswer,
      removeApiAnswer,
      submit,
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
  