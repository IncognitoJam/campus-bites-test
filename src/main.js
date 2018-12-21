import Vue from "vue";
import Vuetify from "vuetify";
import firebase from "firebase/app";
import App from "./App.vue";
import router from "./router";

import environment from "./environment";

Vue.use(Vuetify, { theme: environment.theme });
Vue.config.productionTip = environment.production;

let app = undefined;

firebase.initializeApp(environment.firebase);
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
