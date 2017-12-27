<template>
  <div>
    <b-table striped hover :items="users" :fields="fields">
      <template slot="role" slot-scope="row">
        <div v-if="!row.item.editable">
          <div v-text="row.item.role" @click="row.item.editable = true" />
        </div>
        <div v-if="row.item.editable">
          <b-form-select v-model="row.item.selected" :options="row.item.options" class="sb-3"
            @input="row.item.editable = false; row.item.changed = true; row.item.role = row.item.selected">
          </b-form-select>
        </div>
      </template>
      <template slot="update" slot-scope="row">
        <b-form @submit="update">
          <div v-if="row.item.changed">
            <b-button type="submit" size="sm" variant="primary">update</b-button>
            <b-row class="sr-only">
            <b-form-input id="uid"
                          v-bind:value="`${form.uid = row.item.id}`">
            </b-form-input>
            <b-form-input id="roleName"
                          v-bind:value="`${form.role = row.item.role}`">
            </b-form-input>
            </b-row>
          </div>
          <div v-if="!row.item.changed">
          </div>
        </b-form>
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
        role: {label: 'role', sortable: true},
        update: {label: ' ', sortable: true}
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
          user.changed = false
          user.options = [
            { value: user.role, text: user.role },
            { value: (user.role === 'admin') ? 'normal' : 'admin', text: (user.role === 'admin') ? 'normal' : 'admin' }
          ]
          user.selected = user.role
          return user
        })
      }, (error) => {
        console.log(error)
        this.$router.push('/signIn')
      })
    },
    update: function () {
      let params = {
        id: Number(this.form.uid),
        role: this.form.role
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
