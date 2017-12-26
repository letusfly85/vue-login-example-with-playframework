<template>
  <div>
    <b-table striped hover :items="users" :fields="fields">
      <template slot="role" slot-scope="row">
        <div v-if="!row.item.editable">
          <div v-text="row.item.role" @click="row.item.editable = true" />
        </div>
        <div v-if="row.item.editable">
          <input type="text" v-model="row.item.role" @blur="row.item.editable = false & blurHandler(row.item.role)" />
        </div>
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
    blurHandler: function (role) {
      if (this.editableRow === false) {
        this.editableRow = true
      } else {
        console.log(role)
        this.editableRow = false
      }
    },
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
        this.users = response.data.map(function (user) {
          user.editable = false
          return user
        })
        console.log(this.users)
        // this.users = users
      }, (error) => {
        console.log(error)
        this.$router.push('/signIn')
      })
    },
    update: function () {
      let params = {
        id: Number(this.form.uid),
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
