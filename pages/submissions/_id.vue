<template>
  <div class="submission">
    <div class="info">
      <p class="h1">提交详情</p>
      <p>{{ submission.id }}</p>
    </div>
    <Spin v-if="loading" size="large" fix></Spin>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: true,
      submission: {}
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      isAuthenticated: 'user/isAuthenticated'
    })
  },
  created() {
    const id = this.$route.params.id
    if (!this.isAuthenticated) {
      this.$Message.error('未登录或无权限')
      this.$router.push('/')
    }
    this.getSubmission(id)
  },
  mounted() {},
  methods: {
    async getSubmission(id) {
      try {
        const submission = await this.$api.getSubmission(id)
        this.submission = submission
        this.loading = false
      } catch (error) {
        // console.log(error.response)
        switch (error.response.status) {
          case 404:
            this.$Message.error('404 Not Found')
            this.$router.push('/404')
            break
          case 401:
            this.$Message.error('未登录或无权限')
            this.$router.push('/')
            break
          default:
            break
        }
      }
    }
  }
}
</script>

<style scoped>
.submission {
  width: 70vw;
  text-align: left;
}

.h1 {
  font-size: 2rem;
}
</style>
