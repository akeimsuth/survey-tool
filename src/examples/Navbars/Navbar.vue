<template>
  <nav class="shadow-none navbar navbar-main navbar-expand-lg border-radius-xl" v-bind="$attrs" id="navbarBlur"
    data-scroll="true">
    <!--Modal-->
    <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="userModalLabel">Create Account</h5>
              <button @click="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <form  class="modal-body" @submit.prevent="submitForm">
              <label>Name</label>
              <div class="mb-3">
                  <input type="text" name="fullname" class="form-control" placeholder="Account Name" aria-label="fullname" v-model="fullName" required>
              </div>
              <div class="modal-footer">
                  <button @click="closeModal" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary">Save changes</button>
              </div>
          </form>
          </div>
    </div>
    <!--End Modal-->
        <!--Modal-->
        <div v-if="isUpdateModalOpen" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="userModalLabel">Update Account</h5>
              <button @click="closeUpdateModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <form  class="modal-body" @submit.prevent="updateAccount">
              <label>Name</label>
              <div class="mb-3">
                  <input type="text" name="fullname" class="form-control" placeholder="Account Name" aria-label="fullname" v-model="account_name" required>
              </div>
              <div class="modal-footer">
                  <button @click="closeUpdateModal" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary">Update Account</button>
              </div>
          </form>
          </div>
    </div>
    <!--End Modal-->
    <div class="px-3 py-1 container-fluid">
      <breadcrumbs :currentPage="currentRouteName" :textWhite="textWhite" />
      <div class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="this.$store.state.isRTL ? 'px-0' : 'me-sm-4'" id="navbar">
        <div class="ms-md-auto pe-md-3 d-flex align-items-center" >
          <div class="d-flex align-items-baseline">
            <button @click="showModal" style="text-wrap: nowrap" type="button" class="btn btn-outline-primary btn-sm mb-0 me-3 mr-4"
              data-toggle="modal" data-target="#exampleModal" v-if="auth">
              Create account
            </button>
            <i style="cursor: pointer;" class="fas fa-pencil-alt text-dark me-2" v-if="accountId & auth" @click="showUpdateModal"></i>
            <select @change="selectAccount" id="account" name="account" class="form-control form-select mb-0 me-3 px-5" v-if="auth" v-model="accountId">
              <option value="0">select account</option>
              <option v-for="account in accounts" :key="account.id" :value="account.id">
                {{ account.name }}
              </option>

            </select>


          </div>
        </div>
        <ul style="cursor:pointer" class="navbar-nav justify-content-end">
          <li class="nav-item d-flex align-items-center" @click="logout">
            <i class="fa fa-user" :class="this.$store.state.isRTL ? 'ms-sm-2' : 'me-sm-1'"></i>
            <span v-if="this.$store.state.isRTL" class="d-sm-inline d-none">يسجل دخول</span>
            <span v-else class="d-sm-inline d-none">Sign Out </span>

          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import Breadcrumbs from "../Breadcrumbs.vue";
import { mapMutations, mapActions } from "vuex";
import axios from "axios";
import {computed} from 'vue';
import {useStore} from "vuex";
export default {
  name: "navbar",
  data() {
    return {
      showMenu: false,
      accounts: [],
      isModalOpen: false,
      isUpdateModalOpen: false,
      name: '',
      accountId: localStorage.getItem('account') || 0,
      fullName: '',
      account_name: ''
    };
  },
  setup(){
    const store = useStore();

    let auth = computed(function () {
      return store.state.role == 'auth_admin'
    });


    return {
      auth
    }
  },
  props: ["minNav", "textWhite"],
  created() {
    this.minNav;
  },
  mounted() {
    this.fetchAccounts();
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),
    ...mapActions(["toggleSidebarColor"]),

    toggleSidebar() {
      this.toggleSidebarColor("bg-white");
      this.navbarMinimize();
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/sign-in');
      localStorage.clear();
      window.location.href='/sign-in';
    },
    showModal() {
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
      showUpdateModal() {
        this.isUpdateModalOpen = true;
      },
      closeUpdateModal() {
        this.isUpdateModalOpen = false;
      },
      submitForm() {
        // Handle form submission here
        // For demonstration, we'll just log the user input
        console.log({
          name: this.name,
        });
        this.closeModal();
      },
    fetchAccounts() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.user.data.jwt}`;
        axios.get('https://psb.sitebix.com/api/accounts')
          .then(response => {
            this.accounts = response.data.data;
          })
          .catch(error => {
            console.error('Error fetching accounts:', error);
          });
      },
      updateAccount() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.user.data.jwt}`;
        axios.put(`https://psb.sitebix.com/api/accounts/${this.accountId}`, {
          data: {
            name: this.account_name
          }
        })
          .then(() => {
            this.fetchAccounts();
            this.closeUpdateModal();
          })
          .catch(error => {
            console.error('Error updating account:', error);
          });
      },
      selectAccount(){
        localStorage.setItem('account', this.accountId);
        this.$store.dispatch('assignAccount', {id: this.accountId});
      }
  },
  components: {
    Breadcrumbs,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  updated() {
    const navbar = document.getElementById("navbarBlur");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10 && this.$store.state.isNavFixed) {
        navbar.classList.add("blur");
        navbar.classList.add("position-sticky");
        navbar.classList.add("shadow-blur");
      } else {
        navbar.classList.remove("blur");
        navbar.classList.remove("position-sticky");
        navbar.classList.remove("shadow-blur");
      }
    });
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