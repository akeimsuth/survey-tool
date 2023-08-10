<template>
    <!-- Bug report form modal -->
    <div v-if="isModalOpen" class="modal-overlay"
    aria-hidden="true">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="bugReportModalLabel">Bug Report</h5>
          <button type="button" @click="closeModal" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- Bug report form -->
          <div>
            <div class="form-group">
              <label for="type">Status</label>
              <select name="type" class="form-control form-select" id="type" v-model="status">
                <option value="0">-- SELECT --</option>
                <option value="Not Addressed">Not Addressed</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div class="form-group">
              <label for="bugDescription">Comment</label>
              <textarea class="form-control" id="bugDescription" name="desc" rows="3"
                placeholder="Enter comment" v-model="comment"></textarea>
            </div>
            <!-- Add more fields as needed -->
            <button @click="submitBug" type="button" id="SubmitButton" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
 
  </div>
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
                  Page
                </th>
                <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                >
                  Type
                </th>
                <th class="text-secondary opacity-7">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="bug in bugs" :key="bug.id">
                <td>{{ bug.attributes.page }}</td>
                <td>{{ bug.attributes.type }}</td>
                <td><button @click="showModal(bug.id)" class="btn btn-warning text-white">{{ bug.attributes.status }}</button></td>
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
import {computed} from 'vue';
import {useStore} from "vuex";
  
  export default {
    name: "bug-reports-table",
    data() {
      return {
        isModalOpen: false,
        comment: '',
        status: '',
        bug_id: ''
      };
    },
    setup() {
    const store = useStore();

    let bugs = computed(function () {
      return store.getters.getBugs
    });
    return {
      bugs
    }
  },
    mounted() {
      this.$store.dispatch('fetchBugs');
    },
    methods: {
      showModal(id) {
      this.bug_id = id;
      this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
      submitBug(){
        console.log('hi');
      }
    },
  };
  </script>
  