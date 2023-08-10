<template>
    <div>
      <h1>Questionnaire</h1>
      <form @submit.prevent="submitForm">
        <div v-for="(question, index) in questions" :key="index">
          <p>{{ question.text }}</p>
          <template v-if="question.type === 'single'">
            <label v-for="(option, optionIndex) in question.options" :key="optionIndex">
              <input type="radio" :value="option" v-model="selectedAnswers[index]" />
              {{ option }}
            </label>
          </template>
          <template v-else-if="question.type === 'multiple'">
            <label v-for="(option, optionIndex) in question.options" :key="optionIndex">
              <input type="checkbox" :value="option" v-model="selectedAnswers[index]" />
              {{ option }}
            </label>
          </template>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        questions: [],
        selectedAnswers: []
      };
    },
    async created() {
      // Fetch data from your database, replace this with your actual API call or data retrieval method
      const response = await fetch('your-api-endpoint');
      const data = await response.json();
  
      // Assuming your data structure has an array of questions with text, type, and options
      this.questions = data.questions.map(question => ({
        text: question.text,
        type: question.type,
        options: question.options
      }));
  
      // Initialize selectedAnswers with default values
      this.selectedAnswers = Array(this.questions.length).fill([]);
    },
    methods: {
      submitForm() {
        // Process and submit selectedAnswers to your backend, or handle the data as needed
        console.log('Selected Answers:', this.selectedAnswers);
      }
    }
  };
  </script>
  
  <style>
  /* Add your CSS styling here */
  </style>
  