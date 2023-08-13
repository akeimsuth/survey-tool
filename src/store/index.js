import { createStore } from "vuex";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import axios from "axios";
import { useStore } from "vuex";

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    isTransparent: "",
    isRTL: false,
    isAuthenticated: false,
    accountId: null,
    surveys: null,
    survey: null,
    modules: null,
    assignedSurveys: null,
    module: null,
    templates: null,
    template: null,
    questions: null,
    question_templates: null,
    role: null,
    bugs: null,
    moduleCount: 0,
    surveyCount: 0,
    userCount: 0,
    bugCount: 0,
    color: "",
    user: null,
    users: null,
    singleUser: null,
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
    setUsers(state, users) {
      state.users = users;
    },
    setAccount(state, id) {
      state.accountId = id;
    },
    setSurveys(state, surveys){
      state.surveys = surveys;
    },
    setSurvey(state, survey){
      state.survey = survey;
    },
    setModules(state, modules){
      state.modules = modules;
    },
    setModule(state, module){
      state.module = module;
    },
    setRole(state, role){
      state.role = role;
    },
    setSingleUser(state, singleUser){
      state.singleUser = singleUser;
    },
    setTemplates(state, templates){
      state.templates = templates;
    },
    setTemplate(state, template){
      state.template = template;
    },
    setModuleCount(state, moduleCount){
      state.moduleCount = moduleCount;
    },
    setSurveyCount(state, surveyCount){
      state.surveyCount = surveyCount;
    },
    setUserCount(state, userCount){
      state.userCount = userCount;
    },
    setQuestions(state, questions){
      state.questions = questions;
    },
    setTemplateQuestions(state, question_templates){
      state.question_templates = question_templates;
    },
    setAssignedSurveys(state, assignedSurveys){
      state.assignedSurveys = assignedSurveys;
    },
    setBugs(state, bugs){
      state.bugs = bugs;
    },
    setBugCount(state, bugCount){
      state.bugCount = bugCount;
    }
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    setCardBackground({ commit }, payload) {
      commit("cardBackground", payload);
    },
    assignAccount({ commit, dispatch }, { id }){
      commit('setAccount', id);
      dispatch('fetchSurveys');
      dispatch('fetchModules');
      dispatch('fetchTemplates');
      dispatch('getDashboardCount');
      dispatch('fetchUsers');
      dispatch('fetchAssignedSurveys', this.state.user.data.user.id);
    },
    async login({ commit, dispatch }, { email, password}){
      try {
        const data = await axios.post('https://psb.sitebix.com/api/auth/local', {
            "identifier": email,
            "password": password
        })
        const isAuthenticated = true;
        commit('setIsAuthenticated', isAuthenticated);
        commit('setUser', data);
        if(data){
          await dispatch('getRole');
        }
        console.log('SUCCESS!!');
        return this.state.role;
      } catch (error) {
        console.log('FAILED!!!');
        const isAuthenticated = false;
        commit('setIsAuthenticated', isAuthenticated);
        return false;
      }
    },
    async getRole({ commit }){
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
        const data = await axios.get(`https://psb.sitebix.com/api/users/${this.state.user.data.user.id}?populate=role`);
        console.log('DATA:: ', data.data);
        commit('setRole', data.data.role.type);
      } catch (error) {
        console.log('FAILED!!!');
      }
    },
    async getUser({ commit }, { id }){
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
        const data = await axios.post(`https://psb.sitebix.com/api/users/${id}`);
        commit('setSingleUser', data.data);
      } catch (error) {
        console.log('FAILED!!!');
      }
    },
    async getDashboardCount({ commit }) {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
        const survey_count = await axios.get(`https://psb.sitebix.com/api/surveys?filters[module][account][id][$eq]=${this.state.accountId}`);
        const module_count = await axios.get(`https://psb.sitebix.com/api/modules?filters[account][id][$eq]=${this.state.accountId}`);
        const user_count = await axios.get('https://psb.sitebix.com/api/users/count');
        const bug_count = await axios.get(`https://psb.sitebix.com/api/bugs?filters[account][id][$eq]=${this.state.accountId}`);
        commit('setSurveyCount', survey_count.data.meta.pagination.total);
        commit('setModuleCount', module_count.data.meta.pagination.total);
        commit('setBugCount', bug_count.data.meta.pagination.total);
        commit('setUserCount', user_count.data);
        console.log('Count: ', user_count);
      } catch (error) {
        console.log('FAILED!!!: ', error);
      }
    },
    createUser({ dispatch }, { username, email, password}){
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.user.data.jwt}`;
      axios.post('https://psb.sitebix.com/api/auth/local/register', {
        username: username,
        email: email,
        password: password,
      })
        .then(() => {
          dispatch('fetchUsers');
        })
        .catch(error => {
          console.error('Error creating user:', error);
        });
    },
    fetchBugs({ commit }) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
      axios.get('https://psb.sitebix.com/api/bugs?populate=*')
        .then(response => {
          commit('setBugs',response.data.data);
        })
        .catch(error => {
          console.error('Error fetching bugs:', error);
        });
    },
    fetchUsers({ commit }) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
      axios.get('https://psb.sitebix.com/api/users?populate=role')
        .then(response => {
          commit('setUsers',response.data);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    fetchUser({ commit }, { id }) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
      axios.get(`https://psb.sitebix.com/api/users/${id}`)
        .then(response => {
          commit('setSingleUser',response.data);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    fetchSurveys({ commit }) {
      console.log('TOKEN: ',this.state.user.data.jwt)
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
      axios.get(`https://psb.sitebix.com/api/surveys?filters[module][account][id][$eq]=${this.state.accountId}`)
        .then(response => {
          commit('setSurveys',response.data.data);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    fetchUserSurveys({ commit }) {
      console.log('TOKEN: ',this.state.user.data.jwt)
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
      axios.get(`https://psb.sitebix.com/api/users/${this.state.user.data.user.id}?populate=surveys`)
        .then(response => {
          commit('setSurveys',response.data.surveys);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    fetchAssignedSurveys({ commit }, { id }) {
      console.log('TOKEN: ',this.state.user.data.jwt)
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
      axios.get(`https://psb.sitebix.com/api/users/${id}?populate=surveys`)
        .then(response => {
          commit('setAssignedSurveys',response.data.surveys);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    fetchQuestions({ commit }, { id }) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
      axios.get(`https://psb.sitebix.com/api/surveys/${id}?populate[questions][populate]=answers`)
        .then(response => {
          commit('setQuestions',response.data.data.attributes.questions.data);
          console.log('QUESTIONS: ', response.data.data.attributes.questions.data);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    fetchTemplateQuestions({ commit }, { id }) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
      axios.get(`https://psb.sitebix.com/api/users/${id}?populate[user-questions][populate]=answers`)
        .then(response => {
          commit('setTemplateQuestions',response.data.data.attributes.questions.data);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    fetchModules({ commit }) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
      axios.get(`https://psb.sitebix.com/api/modules?filters[account][id][$eq]=${this.state.accountId}`)
        .then(response => {
          commit('setModules',response.data.data);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    fetchModule({ commit }, { id }) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
      axios.get(`https://psb.sitebix.com/api/modules?filters[id][$eq]=${id}`)
        .then(response => {
          commit('setModule',response.data.data[0]);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    fetchSurvey({ commit }, { id }) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
      axios.get(`https://psb.sitebix.com/api/surveys/${id}`)
        .then(response => {
          commit('setSurvey',response.data.data);
        })
        .catch(error => {
          console.error('Error fetching survey:', error);
        });
    },
    updateModule({ dispatch }, { id, name, description }) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
      axios.put(`https://psb.sitebix.com/api/modules/${id}`, {
        "data": {
          "name": name,
          "description": description,
        }
      })
        .then(() => {
          dispatch('fetchModules');
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    updateUser({ dispatch }, { id, username, email, password }) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
      axios.put(`https://psb.sitebix.com/api/users/${id}`, {
        username: username,
        email: email,
        password: password
      })
        .then(() => {
          dispatch('fetchUsers');
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    updateSurvey({ dispatch }, { id, name, description, users }) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
      axios.put(`https://psb.sitebix.com/api/surveys/${id}`, {
        "data": {
          "name": name,
          "description": description,
          "users": users
        }
      })
        .then(() => {
          dispatch('fetchSurveys');
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    updateTemplate({ dispatch }, { id, name, description }) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
      axios.put(`https://psb.sitebix.com/api/user-templates/${id}`, {
        "data": {
          "name": name,
          "description": description,
        }
      })
        .then(() => {
          dispatch('fetchTemplates');
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    fetchTemplates({ commit }) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
      axios.get(`https://psb.sitebix.com/api/user-templates?filters[module][account][id][$eq]=${this.state.accountId}`)
        .then(response => {
          commit('setTemplates',response.data.data);
        })
        .catch(error => {
          console.error('Error fetching templates:', error);
        });
    },
    fetchTemplate({ commit }, { id }) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
      axios.get(`https://psb.sitebix.com/api/user-templates/${id}`)
        .then(response => {
          commit('setTemplate',response.data.data);
        })
        .catch(error => {
          console.error('Error fetching templates:', error);
        });
    },
    createModule({  dispatch }, { name, description}) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
      axios.post(`https://psb.sitebix.com/api/modules`, {
        "data": {
          "name": name,
          "description": description,
          "account": this.state.accountId,
          "surveys": []
        }
      })
        .then(response => {
          console.log(response);
          dispatch('fetchModules');
        })
        .catch(error => {
          console.error('Error fetching templates:', error);
        });
    },
    createTemplate({  dispatch }, { name, description}) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
      axios.post(`https://psb.sitebix.com/api/user-templates`, {
        "data": {
          "name": name,
          "description": description,
        }
      })
        .then(response => {
          console.log(response);
          dispatch('fetchTemplates');
        })
        .catch(error => {
          console.error('Error fetching templates:', error);
        });
    },
    createSurvey({  dispatch }, { name, description, module_id}) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.user.data.jwt}`;
      axios.post(`https://psb.sitebix.com/api/surveys`, {
        "data": {
          "name": name,
          "description": description,
          "module": module_id,
          "account": this.state.accountId
        }
      })
        .then(response => {
          console.log(response);
          dispatch('fetchSurveys');
        })
        .catch(error => {
          console.error('Error fetching templates:', error);
        });
    },
    createQuestion({ commit }, { question, order, type, survey, answers}){
      const store = useStore();
 
      axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.getUser.data.jwt}`;
      axios.post('https://psb.sitebix.com/api/questions', {
        "data": {
          "question": question,
          "order": order,
          "type": type,
          "survey": survey,
          "answers": answers
        }
      })
        .then(response => {
          console.log(response);
          commit('setQuestions', response.data)
        })
        .catch(error => {
          console.error('Error creating question:', error);
        });
    },
    logout({ commit }) {
      // Simulate a logout process here
      const isAuthenticated = false;
      commit('setIsAuthenticated', isAuthenticated);
      commit('setUser', null);
    },
  },
  getters: {
    getQuestions(state){
      return state.questions;
    },
    getTemplateQuestions(state){
      return state.question_templates;
    },
    getBugs(state){
      return state.bugs;
    },
    getSurveys(state){
      return state.surveys;
    },
    getSurvey(state){
      return state.survey;
    },
    getModules(state){
      return state.modules;
    },
    getSurveyCount(state){
      return state.surveyCount;
    },
    getBugCount(state){
      return state.bugCount;
    },
    getModuleCount(state){
      return state.moduleCount;
    },
    getModule(state){
      return state.module;
    },
    getTemplates(state){
      return state.templates;
    },
    getTemplate(state){
      return state.template;
    },
    getUserCount(state){
      return state.userCount;
    },
    getRole(state){
      return state.role;
    },
    getUsers(state){
      return state.users;
    },
    getUser(state){
      return state.user;
    },
    getSingleUser(state){
      return state.singleUser;
    },
    getAssignedSurveys(state){
      return state.assignedSurveys;
    },
  },
});
