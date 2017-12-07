<template>
  <div class="sign in">
    <h1>{{ msg }}</h1>
    <form>
      <p>email: <input type="text" placeholder="email" ref="email"></p>
      <p>password: <input type="password" placeholder="password" ref="password"></p>
      <button v-on:click="signIn()">Sign In</button>
    </form>
  </div>
</template>

<script>
import Auth from './Authenticate.vue'
import CoffeeBean from './CoffeeBean.vue'
export default {
  name: 'SignIn',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    signIn: function (event) {
      console.log('sign in')
      var email = this.$refs.email.value
      var password = this.$refs.password.value
      Auth.authenticate('/signIn', {email: email, password: password, rememberMe: true})
      CoffeeBean.find(123)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
