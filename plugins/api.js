import qs from 'qs'

export default ({ $axios }, inject) => {
  const api = {
    login(userinfo) {
      return $axios.$post('/auth/login', qs.stringify(userinfo))
    },
    register(userinfo) {
      return $axios.$post('/users/register', userinfo)
    },
    refresh() {
      return $axios.$post('/auth/refresh')
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
    },
    exportSubmission(classID) {
      return $axios.$get(`/submissions/export/${classID}`, {
        responseType: 'blob'
      })
    },
    getClasses(offset = 0, limit = 100) {
      return $axios.$get('/classes/', { params: { offset, limit } })
    },
    getClassInfo(id) {
      return $axios.$get(`/classes/${id}`)
    },
    createClass(classInfo) {
      return $axios.$post('/classes/', classInfo)
    },
    joinClass(id) {
      return $axios.$post(`/classes/join/${id}`)
    },
    deleteClass(id) {
      return $axios.$delete(`/classes/${id}`)
    },
    getUserInfo(id) {
      return $axios.$get(`/users/${id}`)
    },
    updateUserInfo(id, userInfo) {
      return $axios.$post(`/users/${id}`, userInfo)
    }
  }
  inject('api', api)
}
