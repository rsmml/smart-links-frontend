import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn'
import Generator from '@/components/Generator'
import SmartLink from '@/components/SmartLink'
import MyLinks from '@/components/MyLinks'

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
      name: 'SmartLink',
      component: SmartLink
    },
    {
      path: '/generator',
      name: 'Generator',
      get component () {
        if (localStorage.signedIn) {
          return Generator
        } else {
          return SignIn
        }
      }
    },
    {
      path: '/mylinks',
      name: 'MyLinks',
      get component () {
        if (localStorage.signedIn) {
          return MyLinks
        } else {
          return SignIn
        }
      }
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: SmartLink
    }
  ]
})
