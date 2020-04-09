const state = () => ({
  test: 233,
  authModal: {
    visible: false,
    name: '',
    component: ''
  }
})

// const getters = {

// }

const mutations = {
  changeModalState(state, { visible, component, name }) {
    state.authModal.visible = visible
    state.authModal.component = component
    state.authModal.name = name
  }
}

const actions = {
  changeModal({ commit }, payload) {
    let title = ''
    if (payload.component === 'Login') title = '登录'
    else if (payload.component === 'Register') title = '注册'

    commit('changeModalState', { ...payload, name: title })
  }
}

export { state, mutations, actions }
