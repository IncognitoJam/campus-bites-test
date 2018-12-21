import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";

import Restaurants from "./views/Restaurants.vue";
import Menu from "./views/Menu.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      redirect: "/restaurants"
    },
    {
      path: "/restaurants",
      component: Restaurants
    },
    {
      path: "/restaurants/:id",
      component: Menu
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next("login");
  else next();
});

export default router;
