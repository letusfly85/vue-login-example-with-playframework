import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import SignIn from '@/components/SignIn'
import CoffeeBean from '@/components/CoffeeBean.vue'
import CoffeeShop from '@/components/CoffeeShop.vue'
import Home from '@/components/Home.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: SignIn
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
    }
  ]
})
