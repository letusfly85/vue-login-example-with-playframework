<template>
  <div>
    <div>
      <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand href="#">Coffee</b-navbar-brand>
         <b-navbar-nav class="ml-auto">
          <b-navbar-brand href="#/signIn">Sign In</b-navbar-brand>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <div>
     <b-form @submit="signIn()">
       <b-form-group id="firstNameGroup"
                     label="First Name:"
                     description="Your First Name">
         <b-form-input id="firstName"
                       type="text"
                       v-model="form.firstName"
                       required
                       placeholder="Enter Your First Name">
         </b-form-input>
      </b-form-group>
       <b-form-group id="lastNameGroup"
                     label="Last Name:"
                     description="Your Last Name">
         <b-form-input id="lastName"
                       type="text"
                       v-model="form.lastName"
                       required
                       placeholder="Enter Your Last Name">
         </b-form-input>
      </b-form-group>
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
       <b-button type="submit" variant="primary">Sign Up</b-button>
     </b-form>
   </div>
 </div>
</template>

<script>
import Auth from './Authenticate'

export default {
  name: 'SignUp',
  data () {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signIn: function (event) {
      let params = {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
        password: this.form.password
      }

      Auth.authenticate('/signUp', params, (res) => {
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
        this.$router.push('/signUp')
      }
    }, (error) => {
      console.log(error)
      this.$router.push('/signUp')
    })
  }
}
</script>
