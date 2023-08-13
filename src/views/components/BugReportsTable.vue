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
                <option value="PWD Feedback Needed">PWD Feedback Needed</option>
                <option value="PWD Feedback Given">PWD Feedback Given</option>
                <option value="In Progress">In Progress</option>
                <option value="Addressed">Addressed</option>
                <option value="Non-Actionable">Non-Actionable</option>
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
          <table class="table align-items-center text-center mb-0">
            <thead>
              <tr>
                <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Survey
                </th>
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
                <td>{{ bug.attributes.survey.data.attributes.name }}</td>
                <td>{{ bug.attributes.page }}</td>
                <td>{{ bug.attributes.type }}</td>
                <td><button @click="showModal(bug.id, bug.attributes.type)" class="btn btn-warning text-white">{{ bug.attributes.status }}</button></td>
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
import { toast } from 'vue3-toastify';
import axios from 'axios';
import 'vue3-toastify/dist/index.css';
  export default {
    name: "bug-reports-table",
    data() {
      return {
        isModalOpen: false,
        comment: '',
        status: '0',
        bug_id: '',
        type: ''
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
      showModal(id, type) {
      this.bug_id = id;
      this.type = type;
      this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
      async submitBug(){
        const quest = await axios.post('https://psb.sitebix.com/api/bug-logs', {
          "data": {
            "comment": this.comment,
            "status": this.status,
            "bug": this.bug_id,
          }
        })
        if(quest.data.data.id){
          await axios.put(`https://psb.sitebix.com/api/bugs/${this.bug_id}`, {
          "data": {
            "status": this.status,
            "type": this.type,
            "bug_logs": quest.data.data.id,
          }
        })
          this.closeModal();
          toast("Bug Report Updated", {
            type: toast.TYPE.SUCCESS,
            autoClose: 3000,
          });
          this.$store.dispatch('fetchBugs');
        } else {
          toast("Failed to update!!", {
            type: toast.TYPE.ERROR,
            autoClose: 3000,
          });
        }
      }
    },
  };
  </script>
  