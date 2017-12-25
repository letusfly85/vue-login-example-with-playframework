<template>
  <div>
   <b-form @submit="signIn()">
     <b-form-group id="emailGroup"
                   label="Email address:"
                   description="We'll never share your email with anyone else.">
       <b-form-input id="email"
                     type="email"
                     v-model="form.email"
                     required
                     placeholder="Enter email">
       </b-form-input>
    </b-form-group>
    <b-form-group id="passwordGroup" label="Password:">
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
import axios from 'axios'
import Auth from './Authenticate.vue'

const baseUrl = 'http://localhost:9000'

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
      let params = {email: this.form.email, password: this.form.password, rememberMe: true}

      Auth.authenticate('/signIn', params, (res) => {
        this.$router.push('/coffee-shops')
      })
    },
    home: function (callback, errorHandler) {
      let targetPath = baseUrl + '/'
      axios.get(targetPath)
      .then((res) => {
        callback(res)
      }).catch(function (error) {
        errorHandler(error)
      })
    }
  },
  created: function () {
    this.home((result) => {
      if (result.status === 200) {
        this.$router.push('/coffee-shops')
      } else {
        this.$router.push('/signIn')
      }
    }, (error) => {
      console.log(error)
      this.$router.push('/signIn')
    })
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
