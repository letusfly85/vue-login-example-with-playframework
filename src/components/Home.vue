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
      return axios.get(targetPath, config)
      .then((res) => {
        this.$router.push('/signIn')
      }).catch(function (error) {
        console.log(error)
        this.$router.push('/signIn')
      })
    }
  },
  created: function () {
    SignIn.methods.home((result) => {
      console.log(result)
      this.$router.push('/')
    }, (error) => {
      console.log(error)
      this.$router.push('/signIn')
    })
  }
}
</script>
