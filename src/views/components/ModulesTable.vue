<template>
  <CreateModule />
        <!-- Modal -->
        <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title">Edit Module</h5>
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
              <QuillEditor theme="snow" content-type="html" v-model:content="description" />
              <div class="modal-footer">
                  <button @click="closeModal" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary">Save changes</button>
              </div>
          </form>
          </div>
      </div>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Modules table</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                ID
              </th>
              <th class="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7 ps-2">
                Name
              </th>
              <th class="text-secondary opacity-7">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mod in modules" :key="mod.id">
              <td class="text-center">{{ mod.id }}</td>
              <td class="text-center">{{ mod.name }}</td>
              <td class="align-middle">
                <a style="cursor: pointer;" data-toggle="modal" @click="showModal(mod.id, mod.name, mod.description)"
                  class="btn btn-sm btn-outline-primary mb-0 text-secondary font-weight-bold text-xs mx-4" data-original-title="Edit user">
                  <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit
                </a>
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
    import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import CreateModule from './CreateModule.vue';
import {computed} from 'vue';
import {useStore} from "vuex";

export default {
  name: "modules-table",
  components: {
    CreateModule,
    QuillEditor
  },
  data() {
    return {
      isModalOpen: false,
      name: '',
      description: '',
      id: ''
    };
  },
  setup(){
    const store = useStore();

    let modules = computed(function () {
      return store.getters.getModules
    });


    return {
      modules
    }
  },
  mounted() {

  },
  methods: {
    showModal(id, name, desc) {
      this.id = id;
      this.name = name;
      this.description = desc;
      this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
      onEditorChange(e){
        this.description = e.container.querySelector('.ql-blank').innerHTML;
      },
      submitForm() {
        // Handle form submission here
        // For demonstration, we'll just log the user input

      this.$store.dispatch('updateModule', { id: this.id, name: this.name, description: this.description})
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