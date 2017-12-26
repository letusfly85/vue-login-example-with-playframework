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
    return {}
  },
  find: function (path, id, callback, errorHandler) {
    let targetPath = baseUrl + path + id
    return axios.get(targetPath, config)
    .then((response) => {
      callback(response)
    }).catch(function (error) {
      errorHandler(error)
    })
  },
  search: function (pathWithQuery, callback, errorHandler) {
    let targetPath = baseUrl + pathWithQuery
    return axios.get(targetPath, config)
    .then((response) => {
      callback(response)
    }).catch(function (error) {
      errorHandler(error)
    })
  },
  update: function (path, params, callback, errorHandler) {
    let targetPath = baseUrl + path

    axios.put(targetPath, params, config)
    .then((response) => {
      callback(response)
    }).catch(function (error) {
      errorHandler(error)
    })
  },
  create: function (path, params, callback, errorHandler) {
    let targetPath = baseUrl + path

    axios.post(targetPath, params, config)
    .then((response) => {
      callback(response)
    }).catch(function (error) {
      errorHandler(error)
    })
  },
  destroy: function (path, id, callback, errorHandler) {
    let targetPath = baseUrl + path + '/' + id

    axios.delete(targetPath, {}, config)
    .then((response) => {
      callback(response)
    }).catch(function (error) {
      errorHandler(error)
    })
  }
}
</script>
