<template>
    <div class="text-center" style="width: 20%; margin-bottom: 1rem;">
      <button @click="showModal" class="btn bg-gradient-success d-flex align-items-center justify-content-center w-100 mt-4 mb-0">
          <i class="ni ni-world text-sm opacity-10 px-2" aria-hidden="true"></i>
          Create User
      </button>
    </div>
    <div>
      <!-- Modal -->
      <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="userModalLabel">Create User</h5>
              <button @click="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <form  class="modal-body" @submit.prevent="submitForm">
              <label>Username</label>
              <div class="mb-3">
                  <input type="text" name="username" class="form-control" placeholder="Username" aria-label="username" v-model="username" required>
              </div>
			  <label>Email</label>
              <div class="mb-3">
                  <input type="email" name="email" class="form-control" placeholder="Email" aria-label="email" v-model="email" required>
              </div>
              <label>Role</label>
              <div class="mb-3">
                  <select name="role" class="form-control form-select">
                      <option value="1">Administrator</option>
                      <option value="2">User</option>
                  </select>
              </div>
              <label>Password</label>
              <div class="mb-3" style="display:flex;align-items: baseline;">
                  <input v-if="type === 'text'" type="text" id="user_password" name="password" class="form-control" placeholder="Password" aria-label="password" v-model="password" required>
                  <input v-else-if="type === 'password'" type="password" id="user_password" name="password" class="form-control" placeholder="Password" aria-label="password" v-model="password" required>
                  <i v-if="type === 'text'" id="icon" class="fas fa-eye mx-4" @click="showPassword"></i>
                  <i v-else-if="type === 'password'" id="icon" class="fas fa-eye-slash" @click="showPassword"></i>
                  <button style="margin-left: 1rem" class="btn btn-primary" type="button" id="generate_password" @click="generateRandomPassword">Generate</button>
              </div>
              <div class="modal-footer">
                  <button @click="closeModal" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary">Save changes</button>
              </div>
          </form>
          </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  export default {
    data() {
      return {
        isModalOpen: false,
        username: '',
        email: '',
        password: '',
        type: 'password'
      };
    },
    setup() {
    // Create a reactive variable to hold the selected input type
    const selectedInputType = ref('text');

    // Create a reactive variable to hold the input value
    const inputValue = ref('');

    return { selectedInputType, inputValue };
  },
    methods: {
      showModal() {
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
      submitForm() {
        // Handle form submission here
        // For demonstration, we'll just log the user input
        console.log({
          name: this.username,
          email: this.email,
          password: this.password,
        });
        this.closeModal();
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
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background-color: #fff;
    padding: 20px;
    width: auto !important;
    border-radius: 5px;
  }
  #icon{
      position: absolute;
      left: 9rem;
      bottom: 9rem;
      font-size: 1.2rem;
      cursor: pointer;
    }
  </style>
  