import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn'
import Home from '@/components/Home'
import SmartLinkGenerator from '@/components/SmartLinkGenerator'

Vue.use(Router)

export default new Router({
  mode: 'history',

  routes: [
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/generator',
      name: 'SmartLinkGenerator',
      component: SmartLinkGenerator
    }
  ]
})
