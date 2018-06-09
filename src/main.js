import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import Vuetify from 'vuetify'
import 'vue-material-design-icons/styles.css'
import 'font-awesome/css/font-awesome.css'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  theme: {
    primary: '#AACC3F',
    secondary: '#777EE3',
    accent: '#777EE3',
    error: '#FF6244'
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
