<template>
  <Form ref="changePwForm" :model="changePwForm" :rules="changePwRule">
    <FormItem prop="oldPassword">
      <Input
        v-model="changePwForm.oldPassword"
        placeholder="原密码"
        type="password"
      >
        <Icon slot="prepend" type="ios-person-outline" />
      </Input>
    </FormItem>
    <FormItem prop="newPassword">
      <Input
        v-model="changePwForm.newPassword"
        placeholder="新密码"
        type="password"
      >
        <Icon slot="prepend" type="ios-lock-outline" />
      </Input>
    </FormItem>
    <FormItem prop="newPasswordAgain">
      <Input
        v-model="changePwForm.newPasswordAgain"
        placeholder="再输入一次密码"
        type="password"
      >
        <Icon slot="prepend" type="ios-lock-outline" />
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" long :loading="loading" @click="changePassword()">
        修改密码
      </Button>
    </FormItem>
  </Form>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    const checkNewPassword = (rule, value, callback) => {
      this.$refs.changePwForm.validateField('newPasswordAgain')
      callback()
    }
    const checkNewPasswordAgain = (rule, value, callback) => {
      if (value !== this.changePwForm.newPassword)
        callback(new Error('The two input passwords do not match!'))
      callback()
    }
    return {
      loading: false,
      changePwForm: {
        oldPassword: '',
        newPassword: '',
        newPasswordAgain: ''
      },
      changePwRule: {
        oldPassword: [{ required: true, trigger: 'blur' }],
        newPassword: [
          { required: true, trigger: 'blur', min: 6, max: 20 },
          { validator: checkNewPassword, trigger: 'blur' }
        ],
        newPasswordAgain: [
          { required: true, trigger: 'blur', min: 6, max: 20 },
          { validator: checkNewPasswordAgain, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async changePassword() {
      this.loading = true
      if (this.id === 0) {
        return
      }
      const validate = await this.$refs.changePwForm.validate()
      if (!validate) {
        this.$Message.error('表单验证失败')
      } else {
        try {
          await this.$api.updateUserInfo(this.id, {
            old_password: this.changePwForm.oldPassword,
            new_password: this.changePwForm.newPassword
          })
          this.$Message.success('修改成功')
          this.$emit('visible')
        } catch (error) {
          this.$Message.error(`修改失败：${error.response.data.detail}`)
        }
      }
      this.loading = false
    }
  }
}
</script>

<style></style>
