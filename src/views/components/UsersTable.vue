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
            aria-label="password" v-model="password">
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
    <!-- User Survey Modal -->
    <div v-if="issModalOpen" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="userModalLabel">Assign User</h5>
        <button @click="closeSurveyModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form class="modal-body">
        <label>Assigned Surveys</label>
        <div v-if="assigned != null" style="display:flex; flex-wrap: wrap;">
          <ul class="badge-text-parent" id="input_group" v-for="assign in assigned" :key="assign.id">
            <li class="badge-text-container" name="survey">
              <span class="badge-text">{{ assign.name }}</span>
              <span class="close-icon" @click="removeUserFromSurvey(assign.id, user_id)">&times;</span>
            </li>
          </ul>
        </div>
        <button type="button" class="btn btn-sm btn-outline-warning" @click="addAllSurveys">Add All Surveys</button><br/>
        <label>Survey(s)</label>
        <div class="mb-3">
          <select class="form-control form-select" v-model="survey_id" @change="getSurvey">
            <option>--SELECT--</option>
            <option name="survey_id" v-for="survey in surveys" :key="survey.id" :value="survey.id">{{ survey.name }}</option>
          </select>
        </div>

        <div class="modal-footer">
          <button @click="closeSurveyModal" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button @click="submitSurveyForm" type="button" class="btn btn-primary">Save changes</button>
        </div>
      </form>
    </div>
  </div>

      <!-- User Template Modal -->
      <div v-if="isTemplateModalOpen" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="userModalLabel">Assign User</h5>
        <button @click="closeModalTemplates" type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form class="modal-body">
        <div v-if="assignedTemp">
          <label>Assigned Template</label>
          <ul class="badge-text-parent" id="input_group">
            <li class="badge-text-container" name="survey">
              <span class="badge-text">{{ assignedTemp.name }}</span>
              <span class="close-icon" @click="removeUserFromTemplate(assignedTemp.id, user_id)">&times;</span>
            </li>
          </ul>
        </div>
        <label>Template(s)</label>
        <div class="mb-3">
          <select class="form-control form-select" v-model="template_id" @change="getTemplate">
            <option value="0">--SELECT--</option>
            <option name="survey_id" v-for="template in templates" :key="template.id" :value="template.id">{{ template.name }}</option>
          </select>
        </div>

        <div class="modal-footer">
          <button @click="closeModalTemplates" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button @click="submitFormTemplates" type="button" class="btn btn-primary">Save changes</button>
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
              <th class="text-uppercase text-secondary text-center text-xs font-weight-bolder opacity-7">
                Name
              </th>
              <th class="text-uppercase text-secondary text-center text-xs font-weight-bolder opacity-7 ps-2">
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
                  <a style="cursor: pointer;" @click="showModal(use.id, use.username, use.email)" data-toggle="modal" class="btn btn-sm btn-outline-primary mb-0 text-secondary font-weight-bold text-xs mx-4"
                    data-original-title="Edit user">
                    <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit
                  </a>
                  <a style="cursor: pointer;" @click="showSurveyModal(use.id)" v-show="use.role.type === 'authenticated'" data-toggle="modal"
                    class="btn btn-sm btn-outline-warning mb-0 text-secondary font-weight-bold text-xs mx-4" data-original-title="Edit user">
                    <i class="fas fa-plus text-dark me-2" aria-hidden="true"></i>Assign Survey
                  </a>
                  <a style="cursor: pointer;" @click="showTemplateModal(use.id)" v-show="use.role.type === 'authenticated'" data-toggle="modal"
                    class="btn btn-sm btn-outline-success mb-0 text-secondary font-weight-bold text-xs mx-4" data-original-title="Edit user">
                    <i class="fas fa-plus text-dark me-2" aria-hidden="true"></i>Assign Template
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
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import _ from "lodash";
import axios from 'axios';
export default {
  name: "users-table",
  components: {
    CreateUser
  },
  data() {
    return {
      isModalOpen: false,
      issModalOpen: false,
      isTemplateModalOpen: false,
      user_id: '',
      username: '',
      email: '',
      password: '',
      survey_id: '',
      template_id: '0',
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

    let templates = computed(function () {
      return store.getters.getTemplates
    });

    let surve = computed(function () {
      return store.getters.getSurvey
    });

    let temp = computed(function () {
      return store.getters.getTemplate
    });

    
    let assigned = computed(function () {
      return store.getters.getAssignedSurveys
    });

    let assignedTemp = computed(function () {
      return store.getters.getAssignedTemplates
    });

    let user = computed(function () {
      return store.getters.getSingleUser
    });

    return {
      users,
      user,
      surveys,
      surve,
      assigned,
      assignedTemp,
      templates,
      temp
    }
  },
  mounted() {
    this.$store.dispatch('fetchSurveys', 0);
  },
  methods: {
    showModal(id, username, email) {
      this.user_id = id;
      this.username = username;
      this.email = email;
      this.isModalOpen = true;
    },
    showSurveyModal(id) {
        this.user_id = id;
        this.$store.dispatch('fetchAssignedSurveys', { id: id});
        //this.$store.dispatch('fetchAssignedSurveys', { id: id});
        console.log("ASSIGNED: ",this.assigned);
        this.issModalOpen = true;
      },
      showTemplateModal(id) {
        this.user_id = id;
        this.$store.dispatch('fetchAssignedTemplates', { id: id});
        //this.$store.dispatch('fetchAssignedSurveys', { id: id});
        console.log("ASSIGNED: ",this.assignedTemp);
        this.isTemplateModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
      closeModalTemplates() {
        this.isTemplateModalOpen = false;
      },
      getSurvey(){
        this.$store.dispatch('fetchSurvey', { id: this.survey_id});
      },
      getTemplate(){
        this.$store.dispatch('fetchTemplate', { id: this.template_id});
      },
      closeSurveyModal() {
        this.issModalOpen = false;
      },
      submitForm() {
        // Handle form submission here
        // For demonstration, we'll just log the user input
        if(this.password){
          this.$store.dispatch('updateUser', { id: this.user_id, username: this.username, email: this.email, password: this.password})
        } else {
          this.$store.dispatch('updateUser', { id: this.user_id, username: this.username, email: this.email})
        }
        toast("User Info Updated!", {
                autoClose: 3000,
                type: toast.TYPE.SUCCESS
        });
        this.closeModal();
      },
      async submitSurveyForm() {
        // Handle form submission here
        // For demonstration, we'll just log the user input
        axios.get(`${process.env.VUE_APP_DEV}/surveys/${this.survey_id}?populate[users][fields][0]=id`)
        .then((response) => {
          const users_arr = _.map(response.data.data.users, 'id');
          if(!users_arr.includes(this.user_id)){
            users_arr.push(this.user_id);
            this.$store.dispatch('updateSurvey', { id: this.survey_id, name: this.surve.name, description: this.surve.description, users: users_arr})
            toast(`User Assigned to Survey ${this.surve.name}!`, {
                    autoClose: 3000,
                    type: toast.TYPE.SUCCESS
            });
            this.closeSurveyModal();
          }
        }).catch(error => console.log(error));
      },
      removeUserFromSurvey(id, user){
        axios.get(`${process.env.VUE_APP_DEV}/surveys/${id}?populate[users][fields][0]=id`)
        .then((response) => {
          const users_arr = _.filter(response.data.data.users, function(x) { return x.id !== user; })

            this.$store.dispatch('updateSurvey', { id: id, users: users_arr})
            toast(`Survey removed successfully!`, {
                    autoClose: 3000,
                    type: toast.TYPE.SUCCESS
            });
            this.closeSurveyModal();
          
        }).catch(error => console.log(error));
      },
      removeUserFromTemplate(id, user){
        axios.get(`${process.env.VUE_APP_DEV}/user-templates/${id}?populate[users][fields][0]=id`)
        .then((response) => {
          const users_arr = _.filter(response.data.data.users, function(x) { return x.id !== user; })

            this.$store.dispatch('updateTemplate', { id: id, users: users_arr})
            toast(`Template removed successfully!`, {
                    autoClose: 3000,
                    type: toast.TYPE.SUCCESS
            });
            this.closeModalTemplates();
          
        }).catch(error => console.log(error));
      },
      addAllSurveys(){
        console.log('SUR: ', this.surveys);
        this.surveys.map((survey) => {
          if(_.find(this.assigned, survey.id)){
            console.log('found');
          } else{
            axios.get(`${process.env.VUE_APP_DEV}/surveys/${survey.id}?populate[users][fields][0]=id`)
        .then((response) => {
          const users_arr = _.map(response.data.data.users, 'id');
          if(!users_arr.includes(this.user_id)){
            users_arr.push(this.user_id);
            this.$store.dispatch('updateSurvey', { id: survey.id, name: survey.name, description: survey.description, users: users_arr})
          }
        }).catch(error => console.log(error));
          }
        })
        this.closeSurveyModal();
        toast(`All Surveys added to user!`, {
                autoClose: 3000,
                type: toast.TYPE.SUCCESS
        });
      },
      submitFormTemplates() {
        // Handle form submission here
        // For demonstration, we'll just log the user input
        this.$store.dispatch('updateTemplate', { id: this.template_id, name: this.temp.name, users: this.user_id})
        toast(`User Assigned to Template ${this.temp.name}!`, {
                autoClose: 3000,
                type: toast.TYPE.SUCCESS
        });
        this.closeModalTemplates();
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
.badge-text-parent {
      list-style: none;
      display: flex;
      padding: 3px;
    }

    .badge-text-container {
      display: flex;
      align-items: center;
      padding: 0px 5px;
      background-color: #e0e0e0;
      border-radius: 20px;
    }

    .badge-text {
      margin-right: 5px;
      font-size: 0.6rem;
      font-weight: bold;
    }

    .close-icon {
      cursor: pointer;
    }
</style>