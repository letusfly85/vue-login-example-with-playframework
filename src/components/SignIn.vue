<template>
  <div class="sign in">
    <h1>{{ msg }}</h1>
    <form>
      <p>email: <input type="text"></p>
      <p>password: <input type="text"></p>
      <button v-on:click="signIn()">Sign In</button>
    </form>
  </div>
</template>

<script>
import Auth from './Authenticate.vue'
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
      Auth.authenticate('/signIn', {email: 'test@gmail.com', password: 'test', rememberMe: true})
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
