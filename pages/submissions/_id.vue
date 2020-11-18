<template>
  <div class="submission">
    <Card>
      <div class="info">
        <p class="h1">提交详情</p>
        <Alert :type="getType(submission.status)" show-icon>
          <span class="info-title">{{ submission.status }}</span>
          <div slot="desc">
            <span>ID：{{ submission.id }}</span>
            <span>总分：{{ submission.total_score }}</span>
            <span>实验：</span>
            <nuxt-link :to="`/labs/${submission.lab_id}`">
              {{ submission.lab_name }}
            </nuxt-link>
            <span>用户：</span>
            <nuxt-link :to="`/users/${submission.user_id}`">
              {{ submission.student_id }}
            </nuxt-link>
          </div>
        </Alert>
        <div class="block">
          <p class="h1">结果</p>
          <Lab1
            v-if="submission.lab_name === 'lab1' && submission.result"
            :result="submission.result"
          />
        </div>
        <div class="block">
          <p class="h1">代码</p>
          <highlightjs autodetect :code="submission.code" class="code" />
        </div>
        <template v-if="submission.log">
          <div class="block">
            <p class="h1">日志</p>
            <highlightjs autodetect :code="submission.log" class="code" />
          </div>
        </template>
      </div>
    </Card>
    <Spin v-if="loading" size="large" fix></Spin>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as Details from '~/components/details'

export default {
  components: {
    Lab1: Details.Lab1
  },
  data() {
    return {
      loading: true,
      submission: {
        id: 0,
        origin_filename: '',
        user_id: 0,
        student_id: '',
        lab_id: 0,
        lab_name: '',
        code: '',
        status: '',
        total_score: 0,
        result: '',
        log: ''
      }
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
        this.submission = await this.$api.getSubmission(id)
        this.loading = false
      } catch (error) {
        switch (error.response.status) {
          case 404:
            this.$Message.error('404 Not Found')
            this.$router.push('/404')
            break
          case 401:
          case 403:
            this.$Message.error('未登录或无权限')
            this.$router.push('/')
            break
          default:
            break
        }
      }
    },
    getType(status) {
      switch (status) {
        case 'success':
          return 'success'
        case 'failed':
          return 'error'
        case 'pending':
          return 'info'
        default:
          return 'warning'
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
  padding-bottom: 1rem;
}

.info-title {
  font-size: 1.5rem;
  text-transform: capitalize;
}

.code {
  border: 1px solid #dcdee2;
  border-color: #e8eaec;
  border-radius: 4px;
  max-height: 50vh;
  overflow-y: auto !important;
  overflow-x: auto !important;
}

.block {
  margin: 1rem 0;
}
</style>
