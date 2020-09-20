import qs from 'qs'

export default ({ $axios }, inject) => {
  const api = {
    login(userinfo) {
      return $axios.$post('/auth/login', qs.stringify(userinfo))
    },
    getLabs(offset = 0, limit = 100) {
      return $axios.$get('/labs/', { params: { offset, limit } })
    },
    getLab(id) {
      return $axios.$get(`/labs/${id}`)
    },
    getSubmissions(offset = 0, limit = 100, lab_id = null, user_id = null) {
      return $axios.$get('/submissions/', {
        params: { offset, limit, lab_id, user_id }
      })
    },
    getSubmission(id) {
      return $axios.$get(`/submissions/${id}`)
    }
  }
  inject('api', api)
}
