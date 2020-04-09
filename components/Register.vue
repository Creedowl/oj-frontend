<template>
  <Form ref="registerForm" :model="registerForm" :rules="registerRules">
    <FormItem prop="username">
      <Input v-model="registerForm.username" placeholder="学号" type="text">
        <Icon slot="prepend" type="ios-person-outline" />
      </Input>
    </FormItem>
    <FormItem prop="realname">
      <Input v-model="registerForm.realname" placeholder="姓名" type="text">
        <Icon slot="prepend" type="ios-person-outline" />
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input v-model="registerForm.password" placeholder="密码" type="password">
        <Icon slot="prepend" type="ios-lock-outline" />
      </Input>
    </FormItem>
    <FormItem prop="passwordAgain">
      <Input
        v-model="registerForm.passwordAgain"
        placeholder="再输入一次密码"
        type="password"
      >
        <Icon slot="prepend" type="ios-lock-outline" />
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" long>注册</Button>
    </FormItem>
  </Form>
</template>

<script>
export default {
  data() {
    const checkPassword = (rule, value, callback) => {
      this.$refs.registerForm.validateField('passwordAgain')
      callback()
    }
    const checkPasswordAgain = (rule, value, callback) => {
      if (value !== this.registerForm.password)
        callback(new Error('The two input passwords do not match!'))
      callback()
    }
    return {
      registerForm: {
        username: '',
        realname: '',
        password: '',
        passwordAgain: ''
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur' }],
        realname: [{ required: true, trigger: 'blur' }],
        password: [
          { required: true, trigger: 'blur', min: 6, max: 20 },
          { validator: checkPassword, trigger: 'blur' }
        ],
        passwordAgain: [
          { required: true, trigger: 'blur', min: 6, max: 20 },
          { validator: checkPasswordAgain, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style></style>
