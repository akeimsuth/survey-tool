<template>
    <div class="card mb-4">
      <div class="card-header pb-0">
        <h6>Bug Reports table</h6>
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
              <tr v-for="bug in bugs" :key="bug.id">
                <td>{{ bug.id }}</td>
                <td>{{ bug.attributes.name }}</td>
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
  
  export default {
    name: "bug-reports-table",
    data() {
      return {
        bugs: [],
      };
    },
    mounted() {
      this.fetchBugs();
    },
    methods: {
      fetchBugs() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.user.data.jwt}`;
        axios.get('https://psb.sitebix.com/api/bugs')
          .then(response => {
            this.bugs = response.data;
          })
          .catch(error => {
            console.error('Error fetching bugs:', error);
          });
      },
    },
  };
  </script>
  