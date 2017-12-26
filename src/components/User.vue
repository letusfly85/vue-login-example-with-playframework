<template>
  <div>
    <b-table striped hover :items="users" :fields="fields">
      <template slot="id" slot-scope="row">
      </template>
    </b-table>
  </div>
</template>

<script>
import ApiClient from './utils/ApiClient'

export default {
  data () {
    return {
      users: [],
      fields: {
        id: {label: '-', sortable: false},
        email: {label: 'email', sortable: true},
        role: {label: 'role', sortable: true}
      },
      form: {
        uid: '',
        email: '',
        role: ''
      }
    }
  },
  methods: {
    find: function (id) {
      ApiClient.find('/api/users/', id, (response) => {
        console.log(response.data)
      }, (error) => {
        console.log(error)
      })
    },
    reSearch: function () {
      let targetPath = '/api/users'

      ApiClient.search(targetPath, (response) => {
        this.users = response.data
      }, (error) => {
        console.log(error)
        this.$router.push('/signIn')
      })
    },
    update: function () {
      let params = {
        id: Number(this.form.uid),
        name: this.form.name,
        kind: this.form.role
      }

      ApiClient.update('/api/users', params, (response) => {
        this.reSearch()
      }, (error) => {
        console.log(error)
      })
    },
    create: function () {
      let params = {
        id: 0, // dummy value
        name: this.form.name,
        kind: this.form.email
      }

      ApiClient.create('/api/users', params, (response) => {
        this.reSearch()
      }, (error) => {
        console.log(error)
      })
    },
    destroy: function () {
      ApiClient.destroy('/api/users', this.form.uid, (response) => {
        this.reSearch()
        this.addToggle = false
      }, (error) => {
        console.log(error)
      })
    }
  },
  created: function () {
    this.reSearch()
  }
}
</script>
