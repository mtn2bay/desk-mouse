// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import Vuetify from 'vuetify'
import 'vue-material-design-icons/styles.css'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  theme: {
    // primary: '#4DB6AC',
    primary: '#AACC3F',
    secondary: '#90B61D',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})

Vue.config.productionTip = false

let app
var config = {
  apiKey: 'AIzaSyB13JmRlYAPqwiVIrtp_PI-NojMS9KVahM',
  authDomain: 'cloud-mouse.firebaseapp.com',
  databaseURL: 'https://cloud-mouse.firebaseio.com',
  projectId: 'cloud-mouse',
  storageBucket: 'cloud-mouse.appspot.com',
  messagingSenderId: '1069321874489'
}
firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})
