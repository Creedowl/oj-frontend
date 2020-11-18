<template>
  <div class="labs">
    <Card>
      <div class="head">
        <p class="title">班级列表</p>
        <Button v-if="user.isAdmin" type="success" @click="visible = true">
          创建班级
        </Button>
      </div>
      <Table
        :columns="columns"
        :data="classlist"
        :loading="loading"
        class="class-list"
      >
        <template slot="name" slot-scope="{ row }">
          <nuxt-link :to="`/classes/${row.id}`">{{ row.name }}</nuxt-link>
        </template>
        <template slot="operation" slot-scope="{ row }">
          <Button type="primary" @click="joinClass(row.id, row.name)"
            >加入班级</Button
          >
        </template>
      </Table>
    </Card>
    <Modal v-model="visible" :footer-hide="true">
      <div slot="header">
        <span>创建班级</span>
      </div>
      <CreateClass @visible="visible = false"></CreateClass>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CreateClass from '~/components/CreateClass'

export default {
  components: {
    CreateClass
  },
  data() {
    return {
      visible: false,
      columns: [
        { title: 'ID', key: 'id', width: '80px' },
        { title: '姓名', key: 'name', slot: 'name' },
        { title: '教师', key: 'teacher' },
        { title: '操作', slot: 'operation' }
      ],
      loading: true,
      classlist: []
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      isAuthenticated: 'user/isAuthenticated'
    })
  },
  created() {
    if (!this.isAuthenticated || this.user.classId) {
      this.columns.pop()
    }
    this.getClassList()
  },
  methods: {
    async getClassList(offset = 0, limit = 100) {
      try {
        const list = await this.$api.getClasses(offset, limit)
        this.classlist = list
        this.loading = false
      } catch (error) {}
    },
    joinClass(classID, className) {
      this.$Modal.confirm({
        title: `你确定要加入班级 ${className} 吗？`,
        onOk: async () => {
          this.loading = true
          try {
            const resp = await this.$api.updateUserInfo(this.user.id, {
              classU_id: classID
            })
            this.$Message.success('加入成功')
            this.$store.commit('user/setUserInfo', {
              key: 'classId',
              value: resp.classU_id
            })
            this.$router.push(`/classes/${classID}`)
          } catch (error) {
            this.$Message.error(`加入失败：${error.response.data.detail}`)
          }
          this.loading = false
        }
      })
    },
    showModal() {
      this.visible = true
    }
  }
}
</script>

<style scoped>
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
}

.title {
  font-size: 2rem;
}

.class-list {
  width: 80vw;
  min-width: 1024px;
}
</style>
