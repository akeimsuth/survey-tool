<template>
  <div class="text-center" style="width: 400px; margin-bottom: 1rem; display: flex; justify-content: space-between;">
    <button @click="showModal"
      class="btn bg-gradient-success d-flex align-items-center justify-content-center w-100 mt-4 mb-0">
      <i class="fas fa-plus text-sm opacity-10 px-2" aria-hidden="true"></i>
      Create Survey
    </button>
    <button @click="showTagModal"
      class="btn btn-outline-info d-flex align-items-center justify-content-center w-100 mt-4 mb-0 mx-4">
      <i class="fas fa-plus text-sm opacity-10 px-2" aria-hidden="true"></i>
      Create Tag
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
        <form class="modal-body" @submit.prevent="submitForm">
          <label>Name</label>
          <div class="mb-3">
            <input type="text" name="fullname" class="form-control" placeholder="Survey Name" aria-label="fullname"
              v-model="name" required>
          </div>
          <label>Module</label>
          <div class="mb-3">
            <select name="module" class="form-control form-select" v-model="mod">
              <option value="0">-- SELECT --</option>
              <option v-for="mod in modules" :key="mod.id" :value="mod.id">
                {{ mod.name }}
              </option>
            </select>
          </div>
          <label>Tag (optional)</label>
          <div class="mb-3">
            <select class="form-control form-select" name="tag" v-model="tag">
              <option value="0">-- SELECT --</option>
              <option v-for="t in tags" :key="t.id" :value="t.id">
                {{ t.tag }}
              </option>
            </select>
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
    <!--Tag Modal-->
    <div v-if="isTagModalOpen" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="userModalLabel">Create Tag</h5>
          <button @click="closeTagModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form class="modal-body" @submit.prevent="submitTagForm">
          <label>Name</label>
          <div class="mb-3">
            <input type="text" name="fullname" class="form-control" placeholder="Survey Name" aria-label="fullname"
              v-model="tagName" required>
          </div>
          <div class="modal-footer">
            <button @click="closeTagModal" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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
import { computed } from 'vue';
import { useStore } from "vuex";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
  components: {
    QuillEditor
  },
  data() {
    return {
      isModalOpen: false,
      isTagModalOpen: false,
      name: '',
      modules: [],
      tag: '0',
      mod: '0',
      tagName: '',
      description: ''
    };
  },
  setup() {
    const store = useStore();

    let tags = computed(function () {
      return store.getters.getTags
    });
    return {
      tags
    }
  },
  methods: {
    showModal() {
      this.fetchModules();
      this.$store.dispatch('fetchTags');
      this.isModalOpen = true;
    },
    showTagModal() {
      console.log('tag Modal');
      this.isTagModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    closeTagModal() {
      this.isTagModalOpen = false;
    },
    notify() {
      const id = toast.loading(
        'Please wait...',
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        },
      );

      setTimeout(() => {
        toast.update(id, {
          render: <div>This is a test</div>,
          autoClose: true,
          closeOnClick: true,
          closeButton: true,
          type: 'success',
          isLoading: false,
        });
        setTimeout(() => {
          // done
          toast.done(id);
        }, 1000);
      }, 2000);
    },
    submitTagForm() {
      console.log('Modal Opened');
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.user.data.jwt}`;
      axios.post(`${process.env.VUE_APP_DEV}/tags`, {
        "data": {
          "tag": this.tagName
        }
      })
        .then(() => {
          this.closeTagModal();
          toast(`Tag ${this.tagName} Created Successfully`, {
            autoClose: 3000,
            type: toast.TYPE.SUCCESS
          })
        })
        .catch(error => {
          console.error('Error creaating tag:', error);
        });
    },
    submitForm() {
      // Handle form submission here
      // For demonstration, we'll just log the user input
      this.$store.dispatch('createSurvey', { name: this.name, description: this.description, module_id: this.mod, tag_id: this.tag })
      console.log({
        name: this.name,
        modules: this.modules,
        description: this.description,
      });
      this.closeModal();
    },
    fetchModules() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.user.data.jwt}`;
      axios.get(`${process.env.VUE_APP_DEV}/modules`)
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
  