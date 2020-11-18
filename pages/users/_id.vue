<template>
  <div class="user">
    <Card>
      <p class="title">用户信息</p>
      <Divider />
      <div class="flex-container">
        <div class="avatar">
          <Avatar size="100" style="background: #66ccff;">
            {{ info.name && info.name[0] }}
          </Avatar>
        </div>
        <div class="detail">
          <p>学号：{{ info.student_id }}</p>
          <p>姓名：{{ info.name }}</p>
          <p>
            班级：
            <template v-if="info.classU_id">
              <nuxt-link :to="`/classes/${info.classU_id}`">
                {{ info.classU_id }}
              </nuxt-link>
            </template>
            <template v-else>
              <nuxt-link to="/classes">请加入一个班级</nuxt-link>
            </template>
          </p>
          <Button
            v-if="user.id === info.id || user.isAdmin"
            type="primary"
            @click="showModal()"
          >
            修改密码
          </Button>
        </div>
      </div>
    </Card>
    <Modal v-model="visible" :footer-hide="true">
      <div slot="header">
        <span>修改密码</span>
      </div>
      <ChangePassword :id="info.id" @visible="visible = false"></ChangePassword>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChangePassword from '~/components/ChangePassword'

export default {
  components: {
    ChangePassword
  },
  data() {
    return {
      visible: false,
      info: {
        id: 0,
        classU_id: 0,
        is_admin: false,
        name: '',
        student_id: ''
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
    if (!this.isAuthenticated) {
      this.$Message.error('未登录或无权限')
      this.$router.push('/')
    }
    this.getUserInfo(this.$route.params.id)
  },
  methods: {
    async getUserInfo(id) {
      try {
        const info = await this.$api.getUserInfo(id)
        this.info = info
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
    showModal() {
      this.visible = true
    }
  }
}
</script>

<style scoped>
.user {
  width: 50vw;
  min-width: 500px;
}

.title {
  font-size: 2rem;
}

.flex-container {
  display: flex;
  width: 100%;
}

.avatar {
  margin: auto 2rem;
}

.detail {
  display: flex;
  flex-direction: column;
  justify-content: left;
}
</style>
