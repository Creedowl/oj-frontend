const state = () => ({
  userinfo: {
    id: 0,
    classId: '',
    username: '',
    realname: '',
    token: '',
    isAdmin: false
  }
})

const getters = {
  user: (state, mutations) => state.userinfo,
  isAuthenticated: (state, getters) => !!getters.user.token,
  isAdmin: (state, getters) => !!getters.user.isAdmin
}

const mutations = {
  setUser(state, user) {
    state.userinfo = user
  },
  setUserInfo(state, { key, value }) {
    state.userinfo[key] = value
  },
  logout(state) {
    state.userinfo = {}
    this.$router.push('/')
  }
}

const actions = {
  async loginAction({ commit }, payload) {
    const resp = await this.$api.login(payload)
    commit('setUser', {
      id: resp.id,
      classId: resp.classU_id,
      username: resp.student_id,
      realname: resp.name,
      token: resp.access_token,
      isAdmin: resp.is_admin
    })
  },
  async refreshAction({ commit, getters }) {
    const resp = await this.$api.refresh()
    commit('setUserInfo', { key: 'token', value: resp.access_token })
  }
}

export { state, getters, mutations, actions }
