<template>
  <div>
    <b-table striped hover :items="users" :fields="fields">
      <!--
      <template slot="id" slot-scope="row">
      </template>
      -->
    </b-table>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.xsrfHeaderName = 'Csrf-Token'
axios.defaults.xsrfCookieName = 'PLAY_CSRF_TOKEN'
axios.defaults.withCredentials = true

const baseUrl = 'http://localhost:9000'

const config = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

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
  find: function (id) {
    let targetPath = baseUrl + '/api/users/' + id
    return axios.get(targetPath, config)
    .then((res) => {
      console.log(res.data)
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    search: function (callback) {
      let targetPath = baseUrl + '/api/users'
      return axios.get(targetPath, config)
      .then((res) => {
        callback(res.data)
      }).catch(function (error) {
        console.log(error)
      })
    },
    update: function () {
      let params = {
        id: Number(this.form.uid),
        name: this.form.name,
        kind: this.form.role
      }
      let targetPath = baseUrl + '/api/users'

      axios.put(targetPath, params, config)
      .then((res) => {
        this.reSearch()
      }).catch(function (error) {
        console.log(error)
      })
    },
    create: function () {
      let params = {
        id: 0, // dummy value
        name: this.form.name,
        kind: this.form.email
      }
      let targetPath = baseUrl + '/api/users'

      axios.post(targetPath, params, config)
      .then((res) => {
        this.reSearch()
        this.addToggle = false
      }).catch(function (error) {
        console.log(error)
      })
    },
    destroy: function () {
      let targetPath = baseUrl + '/api/users/' + this.form.uid

      axios.delete(targetPath, {}, config)
      .then((res) => {
        this.reSearch()
      }).catch(function (error) {
        console.log(error)
      })
    },
    reSearch: function () {
      this.search((result) => {
        this.users = result
      }, (error) => {
        console.log(error)
        this.$router.push('/signIn')
      })
    }
  },
  created: function () {
    this.search((result) => {
      this.users = result
    }, (error) => {
      console.log(error)
      this.$router.push('/signIn')
    })
  }
}
</script>
