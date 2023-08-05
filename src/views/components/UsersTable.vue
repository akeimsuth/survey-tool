<template>
  <CreateUser />
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Users table</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Name
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Role
              </th>
              <th class="text-secondary opacity-7">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.username }}</td>
              <td>{{ user.role.name }}</td>
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
import CreateUser from './CreateUser.vue';

export default {
  name: "users-table",
  components: {
    CreateUser
  },
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.user.data.jwt}`;
      axios.get('https://psb.sitebix.com/api/users?populate=role')
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
  },
};
</script>
