<template>
    <div class="card mb-4">
      <div class="card-header pb-0">
        <h6>My Surveys</h6>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Module
                </th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Name
                </th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Completion Date
                </th>
                <th class="text-secondary opacity-7">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="survey in surveys" :key="survey.id">
                <td>{{ survey.id }}</td>
                <td>{{ survey.name }}</td>
                <td>{{ survey?.completed }}</td>
                <td class="align-middle">
                  <div class="col-4">
                  <button v-if="survey.completed" data-toggle="modal" type="button" disabled
                      class=" btn btn-success font-weight-bold text-xs mx-4" data-original-title="Edit user">
                      COMPLETED
                  </button>
                    <router-link
                    v-else
                  :to="{
                    name: 'SurveyScreen',
                    params: {
                      id: survey.id
                    }
                  }">
                    <button data-toggle="modal" type="button"
                      class=" btn btn-secondary font-weight-bold text-xs mx-4" data-original-title="Edit user">
                      OPEN
                  </button>
                  </router-link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
    
  <script>
  import {computed} from 'vue';
  import {useStore} from "vuex";
  export default {
    name: "surveys-table",
    data() {
      return {
        name: '',
        mod: '',
        description: ''
      };
    },
    setup(){
      const store = useStore();
  
      let surveys = computed(function () {
        return store.getters.getSurveys
      });
      console.log('surveys: ', surveys);
      return {
        surveys
      }
    },
    mounted() {
      this.$store.dispatch('fetchUserSurveys');
    },
    methods: {

    },
  };
  </script>