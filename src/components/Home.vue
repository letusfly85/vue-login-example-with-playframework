<template>
  <div>
   <b-form @submit="signOut()">
     <b-button type="submit" variant="primary">Sign Out</b-button>
   </b-form>
 </div>
</template>

<script>
import axios from 'axios'
import SignIn from '@/components/SignIn.vue'
import Router from 'vue-router'

axios.defaults.xsrfHeaderName = 'Csrf-Token'
axios.defaults.xsrfCookieName = 'PLAY_CSRF_TOKEN'
axios.defaults.withCredentials = true

const baseUrl = 'http://localhost:9000'

const config = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export default {
  name: 'SignOut',
  methods: {
    signOut: function () {
      let targetPath = baseUrl + '/signOut'
      axios.get(targetPath, config)
      .then((res) => {
        var router = new Router()
        router.go('/signIn')
      }).catch(function (error) {
        console.log(error)
        var router = new Router()
        router.go('/signIn')
      })
    }
  },
  created: function () {
    SignIn.methods.home((result) => {
      console.log(result)
    }, (error) => {
      console.log(error)
      this.$router.push('/signIn')
    })
  }}
</script>
