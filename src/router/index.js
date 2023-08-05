import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import store from '../store';
import Users from "@/views/Users.vue";
import Modules from "@/views/Modules.vue";
import BugReports from "@/views/BugReports.vue";
import Surveys from "@/views/Surveys.vue";
import Templates from "@/views/Templates.vue";
import Profile from "@/views/Profile.vue";
import SignIn from "@/views/SignIn.vue";


const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: { requiresAuth: true }
  },
  {
    path: "/modules",
    name: "Modules",
    component: Modules,
    meta: { requiresAuth: true }
  },
  {
    path: "/bug-reports",
    name: "BugReports",
    component: BugReports,
    meta: { requiresAuth: true }
  },
  {
    path: "/surveys",
    name: "Surveys",
    component: Surveys,
    meta: { requiresAuth: true }
  },
  {
    path: "/templates",
    name: "Templates",
    component: Templates,
    meta: { requiresAuth: true }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.isAuthenticated) {
    next('/sign-in');
  } else {
    next();
  }
});

export default router;
