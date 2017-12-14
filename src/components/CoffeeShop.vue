<template>
    <b-table striped hover :items="coffeeShops">
      <template slot="id" scope="row">
        <b-link :href="`#/coffee-beans?coffee-shop-id=${row.item.id}`">{{ row.item.id }}</b-link>
      </template>
    </b-table>
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
  name: 'CoffeeShop',
  data () {
    return {
      coffeeShops: []
    }
  },
  methods: {
    list: function (callback, errorHandler) {
      let targetPath = baseUrl + '/api/coffee-shops'
      return axios.get(targetPath, config)
      .then((res) => {
        callback(res.data)
      }).catch(function (error) {
        errorHandler(error)
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
    }, (error) => {
      console.log(error)
      this.$router.push('/signIn')
    })
  }
}
</script>
