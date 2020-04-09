<template>
  <div class="lab">
    <div class="lab-title">
      <p style="font-size: 2rem;">{{ lab.title }}</p>
    </div>
    <div class="lab-content">
      <p class="h">Content</p>
      <p class="content">{{ lab.content }}</p>
    </div>
    <div class="upload">
      <p class="h">Upload</p>
      <Upload
        v-if="isAuthenticated"
        multiple
        type="drag"
        :headers="authHeader"
        :action="`/api/submissions/submit/${lab.id}/`"
        :accept="'.c'"
        :format="['c']"
        :max-size="2048"
        :on-success="onSuccess"
        style="margin: 20px auto;"
      >
        <div class="upload-content">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>Click or drag files here to upload</p>
        </div>
      </Upload>
      <div v-else>
        <p class="content">登录以提交</p>
      </div>
    </div>
    <Spin v-if="loading" size="large" fix></Spin>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      loading: true,
      lab: {}
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      isAuthenticated: 'user/isAuthenticated'
    }),
    authHeader() {
      return { Authorization: `Bearer ${this.user.token}` }
    }
  },
  mounted() {
    const id = this.$route.params.id
    this.getLab(id)
  },
  methods: {
    async getLab(id) {
      try {
        const lab = await this.$api.getLab(id)
        this.lab = lab
        this.loading = false
      } catch (error) {}
    },
    onSuccess(res) {
      console.log(res)
    }
  }
}
</script>

<style scoped>
.lab {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 70vw;
  padding: 10px;
  position: relative;
}

.h {
  font-size: 1.5rem;
}

.lab-content {
  /* display: flex;
  flex-direction: column;
  align-items: flex-start; */
}

.content {
  margin: 10px 30px;
}

.upload {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.upload-content {
  margin: 40px;
}
</style>
