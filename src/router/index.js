import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import SignIn from '@/components/SignIn'
import PasswordChange from '@/components/PasswordChange'
import CoffeeBean from '@/components/CoffeeBean.vue'
import CoffeeShop from '@/components/CoffeeShop.vue'
import User from '@/components/User.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex)
Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
  routes: [
    {
      path: '/signIn',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/password/change',
      name: 'PasswordChange',
      component: PasswordChange
    },
    {
      path: '/coffee-beans',
      name: 'CoffeeBean',
      component: CoffeeBean
    },
    {
      path: '/coffee-shops',
      name: 'CoffeeShop',
      component: CoffeeShop
    },
    {
      path: '/users',
      name: 'User',
      component: User
    }
  ]
})
