<template>
    <div class="text-center" style="width: 20%; margin-bottom: 1rem;">
      <button @click="showModal" class="btn bg-gradient-success d-flex align-items-center justify-content-center w-100 mt-4 mb-0">
          <i class="ni ni-world text-sm opacity-10 px-2" aria-hidden="true"></i>
          Create Survey
      </button>
    </div>
    <div>
      <!-- Modal -->
      <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="userModalLabel">Create Survey</h5>
              <button @click="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <form  class="modal-body" @submit.prevent="submitForm">
              <label>Name</label>
              <div class="mb-3">
                  <input type="text" name="fullname" class="form-control" placeholder="Survey Name" aria-label="fullname" v-model="name" required>
              </div>
              <label>Module</label>
              <div class="mb-3">
                  <select name="module" class="form-control form-select">
                    <option>-- SELECT --</option>
                    <option v-for="mod in modules" :key="mod.id" :value="mod.id">
                        {{ mod.attributes.name }}
                    </option>
                  </select>
              </div>
              <label>Description</label>
              <QuillEditor theme="snow" />
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
  import axios from "axios";
  import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
  export default {
    components: {
    QuillEditor
  },
    data() {
      return {
        isModalOpen: false,
        name: '',
        modules: [],
        description: ''
      };
    },
    // mounted() {
    //   this.fetchModules();
    // },
    methods: {
      showModal() {
        this.fetchModules();
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
      submitForm() {
        // Handle form submission here
        // For demonstration, we'll just log the user input
        console.log({
          name: this.name,
          modules: this.modules,
          description: this.description,
        });
        this.closeModal();
      },
      fetchModules() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.user.data.jwt}`;
        axios.get('https://psb.sitebix.com/api/modules')
          .then(response => {
            this.modules = response.data.data;
          })
          .catch(error => {
            console.error('Error fetching modules:', error);
          });
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
  </style>
  