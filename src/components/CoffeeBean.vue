<template>
    <b-table striped hover :items="coffeeBeans">
    </b-table>
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
      coffeeBeans: []
    }
  },
  find: function (id) {
    let targetPath = baseUrl + '/api/coffee-beans/' + id
    return axios.get(targetPath, config)
    .then((res) => {
      console.log(res.data)
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    search: function (id, callback, errorHandler) {
      let targetPath = baseUrl + '/api/coffee-beans?coffee-shop-id=' + id
      return axios.get(targetPath, config)
      .then((res) => {
        callback(res.data)
      }).catch(function (error) {
        errorHandler(error)
      })
    }
  },
  created: function () {
    let coffeeShopId = this.$route.query['coffee-shop-id']
    this.search(coffeeShopId, (result) => {
      this.coffeeBeans = result
    }, (error) => {
      console.log(error)
      this.$router.push('/signIn')
    })
  }
}
</script>
