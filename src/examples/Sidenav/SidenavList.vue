<template>
  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item" v-if="auth === 'auth_admin'">
        <sidenav-collapse navText="Dashboard" :to="{ name: 'Dashboard' }">
          <template #icon>
            <shop />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item" v-if="auth === 'authenticated'">
        <sidenav-collapse navText="My Surveys" :to="{ name: 'MySurveys' }">
          <template #icon>
            <shop />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item" v-if="auth === 'auth_admin'">
        <sidenav-collapse navText="Users" :to="{ name: 'Users' }">
          <template #icon>
            <office />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item" v-if="auth === 'auth_admin'">
        <sidenav-collapse navText="Modules" :to="{ name: 'Modules' }">
          <template #icon>
            <credit-card />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item" v-if="auth === 'auth_admin'">
        <sidenav-collapse navText="Surveys" :to="{ name: 'Surveys' }">
          <template #icon>
            <credit-card />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item" v-if="auth === 'auth_admin'">
        <sidenav-collapse navText="Templates" :to="{ name: 'Templates' }">
          <template #icon>
            <shop />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item" v-if="auth === 'auth_admin'">
        <sidenav-collapse navText="BugReports" :to="{ name: 'BugReports' }">
          <template #icon>
            <credit-card />
          </template>
        </sidenav-collapse>
      </li>
      <!-- <li class="nav-item">
        <sidenav-collapse
          navText="Virtual Reality"
          :to="{ name: 'Virtual Reality' }"
        >
          <template #icon>
            <box3d />
          </template>
        </sidenav-collapse>
      </li> 
      <li class="nav-item">
        <sidenav-collapse navText="RTL" :to="{ name: 'Rtl' }">
          <template #icon>
            <settings />
          </template>
        </sidenav-collapse>
      </li> -->
      <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          ACCOUNT PAGES
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Profile" v-if="auth" :to="{ name: 'Profile' }">
          <template #icon>
            <customer-support />
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>
</template>
<script>
import SidenavCollapse from "./SidenavCollapse.vue";
import Shop from "../../components/Icon/Shop.vue";
import Office from "../../components/Icon/Office.vue";
import CreditCard from "../../components/Icon/CreditCard.vue";
// import Box3d from "../../components/Icon/Box3d.vue";
import CustomerSupport from "../../components/Icon/CustomerSupport.vue";
// import Spaceship from "../../components/Icon/Spaceship.vue";
// import Settings from "../../components/Icon/Settings.vue";
import {computed} from 'vue';
import {useStore} from "vuex";
export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: "Potawatomi Survey Tool",
      controls: "dashboardsExamples",
      isActive: "active",
    };
  },
  components: {
    SidenavCollapse,
    Shop,
    Office,
    CreditCard,
    // Box3d,
    CustomerSupport,
    // Spaceship,
    // Settings,
  },
  setup(){
    const store = useStore();

    let auth = computed(function () {
      return store.getters.getRole
    });


    return {
      auth
    }
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
  },
};
</script>
