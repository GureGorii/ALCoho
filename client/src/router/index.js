import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default"
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,git
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/signin",
    name: "Signin",
    redirect: window.localStorage.getItem("token") && "/dashboard-default",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    redirect: window.localStorage.getItem("token") && "/dashboard-default",
    component: Signup,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!window.localStorage.getItem("token")) {
      next({
        path: '/signin',
        query: {
          redirect: to.fullPath
        }
      })
    }
    else {
      next();
    }
  }
  else {
    next();
  }
});

export default router;
