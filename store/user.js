const state = () => ({
  userinfo: {
    // username: '',
    // realname: '',
    // token: ''
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
  logout(state) {
    state.userinfo = {}
    this.$router.push('/')
  }
}

const actions = {
  async loginAction({ commit, getters }, payload) {
    try {
      const resp = await this.$api.login(payload)
      commit('setUser', {
        username: resp.student_id,
        realname: resp.name,
        token: resp.access_token,
        isAdmin: resp.is_admin
      })
    } catch (error) {
      // console.log(error)
    }
  }
}

export { state, getters, mutations, actions }
