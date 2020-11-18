import { Message } from 'view-design'

export default ({ $axios, store, redirect }, inject) => {
  $axios.onRequest((config) => {
    if (store.getters['user/isAuthenticated']) {
      config.headers.common.Authorization =
        'Bearer ' + store.getters['user/user'].token
    }
    // config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    switch (code) {
      case 504:
        Message.error('网络异常')
        redirect('/')
        break
      case 403:
        if (error.response.data.detail === 'Could not validate credentials') {
          Message.error('登录过期，请重新登录')
          store.commit('user/logout')
        }
        break
      default:
        break
    }
  })
}
