<template>
  <!--
  <div class="sign in">
    <h1>{{ msg }}</h1>
    <form>
      <p>email: <input type="text" placeholder="email" ref="email"></p>
      <p>password: <input type="password" placeholder="password" ref="password"></p>
      <button v-on:click="signIn()">Sign In</button>
    </form>
  </div>
-->
  <div>
   <b-form @submit="signIn()">
     <b-form-group id="email"
                   label="Email address:"
                   description="We'll never share your email with anyone else.">
       <b-form-input id="email"
                     type="email"
                     v-model="form.email"
                     required
                     placeholder="Enter email">
       </b-form-input>
    </b-form-group>
    <b-form-group id="password" label="Password:">
       <b-form-input id="password"
                     type="password"
                     v-model="form.password"
                     required
                     placeholder="Enter Password">
       </b-form-input>
     </b-form-group>
     <b-button type="submit" variant="primary">Sign In</b-button>
   </b-form>
 </div>
</template>

<script>
import Auth from './Authenticate.vue'
import CoffeeBean from './CoffeeBean.vue'
import CoffeeShop from './CoffeeShop.vue'
export default {
  name: 'SignIn',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    signIn: function (event) {
      console.log('sign in')
      var email = this.form.email
      var password = this.form.password
      Auth.authenticate('/signIn', {email: email, password: password, rememberMe: true})
      CoffeeBean.find(123)
      CoffeeShop.find(123)
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
