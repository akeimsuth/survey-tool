<template>
  <div class="py-4 container-fluid" v-if="users">
    <div class="row">
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          title="Total Surveys"
          :value="surveys"
          :percentage="{
            value: '+505%',
            color: 'text-success',
          }"
          :icon="{
            component: 'ni ni-money-coins',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          title="Total Users"
          :value="users"
          :percentage="{
            value: '+3%',
            color: 'text-success',
          }"
          :icon="{
            component: ' ni ni-world',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          title="Total Modules"
          :value="modules"
          :percentage="{
            value: '-2%',
            color: 'text-danger',
          }"
          :icon="{
            component: 'ni ni-paper-diploma',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0">
        <mini-statistics-card
          title="Bug report"
          :value="bugs"
          :percentage="{
            value: '+5%',
            color: 'text-success',
          }"
          :icon="{
            component: 'ni ni-cart',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
    </div>
    <div class="row my-4">
      <div class="col-lg-12 col-md-8 mb-md-0 mb-4">
        <projects-card />
      </div>
    </div>

  </div>
  <div class="py-4 container-fluid" v-else>
    <div class="empty-state">
      <img :src="image" alt="Select an Account Illustration" class="illustration">
      <p style="font-size: 1.2em; font-weight: 600;">Select an account to populate</p>
    </div>
  </div>
</template>
<script>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import ProjectsCard from "./components/ProjectsCard.vue";
import US from "../assets/img/icons/flags/US.png";
import DE from "../assets/img/icons/flags/DE.png";
import GB from "../assets/img/icons/flags/GB.png";
import BR from "../assets/img/icons/flags/BR.png";
import empty_image from "../assets/img/empty_state.jpg"
import {
  faHandPointer,
  faUsers,
  faCreditCard,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";

import {computed} from 'vue';
import {useStore} from "vuex";

export default {
  name: "dashboard-default",
  data() {
    return {
      image: empty_image,
      iconBackground: "bg-gradient-success",
      faCreditCard,
      faScrewdriverWrench,
      faUsers,
      faHandPointer,
      sales: {
        us: {
          country: "United States",
          sales: 2500,
          value: "$230,900",
          bounce: "29.9%",
          flag: US,
        },
        germany: {
          country: "Germany",
          sales: "3.900",
          value: "$440,000",
          bounce: "40.22%",
          flag: DE,
        },
        britain: {
          country: "Great Britain",
          sales: "1.400",
          value: "$190,700",
          bounce: "23.44%",
          flag: GB,
        },
        brasil: {
          country: "Brasil",
          sales: "562",
          value: "$143,960",
          bounce: "32.14%",
          flag: BR,
        },
      },
    };
  },
  components: {
    MiniStatisticsCard,
    ProjectsCard,
  },
  setup(){
    const store = useStore();

    let modules = computed(function () {
      return store.getters.getModuleCount
    });
    let surveys = computed(function () {
      return store.getters.getSurveyCount
    });
    let users = computed(function () {
      return store.getters.getUserCount
    });

    let bugs = computed(function () {
      return store.getters.getBugCount
    });

    return {
      modules,
      surveys,
      users,
      bugs
    }
  },
  mounted() {

},
methods: {

}
};
</script>
<style>
   .empty-state {
      text-align: center;
      font-size: 1.2em;
    }

    .illustration {
      width: 600px;
      height: 400px;
      margin-bottom: 20px;
    }
</style>