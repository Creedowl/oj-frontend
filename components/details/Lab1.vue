<template>
  <Table :columns="columns" :data="data"></Table>
</template>

<script>
export default {
  props: {
    result: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      columns: [
        { title: 'Name', key: 'name' },
        { title: 'Cscore', key: 'cscore' },
        { title: 'Cerrors', key: 'cerrors' },
        { title: 'Pscore', key: 'pscore' },
        { title: 'Prating', key: 'prating' },
        { title: 'Perrors', key: 'perrors' },
        { title: 'Operators', key: 'operators' }
      ]
    }
  },
  computed: {
    data() {
      const d = JSON.parse(this.result)
      const k = Object.keys(d)
      const v = Object.values(d)
      for (let i = 0; i < k.length; i++) {
        v[i].name = k[i]
      }
      return v
    }
  }
}
</script>

<style scoped></style>
