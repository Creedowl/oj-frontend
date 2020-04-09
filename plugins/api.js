import qs from 'qs'

export default ({ $axios }, inject) => {
  const api = {
    login(userinfo) {
      return $axios.$post('/auth/login', qs.stringify(userinfo))
    },
    getLabs(offset = 0, limit = 100) {
      return $axios.$get('/labs/', { offset, limit })
    },
    getLab(id) {
      return $axios.$get(`/labs/${id}`)
    },
    getSubmissions(offset = 0, limit = 100, lab_id = null, user_id = null) {
      return $axios.$get('/submissions/', { offset, limit, lab_id, user_id })
    }
  }
  inject('api', api)
}
