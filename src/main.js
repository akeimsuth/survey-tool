/**
=========================================================
* Vue Soft UI Dashboard - v3.0.0
=========================================================

* Product Page: https://creative-tim.com/product/vue-soft-ui-dashboard
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { createApp } from "vue";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import SoftUIDashboard from "./soft-ui-dashboard";

// Vuetify
//import 'vuetify/styles';
// import { createVuetify } from 'vuetify';
// import * as components from 'vuetify/lib/components';
// import * as directives from 'vuetify/lib/directives';

// const vuetify = createVuetify({

//   })


const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(SoftUIDashboard);
// appInstance.component("v-select", vSelect);
appInstance.mount("#app");

