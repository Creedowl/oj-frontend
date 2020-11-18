<template>
  <div class="class-info">
    <Card>
      <div class="info">
        <div class="head">
          <p class="title">班级信息</p>
          <div class="operation">
            <Button
              v-if="user.classId === info.id"
              type="warning"
              @click="quitClass()"
            >
              退出班级
            </Button>
            <Button v-if="user.isAdmin" type="error" @click="deleteClass()">
              删除班级
            </Button>
            <Button
              v-if="user.isAdmin"
              type="success"
              @click="exportSubmissions()"
            >
              导出记录
            </Button>
          </div>
        </div>
        <Alert type="info" show-icon>
          <span class="info-title">{{ info.name }}</span>
          <div slot="desc">
            <span>教师：{{ info.teacher }}</span>
            <span>人数：{{ info.students.length }}</span>
          </div>
        </Alert>
        <Table :columns="columns" :data="info.students" :loading="loading">
          <template slot="operation" slot-scope="{ row, i }">
            <Button type="primary" :to="`/users/${row.id}`">查看</Button>
            <Button type="error" @click="leaveClass(row.id, i)">退班</Button>
          </template>
        </Table>
      </div>
    </Card>
    <Spin v-if="loading" size="large" fix></Spin>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: true,
      info: {
        id: 0,
        name: '',
        teacher: '',
        students: []
      },
      columns: [
        { title: '姓名', key: 'name' },
        { title: '学号', key: 'student_id' },
        { title: '操作', slot: 'operation' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      isAuthenticated: 'user/isAuthenticated'
    })
  },
  created() {
    if (!this.isAuthenticated || !this.user.isAdmin) {
      this.columns.pop()
    }
    this.getClassInfo(this.$route.params.id)
  },
  methods: {
    async getClassInfo(id) {
      this.loading = true
      try {
        const info = await this.$api.getClassInfo(id)
        this.info = info
      } catch (error) {
        switch (error.response.status) {
          case 404:
            this.$Message.error('404 Not Found')
            break
        }
      }
      this.loading = false
    },
    async leaveClass(id, index) {
      this.loading = true
      try {
        await this.$api.updateUserInfo(id, { classU_id: 0 })
        this.$Message.success('移除成功')
        this.info.students.splice(index, 1)
      } catch (error) {
        this.$Message.error(`移除失败：${error.response.data.detail}`)
      }
      this.loading = false
    },
    quitClass() {
      this.$Modal.confirm({
        title: '你确定要退出当前班级吗？',
        onOk: async () => {
          try {
            await this.$api.updateUserInfo(this.user.id, { classU_id: 0 })
            this.$Message.success('退出成功')
            this.$store.commit('user/setUserInfo', {
              key: 'classId',
              value: null
            })
            this.$router.push('/')
          } catch (error) {
            this.$Message.error(`退出失败：${error.response.data.detail}`)
          }
        }
      })
    },
    deleteClass() {
      if (!this.user.isAdmin) {
        return
      }
      this.$Modal.confirm({
        title: '你确定要删除当前班级吗？',
        onOk: async () => {
          try {
            await this.$api.deleteClass(this.info.id)
            this.$Message.success('删除成功')
            this.$router.push('/')
          } catch (error) {
            this.$Message.error(`删除失败：${error.response.data.detail}`)
          }
        }
      })
    },
    async exportSubmissions() {
      // this.loading = true
      try {
        const data = await this.$api.exportSubmission(this.info.id)
        if (!data) {
          return
        }
        const url = window.URL.createObjectURL(new Blob([data]))
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.setAttribute('download', 'export.xlsx')
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(a.href)
        document.body.removeChild(a)
        this.$Message.success('导出成功')
      } catch (error) {
        this.$Message.error(`导出失败：${error.response.data.detail}`)
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>
.class-info {
  width: 70vw;
  text-align: left;
}

.info {
  width: 100%;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
}

.title {
  font-size: 2rem;
}

.info-title {
  font-size: 1.5rem;
}
</style>
