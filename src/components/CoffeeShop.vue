<template>
  <div>
    <app-header></app-header>
    <b-table striped hover :items="coffeeShops">
      <template slot="id" slot-scope="row">
        <b-link :href="`#/coffee-beans?coffee-shop-id=${row.item.id}`">{{ row.item.id }}</b-link>
      </template>
    </b-table>
  </div>
</template>

<script>
import ApiClient from './utils/ApiClient'
import AppHeader from './AppHeader'

const resourcePath = '/api/coffee-shops'

export default {
  name: 'CoffeeShop',
  data () {
    return {
      coffeeShops: []
    }
  },
  components: { AppHeader },
  methods: {
    list: function (callback, errorHandler) {
      ApiClient.search(resourcePath, (response) => {
        callback(response)
      }, (error) => {
        errorHandler(error)
      })
    },
    find: function (id, callback) {
      ApiClient.find(resourcePath, id, (response) => {
        callback(response)
      }, (error) => {
        console.log(error)
      })
    }
  },
  created: function () {
    this.list((response) => {
      this.coffeeShops = response.data
    }, (error) => {
      console.log(error)
      this.$router.push('/signIn')
    })
  }
}
</script>
