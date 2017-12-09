<template>
  <div>
    // TODO listing coffee shops
 </div>
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
  find: function (id) {
    let targetPath = baseUrl + '/api/coffee-shops/' + id
    return axios.get(targetPath, config)
    .then((res) => {
      console.log(res.data)
    }).catch(function (error) {
      console.log(error)
    })
  }
}
</script>
