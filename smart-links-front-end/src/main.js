// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueSimpleAlert from 'vue-simple-alert'
import 'bootstrap'; import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import VueAxios from 'vue-axios'
import router from './router'
import { securedAxiosInstance, plainAxiosInstance } from './backend/axios'
import { store } from './store/store'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueSimpleAlert)

export const bus = new Vue()

Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})

/* eslint-disable no-new */
new Vue({
  store: store,
  el: '#app',
  router,
  securedAxiosInstance,
  plainAxiosInstance,
  components: { App },
  template: '<App/>'
})
