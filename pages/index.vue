<template>
  <div>
    <h1>欢迎来到计组实验在线评测系统</h1>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isAuthenticated: 'user/isAuthenticated'
    })
  },
  mounted() {
    this.refresh()
  },
  methods: {
    ...mapActions({
      refreshAction: 'user/refreshAction'
    }),
    async refresh() {
      if (!this.isAuthenticated) {
        return
      }
      try {
        await this.refreshAction()
      } catch (error) {
        if (error.response.status !== 200) {
          this.$Message.error('认证失败，请重新登录')
          this.$store.commit('user/logout')
        }
      }
    }
  }
}
</script>

<style></style>
