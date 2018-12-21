import colors from "vuetify/es5/util/colors";

const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAhauL5EdCSiA2IzFJz3ErOn7YU4zp-4ns",
    authDomain: "campus-bites-c5291.firebaseapp.com",
    databaseURL: "https://campus-bites-c5291.firebaseio.com",
    projectId: "campus-bites-c5291",
    storageBucket: "campus-bites-c5291.appspot.com",
    messagingSenderId: "528215272409"
  },
  theme: {
    primary: "#ff6d1d",
    secondary: colors.orange.darken4,
    accent: colors.lightBlue.accent3,
    error: colors.red.accent3,
    warning: colors.yellow.base,
    info: colors.blue.base,
    success: colors.green.base
  }
};

export default environment;
