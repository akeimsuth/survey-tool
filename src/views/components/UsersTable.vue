<template>
  <CreateUser />
  <!-- Modal -->
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="userModalLabel">Edit User</h5>
        <button @click="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form class="modal-body" @submit.prevent="submitForm">
        <label>Username</label>
        <div class="mb-3">
          <input type="text" name="username" class="form-control" placeholder="Username" aria-label="username"
            v-model="username" required>
        </div>
        <label>Email</label>
        <div class="mb-3">
          <input type="email" name="email" class="form-control" placeholder="Email" aria-label="email" v-model="email"
            required>
        </div>
        <!-- <label>Role</label>
              <div class="mb-3">
                  <select name="role" class="form-control form-select">
                      <option value="1">Administrator</option>
                      <option value="2">User</option>
                  </select>
              </div> -->
        <label>Password</label>
        <div class="mb-3" style="display:flex;align-items: baseline;">
          <input :type="type" id="user_password" name="password" class="form-control" placeholder="Password"
            aria-label="password" v-model="password" required>
          <i v-if="type === 'text'" id="icon" class="fas fa-eye mx-4" @click="showPassword"></i>
          <i v-else id="icon" class="fas fa-eye-slash mx-4" @click="showPassword"></i>
          <button style="margin-left: 1rem" class="btn btn-primary" type="button" id="generate_password"
            @click="generateRandomPassword">Generate</button>
        </div>
        <div class="modal-footer">
          <button @click="closeModal" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Save changes</button>
        </div>
      </form>
    </div>
  </div>
    <!-- Modal -->
    <div v-if="issModalOpen" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="userModalLabel">Assign User</h5>
        <button @click="closeModall" type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form class="modal-body">
        <div v-if="assigned">
          <label>Assigned Surveys</label>
          <ul id="input_group" v-for="assign in assigned" :key="assign.id">
            <li name="survey">{{ assign.name }}<a class="px-2 mx-2 del-survey">Remove</a></li>
          </ul>
        </div>
        <label>Survey(s)</label>
        <div class="mb-3">
          <select class="form-control form-select" v-model="survey_id" @change="getSurvey">
            <option>--SELECT--</option>
            <option name="survey_id" v-for="survey in surveys" :key="survey.id" :value="survey.id">{{ survey.attributes.name }}</option>
          </select>
        </div>

        <div class="modal-footer">
          <button @click="closeModall" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button @click="submitFormm" type="button" class="btn btn-primary">Save changes</button>
        </div>
      </form>
    </div>
  </div>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Users table</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                Name
              </th>
              <th class="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7 ps-2">
                Role
              </th>
              <th class="text-secondary opacity-7">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="use in users" :key="use.id">
              <td class='text-center'>{{ use.username }}</td>
              <td class='text-center'>{{ use.role.name }}</td>
              <td class="align-middle">
                <div class="col-4">
                  <a style="cursor: pointer;" @click="showModal(use.id)" data-toggle="modal" class="text-secondary font-weight-bold text-xs mx-4"
                    data-original-title="Edit user">
                    <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit
                  </a>
                  <a style="cursor: pointer;" @click="showModall(use.id)" v-show="use.role.type === 'authenticated'" data-toggle="modal"
                    class="text-secondary font-weight-bold text-xs mx-4" data-original-title="Edit user">
                    <i class="fas fa-plus-alt text-dark me-2" aria-hidden="true"></i>Assign Survey
                  </a>
                </div>
              </td>
              <!-- Add other user information columns here -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import CreateUser from './CreateUser.vue';
import { computed } from 'vue';
import { useStore } from "vuex";
export default {
  name: "users-table",
  components: {
    CreateUser
  },
  data() {
    return {
      isModalOpen: false,
      issModalOpen: false,
      user_id: '',
      username: '',
      email: '',
      password: '',
      survey_id: '',
      type: 'password'
    };
  },
  setup() {
    const store = useStore();

    let users = computed(function () {
      return store.getters.getUsers
    });

    let surveys = computed(function () {
      return store.getters.getSurveys
    });

    let surve = computed(function () {
      return store.getters.getSurvey
    });

    
    let assigned = computed(function () {
      return store.getters.getAssignedSurveys
    });

    let user = computed(function () {
      return store.getters.getSingleUser
    });

    return {
      users,
      user,
      surveys,
      surve,
      assigned
    }
  },
  mounted() {
    this.$store.dispatch('fetchSurveys');
  },
  methods: {
    showModal(id) {
      this.$store.dispatch('fetchUser', { id: id});
      this.username = this.user?.username;
      this.email = this.user?.email;
      this.isModalOpen = true;
    },
    showModall(id) {
        this.user_id = id;
        this.$store.dispatch('fetchAssignedSurveys', { id: id});
        //this.$store.dispatch('fetchAssignedSurveys', { id: id});
        console.log("ASSIGNED: ",this.assigned);
        this.issModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
      getSurvey(){
        this.$store.dispatch('fetchSurvey', { id: this.survey_id});
      },
      closeModall() {
        this.issModalOpen = false;
      },
      submitForm() {
        // Handle form submission here
        // For demonstration, we'll just log the user input
        this.$store.dispatch('updateUser', { id: this.id, username: this.username, email: this.email, password: this.password})
        console.log({
          name: this.username,
          description: this.email,
        });
        this.closeModal();
      },
      submitFormm() {
        // Handle form submission here
        // For demonstration, we'll just log the user input
        this.$store.dispatch('updateSurvey', { id: this.survey_id, name: this.surve.attributes.name, description: this.surve.attributes.description, users: this.user_id})
        console.log({
          name: this.username,
          description: this.email,
        });
        this.closeModall();
      },
      showPassword(){
        // Create a reactive variable to hold the selected input type
        if(this.type === 'password'){

            this.type = 'text';
        } else {
            this.type = 'password';
        }
      },
      generateRandomPassword() {
        // Generate a random password (you can customize this further if needed)
        const randomPassword = Math.random().toString(36).slice(-8); // 8 characters long
        this.password = randomPassword;
      },
  },
};
</script>
<style>
.del-survey{
  border: 1px solid red;
  color: #fff !important;
  background-color: red;
  border-radius: 0.2rem;
  cursor: pointer;
}
</style>