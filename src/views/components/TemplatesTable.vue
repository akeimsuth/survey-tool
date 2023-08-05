<template>
    <CreateTemplate />
    <div class="card mb-4">
      <div class="card-header pb-0">
        <h6>Templates table</h6>
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
              <tr v-for="template in templates" :key="template.id">
                <td>{{ template.id }}</td>
                <td>{{ template.attributes.name }}</td>
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
  import CreateTemplate from './CreateTemplate.vue';
  
  export default {
    name: "templates-table",
    components: {
      CreateTemplate
    },
    data() {
      return {
        templates: [],
      };
    },
    mounted() {
      this.fetchTemplates();
    },
    methods: {
      fetchTemplates() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.user.data.jwt}`;
        axios.get('https://psb.sitebix.com/api/user-templates')
          .then(response => {
            this.templates = response.data.data;
          })
          .catch(error => {
            console.error('Error fetching templates:', error);
          });
      },
    },
  };
  </script>
  