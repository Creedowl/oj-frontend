<template>
  <div class="submissions">
    <Table
      :columns="columns"
      :data="submissions"
      :loading="loading"
      class="submissions-list"
    >
      <template slot="id" slot-scope="{ row }">
        <nuxt-link
          v-if="
            isAuthenticated &&
              (user.username === row.student_id || user.isAdmin)
          "
          :to="'/submissions/' + row.id"
        >
          {{ row.id }}
        </nuxt-link>
        <span v-else>{{ row.id }}</span>
      </template>
      <template slot="status" slot-scope="{ row }">
        <Tag :color="getTagColor(row.status)">{{ row.status }}</Tag>
      </template>
      <template slot="lab" slot-scope="{ row }">
        <nuxt-link :to="'labs/' + row.lab_id">{{ row.lab_name }}</nuxt-link>
      </template>
      <template slot="author" slot-scope="{ row }">
        <span>{{ row.student_id }}</span>
      </template>
    </Table>
    <Page
      :total="total"
      :page-size="50"
      show-elevator
      class="page"
      @on-change="pageHandler"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      columns: [
        { title: 'ID', key: 'id', width: '80px', sortable: true, slot: 'id' },
        { title: 'Filename', key: 'origin_filename' },
        { title: 'Status', key: 'status', slot: 'status' },
        { title: 'Score', key: 'total_score', sortable: true },
        { title: 'Lab', key: 'lab_id', slot: 'lab' },
        { title: 'Author', key: 'user_id', slot: 'author' }
      ],
      loading: true,
      total: 0,
      submissions: []
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      isAuthenticated: 'user/isAuthenticated'
    })
  },
  mounted() {
    this.getSubmissions()
  },
  methods: {
    async getSubmissions(offset = 0, limit = 50) {
      try {
        const list = await this.$api.getSubmissions(offset, limit)
        this.total = list.total
        this.submissions = list.submissions
        this.loading = false
      } catch (error) {}
    },
    async pageHandler(page) {
      this.loading = true
      await this.getSubmissions((page - 1) * 50, 50)
    },
    getTagColor(status) {
      switch (status) {
        case 'success':
          return 'success'
        case 'failed':
          return 'error'
        case 'pending':
          return 'primary'
        default:
          return 'default'
      }
    }
  }
}
</script>

<style scoped>
.submissions {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
}

.submissions-list {
  width: 80vw;
}

.page {
  margin: 20px auto;
}
</style>
