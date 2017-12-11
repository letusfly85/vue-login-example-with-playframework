<template>
    <b-table striped hover :items="coffeeShops"></b-table>
</template>

<script>
import axios from 'axios'
axios.defaults.xsrfHeaderName = 'Csrf-Token'
axios.defaults.xsrfCookieName = 'PLAY_CSRF_TOKEN'

const baseUrl = 'http://localhost:9000'

const config = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export default {
  data () {
    return {
      coffeeShops: []
    }
  },
  methods: {
    list: function (callback) {
      let targetPath = baseUrl + '/api/coffee-shops'
      return axios.get(targetPath, config)
      .then((res) => {
        callback(res.data)
      }).catch(function (error) {
        console.log(error)
      })
    },
    find: function (id, callback) {
      let targetPath = baseUrl + '/api/coffee-shops/' + id
      return axios.get(targetPath, config)
      .then((res) => {
        callback(res.data)
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  created: function () {
    this.list((result) => {
      this.coffeeShops = result
    })
  }
}
</script>
