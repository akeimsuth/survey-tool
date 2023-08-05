import { createStore } from "vuex";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import axios from "axios";

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    isTransparent: "",
    isRTL: false,
    isAuthenticated: false,
    color: "",
    user: null,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    navbarFixed:
      "position-sticky blur shadow-blur left-auto top-1 z-index-sticky px-0 mx-4",
    absolute: "position-absolute px-4 mx-0 w-100 z-index-2",
    bootstrap,
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");
      if (sidenav_show.classList.contains("g-sidenav-hidden")) {
        sidenav_show.classList.remove("g-sidenav-hidden");
        sidenav_show.classList.add("g-sidenav-pinned");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.isTransparent = payload;
    },
    cardBackground(state, payload) {
      state.color = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
    toggleEveryDisplay(state) {
      state.showNavbar = !state.showNavbar;
      state.showSidenav = !state.showSidenav;
      state.showFooter = !state.showFooter;
    },
    toggleHideConfig(state) {
      state.hideConfigButton = !state.hideConfigButton;
    },
    setIsAuthenticated(state, value) {
      state.isAuthenticated = value;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    setCardBackground({ commit }, payload) {
      commit("cardBackground", payload);
    },
    async login({ commit }, {email, password}) {
      try {
        const data = await axios.post('https://psb.sitebix.com/api/auth/local', {
            "identifier": email,
            "password": password
        });
        const isAuthenticated = true;
        commit('setIsAuthenticated', isAuthenticated);
        commit('setUser', data);
        console.log('SUCCESS!!');
        return true;
      } catch (error) {
        console.log('FAILED!!!');
        const isAuthenticated = false;
        commit('setIsAuthenticated', isAuthenticated);
        return false;
      }

        


      // Simulate a login process here (e.g., validating credentials)
      // In a real-world app, you would communicate with your backend server for authentication

    },
    logout({ commit }) {
      // Simulate a logout process here
      const isAuthenticated = false;
      commit('setIsAuthenticated', isAuthenticated);
      commit('setUser', null);
    },
  },
  getters: {},
});
