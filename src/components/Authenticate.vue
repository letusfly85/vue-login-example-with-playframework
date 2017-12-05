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
  authenticate: function (path, params) {
    let targetPath = baseUrl + path
    return axios.post(targetPath, params, config)
    .then((res) => {
      console.log(res.data)
    }).catch(function (error) {
      console.log(error)
    })
  }
}
</script>
