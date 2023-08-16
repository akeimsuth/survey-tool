<template>
    <div class="text-center" style="width: 20%; margin-bottom: 1rem;">
      <button @click="showModal" class="btn bg-gradient-success d-flex align-items-center justify-content-center w-100 mt-4 mb-0">
          <i class="ni ni-world text-sm opacity-10 px-2" aria-hidden="true"></i>
          Create Module
      </button>
    </div>
    <div>
      <!-- Modal -->
      <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title">Create Module</h5>
              <button @click="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <form  class="modal-body" @submit.prevent="submitForm">
              <label>Name</label>
              <div class="mb-3">
                  <input type="text" name="fullname" class="form-control" placeholder="Full Name" aria-label="fullname" v-model="name" required>
              </div>
              <label>Description</label>
              <QuillEditor theme="snow" v-model="description"/>
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
        description: ''
      };
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

      this.$store.dispatch('createModule', { name: this.name, description: this.description})
        console.log({
          name: this.name,
          description: this.description,
        });
        this.closeModal();
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
  