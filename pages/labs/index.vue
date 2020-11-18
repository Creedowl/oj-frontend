<template>
  <div class="labs">
    <Card>
      <div class="hd">
        <p class="title">实验列表</p>
      </div>
      <Table
        :columns="columns"
        :data="lablist"
        :loading="loading"
        class="lab-list"
      >
        <template slot="name" slot-scope="{ row }">
          <nuxt-link :to="'/labs/' + row.id">{{ row.name }}</nuxt-link>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { title: 'ID', key: 'id', width: '80px' },
        { title: 'Name', key: 'name', slot: 'name' },
        { title: 'Title', key: 'title' }
      ],
      loading: true,
      lablist: []
    }
  },
  mounted() {
    this.getLabList()
  },
  methods: {
    async getLabList(offset = 0, limit = 50) {
      try {
        const list = await this.$api.getLabs(offset, limit)
        this.lablist = list
        this.loading = false
      } catch (error) {}
    }
  }
}
</script>

<style scoped>
.hd {
  text-align: left;
  margin-bottom: 1rem;
}

.title {
  font-size: 2rem;
}

.lab-list {
  width: 80vw;
  min-width: 1024px;
}
</style>
