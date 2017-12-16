<template>
  <div>
    <b-table striped hover :items="coffeeBeans" :fields="fields">
      <template slot="id" slot-scope="row">
        <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2" variant="success">
          {{ row.detailsShowing ? 'Cancel' : 'Update'}} Coffee Beans
        </b-button>
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card>
          <b-form @submit="update">
            <b-row class="mb-2">
            <b-form-input id="name"
                         type="text"
                         v-model="form.name"
                         required
                         :placeholder="`${row.item.name}`">
            </b-form-input>
            </b-row>

            <b-row class="mb-2">
            <b-form-input id="kind"
                         type="text"
                         v-model="form.kind"
                         required
                         :placeholder="`${row.item.kind}`">
            </b-form-input>
            </b-row>

            <b-row class="sr-only">
            <b-form-input id="cid"
                          v-bind:value="`${form.cid = row.item.id}`">
            </b-form-input>
            <b-form-input id="coffee_shop_id"
                          v-bind:value="`${form.coffee_shop_id = row.item.coffee_shop_id}`">
            </b-form-input>
            </b-row>

            <b-button type="submit">Update</b-button>
            <br/>
            <br/>
          </b-form>
          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>
    </b-table>

    <b-button size="sm" class="mr-2" variant="outline-success">
      Add new Coffee Bean
    </b-button>
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
      fields: {
        id: {label: '-', sortable: false},
        name: {label: 'name', sortable: true},
        kind: {label: 'kind', sortable: true}
      },
      coffeeBeans: [],
      form: {
        cid: '',
        name: '',
        kind: '',
        coffee_shop_id: ''
      }
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
    },
    update: function () {
      let params = {
        id: Number(this.form.cid),
        name: this.form.name,
        kind: this.form.kind,
        coffee_shop_id: Number(this.form.coffee_shop_id)
      }
      let targetPath = baseUrl + '/api/coffee-beans'

      axios.post(targetPath, params, config)
      .then((res) => {
        location.reload()
      }).catch(function (error) {
        console.log(error)
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
