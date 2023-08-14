<template>
  <CreateSurvey />
        <!-- Modal -->
        <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="userModalLabel">Edit Survey</h5>
              <button @click="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <form  class="modal-body" @submit.prevent="submitForm">
              <label>Name</label>
              <div class="mb-3">
                  <input type="text" name="fullname" class="form-control" placeholder="Survey Name" aria-label="fullname" v-model="name" required>
              </div>
              <!-- <label>Module</label>
              <div class="mb-3">
                  <select name="module" class="form-control form-select">
                    <option>-- SELECT --</option>
                    <option v-for="mod in modules" :key="mod.id" :value="mod.id">
                        {{ mod.name }}
                    </option>
                  </select>
              </div> -->
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
      <h6>Surveys table</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                ID
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                Name
              </th>
              <th class="text-secondary opacity-7">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="survey in surveys" :key="survey.id">
              <td>{{ survey.id }}</td>
              <td>{{ survey.name }}</td>
              <td class="align-middle">
                <div class="col-4">
                  <a style="cursor: pointer;" data-toggle="modal" @click="showModal(survey.id, survey.name, survey.description)"
                    class="text-secondary font-weight-bold text-xs mx-4" data-original-title="Edit user">
                    <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit
                  </a>
                  <router-link
                  :to="{
                    name: 'Questions',
                    params: {
                      id: survey.id
                    }
                  }">
                  <a class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                    data-original-title="Add question">
                    <i class="ni ni-world text-dark me-2" aria-hidden="true"></i>Add Question(s)
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
import CreateSurvey from './CreateSurvey.vue';
import {computed} from 'vue';
import {useStore} from "vuex";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
export default {
  name: "surveys-table",
  components: {
    CreateSurvey,
    QuillEditor
  },
  data() {
    return {
      isModalOpen: false,
      name: '',
      mod: '',
      id: null,
      description: ''
    };
  },
  setup(){
    const store = useStore();

    let surveys = computed(function () {
      return store.getters.getSurveys
    });

    let survey = computed(function () {
      return store.getters.getSurvey
    });
    return {
      surveys,
      survey
    }
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
      getSurvey(id){
        // this.$store.dispatch('fetchQuestions', { id: id});
        this.$store.dispatch('fetchSurvey', { id: id});
      },
      submitForm() {
        // Handle form submission here
        // For demonstration, we'll just log the user input

        this.$store.dispatch('updateSurvey', { id: this.id, name: this.name, description: this.description})
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