<template>
    <CreateSurvey />
    <div class="card mb-4">
      <div class="card-header pb-0">
        <h6>Surveys table</h6>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  ID
                </th>
                <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                >
                  Name
                </th>
                <th class="text-secondary opacity-7">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="survey in surveys" :key="survey.id">
                <td>{{ survey.id }}</td>
                <td>{{ survey.attributes.name }}</td>
                <td></td>
                <!-- Add other user information columns here -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import CreateSurvey from './CreateSurvey.vue';
  
  export default {
    name: "surveys-table",
    components: {
      CreateSurvey
    },
    data() {
      return {
        surveys: [],
      };
    },
    mounted() {
      this.fetchSurveys();
    },
    methods: {
      fetchSurveys() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.user.data.jwt}`;
        axios.get('https://psb.sitebix.com/api/surveys')
          .then(response => {
            this.surveys = response.data.data;
          })
          .catch(error => {
            console.error('Error fetching users:', error);
          });
      },
    },
  };
  </script>
  