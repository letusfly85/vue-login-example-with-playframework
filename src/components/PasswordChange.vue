<template>
  <div>
    <app-header></app-header>
    <div>
     <b-form @submit="passwordChange()">
      <b-form-group id="currentPasswordGroup" label="CurrentPassword:">
         <b-form-input id="currentPassword"
                       type="password"
                       v-model="form.currentPassword"
                       required
                       placeholder="Enter Current Password">
         </b-form-input>
       </b-form-group>
      <b-form-group id="newPasswordGroup" label="NewPassword:">
         <b-form-input id="newPassword"
                       type="password"
                       v-model="form.newPassword"
                       required
                       placeholder="Enter New Password">
         </b-form-input>
       </b-form-group>
       <b-button type="submit" variant="primary">Change Password</b-button>
     </b-form>
   </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import ApiClient from './utils/ApiClient'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'

export default {
  name: 'PasswordChange',
  data () {
    return {
      form: {
        currentPassword: '',
        newPassword: ''
      }
    }
  },
  components: { AppHeader, AppFooter },
  methods: {
    passwordChange: function () {
      let params = {
        'current-password': this.form.currentPassword,
        'new-password': this.form.newPassword
      }

      ApiClient.create('/password/change', params, (response) => {
        this.$router.push('/coffee-shops')
      }, (error) => {
        console.log(error)
      })
    }
  },
  created: function () {
  }
}
</script>
