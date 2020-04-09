<template>
  <Form ref="loginForm" :model="loginForm" :rules="loginRules">
    <FormItem prop="username">
      <Input v-model="loginForm.username" placeholder="学号" type="text">
        <Icon slot="prepend" type="ios-person-outline" />
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input v-model="loginForm.password" placeholder="密码" type="password">
        <Icon slot="prepend" type="ios-lock-outline" />
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" long :loading="loading" @click="handleLogin()">
        登录
      </Button>
    </FormItem>
  </Form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', min: 4, max: 20 }]
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters({ isAuthenticated: 'user/isAuthenticated' })
  },
  methods: {
    ...mapActions({
      loginAction: 'user/loginAction',
      changeModal: 'changeModal'
    }),
    async handleLogin() {
      this.loading = true
      const valid = await this.$refs.loginForm.validate()
      if (!valid) {
        this.$Message.error('表单校验失败')
      } else {
        await this.loginAction(this.loginForm)
        if (this.isAuthenticated) {
          this.$Message.success('登录成功')
          this.changeModal({ visible: false })
        } else {
          this.$Message.error('登录失败')
        }
      }
      this.loading = false
    }
  }
}
</script>

<style></style>
