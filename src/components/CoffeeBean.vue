<template>
  <div>
    <app-header></app-header>
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

            <b-button type="submit" size="sm" variant="primary">Update</b-button>
            <br/>
            <br/>
          </b-form>
          <b-form @submit="destroy">
            <b-row class="sr-only">
            <b-form-input id="cid"
                          v-bind:value="`${form.cid= row.item.id}`">
            </b-form-input>
            </b-row>
            <b-button type="submit" size="sm" variant="primary">Destroy</b-button>
          </b-form>
        </b-card>
      </template>
    </b-table>

    <template>
      <b-button :pressed.sync="addToggle" size="sm" class="mr-2" variant="outline-success">
        {{ addToggle ? 'Cancel' : ''}} Add new Coffee Beans
      </b-button>
      <br/>
      <br/>
      <b-card v-if="addToggle">
        <b-form @submit="create">
          <b-row class="mb-2">
          <b-form-input id="name"
                       type="text"
                       v-model="form.name"
                       required
                       placeholder='coffee name'>
          </b-form-input>
          </b-row>

          <b-row class="mb-2">
            <v-autocomplete :items="coffeeKinds" v-model="form.kind" :get-label="getLabel" :component-item='template' @update-items="updateCoffeeKinds">
            </v-autocomplete>
            <!--
            <b-form-input id="kind"
                         type="text"
                         v-model="form.kind"
                         required
                         placeholder='coffee kind'>
            </b-form-input>
          -->
          </b-row>
          <b-button type="submit" size="sm" variant="primary">Create</b-button>
        </b-form>
      </b-card>
    </template>
    <app-footer></app-footer>
  </div>
</template>

<script>
import ApiClient from './utils/ApiClient'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import Autocomplete from 'v-autocomplete'
import ItemTemplate from './ItemTemplate'

export default {
  data () {
    return {
      coffeeShopId: 0,
      addToggle: false,
      fields: {
        id: {label: '-', sortable: false},
        name: {label: 'name', sortable: true},
        kind: {label: 'kind', sortable: true}
      },
      // coffeeKind: {id: 0, name: '', description: ''}
      coffeeKinds: [],
      template: ItemTemplate,
      coffeeBeans: [],
      form: {
        cid: '',
        name: '',
        kind: '',
        coffee_shop_id: ''
      }
    }
  },
  components: { AppHeader, AppFooter, Autocomplete },
  methods: {
    find: function (id) {
      ApiClient.find('/api/coffee-beans/', id, (res) => {
        console.log(res.data)
      }, (error) => {
        console.log(error)
      })
    },
    reSearch: function () {
      let targetPath = '/api/coffee-beans?coffee-shop-id=' + this.coffeeShopId

      ApiClient.search(targetPath, (response) => {
        this.coffeeBeans = response.data
      }, (error) => {
        console.log(error)
        this.$router.push('/signIn')
      })
    },
    create: function () {
      let params = {
        id: 0, // dummy value
        name: this.form.name,
        kind: this.form.kind,
        coffee_shop_id: Number(this.coffeeShopId)
      }

      ApiClient.create('/api/coffee-beans', params, (res) => {
        this.reSearch()
        this.addToggle = false
      }, (error) => {
        console.log(error)
      })
    },
    update: function () {
      let params = {
        id: Number(this.form.cid),
        name: this.form.name,
        kind: this.form.kind,
        coffee_shop_id: Number(this.form.coffee_shop_id)
      }

      ApiClient.update('/api/coffee-beans', params, (res) => {
        this.reSearch()
      }, (error) => {
        console.log(error)
      })
    },
    destroy: function () {
      ApiClient.destroy('/api/coffee-beans', this.form.cid, (res) => {
        this.reSearch()
        this.addToggle = false
      }, (error) => {
        console.log(error)
      })
    },
    getLabel: function (item) {
      if (item !== null) {
        return item.name
      }
    },
    updateCoffeeKinds: function () {
      let targetPath = '/api/coffee-kinds'

      ApiClient.search(targetPath, (response) => {
        this.coffeeKinds = response.data
      }, (error) => {
        console.log(error)
        this.$router.push('/signIn')
      })
    }
  },
  created: function () {
    this.coffeeShopId = this.$route.query['coffee-shop-id']
    this.reSearch()
    this.updateCoffeeKinds()
  }
}
</script>
