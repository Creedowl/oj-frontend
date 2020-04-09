<template>
  <div class="labs">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { title: 'ID', key: 'id', width: '80px' },
        { title: 'name', key: 'name', slot: 'name' }
      ],
      loading: true,
      lablist: []
    }
  },
  mounted() {
    this.getLabList()
  },
  methods: {
    async getLabList(offset = 0, limit = 100) {
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
.labs {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
}

.lab-list {
  width: 80vw;
}
</style>
