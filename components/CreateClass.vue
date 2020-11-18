<template>
  <Form ref="createClassForm" :model="createClassForm" :rules="changeClassRule">
    <FormItem prop="className">
      <Input
        v-model="createClassForm.className"
        placeholder="班级名称"
        type="text"
      >
        <Icon slot="prepend" type="ios-person-outline" />
      </Input>
    </FormItem>
    <FormItem prop="teacher">
      <Input v-model="createClassForm.teacher" placeholder="教师" type="text">
        <Icon slot="prepend" type="ios-lock-outline" />
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" long :loading="loading" @click="createClass()">
        创建班级
      </Button>
    </FormItem>
  </Form>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      createClassForm: {
        className: '',
        teacher: ''
      },
      changeClassRule: {
        className: [{ required: true, trigger: 'blur' }],
        teacher: [{ required: true, trigger: 'blur' }]
      }
    }
  },
  methods: {
    async createClass() {
      this.loading = true
      const validate = await this.$refs.createClassForm.validate()
      if (!validate) {
        this.$Message.error('表单验证失败')
      } else {
        try {
          const resp = await this.$api.createClass({
            name: this.createClassForm.className,
            teacher: this.createClassForm.teacher
          })
          this.$Message.success('创建成功')
          this.$router.push(`/classes/${resp.id}`)
          // this.$emit('visible')
        } catch (error) {
          this.$Message.error(`创建失败：${error.response.data.detail}`)
        }
      }
      this.loading = false
    }
  }
}
</script>

<style></style>
