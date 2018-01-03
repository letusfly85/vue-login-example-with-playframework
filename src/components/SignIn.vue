<template>
  <div>
    <div>
      <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand href="#">Coffee</b-navbar-brand>
      </b-navbar>
    </div>
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
 </div>
</template>

<script>
import Auth from './Authenticate'

export default {
  name: 'SignIn',
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
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
      Auth.home(callback, errorHandler)
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
