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
    if (code === 400) {
      redirect('/400')
    } else if (code === 504) {
      Message.error('网络异常')
      // redirect('/')
    }
  })
}
