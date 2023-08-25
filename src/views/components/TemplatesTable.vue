<template>
  <CreateTemplate />
      <!-- Modal -->
      <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="userModalLabel">Edit Template</h5>
            <button @click="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <form  class="modal-body" @submit.prevent="submitForm">
            <label>Name</label>
            <div class="mb-3">
                <input type="text" name="fullname" class="form-control" placeholder="Template Name" aria-label="fullname" v-model="name" required>
            </div>
            <label>Description</label>
            <QuillEditor theme="snow" content-type="html" v-model:content="description"/>
            <div class="modal-footer">
                <button @click="closeModal" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
        </form>
        </div>
    </div>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Templates table</h6>
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
            <tr v-for="temp in templates" :key="temp.id">
              <td class='text-center'>{{ temp.id }}</td>
              <td class='text-center'>{{ temp.name }}</td>
              <td class="align-middle">
                <div class="col-4">
                  <a style="cursor: pointer;" @click="showModal(temp.id, temp.name, temp.description)" data-toggle="modal"
                    class="btn btn-sm btn-outline-primary mb-0 text-secondary font-weight-bold text-xs mx-4"
                    data-original-title="Edit user">
                    <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit
                  </a>
                  <router-link
                  :to="{
                    name: 'TemplateQuestions',
                    params: {
                      id: temp.id
                    }
                  }">
                  <a @click="getTemplate(temp.id)" href="#" class="btn btn-sm btn-outline-success mb-0 text-secondary font-weight-bold text-xs"
                    data-toggle="tooltip" data-original-title="Add question">
                    <i class="fas fa-plus text-dark me-2" aria-hidden="true"></i>Add Question(s)
                  </a>
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
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import CreateTemplate from './CreateTemplate.vue';
import {computed} from 'vue';
import {useStore} from "vuex";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
  name: "templates-table",
  components: {
    CreateTemplate,
    QuillEditor
  },
  data() {
    return {
      id: '',
      name: '',
      description: '',
      isModalOpen: false
    };
  },
  setup(){
    const store = useStore();

    let templates = computed(function () {
      return store.getters.getTemplates
    });
    let template = computed(function () {
      return store.getters.getTemplate
    });

    return {
      templates,
      template
    }
  },
  mounted() {
    this.$store.dispatch('fetchTemplates');
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
      getTemplate(id){
        this.$store.dispatch('fetchTemplate', { id: id});
      },
      submitForm() {
        // Handle form submission here
        // For demonstration, we'll just log the user input

        this.$store.dispatch('updateTemplate', { id: this.id, name: this.name, description: this.description})

        this.closeModal();
        toast('Template updated successfully!',
        {
          autoClose: 5000,
          type: toast.TYPE.SUCCESS,
        })
      },
  },
};
</script>
  