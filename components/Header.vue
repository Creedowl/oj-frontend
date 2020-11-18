<template>
  <Header class="header">
    <Menu mode="horizontal" theme="dark" class="header_menu">
      <div class="logo">
        <span>计组实验在线评测系统</span>
      </div>
      <div class="header-nav">
        <MenuItem name="home" to="/">
          <Icon type="ios-home-outline" size="20" custom="icon" />
          <span class="nav_text">首页</span>
        </MenuItem>
        <MenuItem name="labs" to="/labs">
          <Icon type="ios-list-box-outline" size="20" custom="icon" />
          <span class="nav_text">实验列表</span>
        </MenuItem>
        <MenuItem name="submissions" to="/submissions">
          <Icon type="ios-albums-outline" size="20" custom="icon" />
          <span class="nav_text">提交列表</span>
        </MenuItem>
        <MenuItem name="classes" to="/classes">
          <Icon type="ios-people-outline" size="20" custom="icon" />
          <span class="nav_text">班级列表</span>
        </MenuItem>
        <template v-if="!isAuthenticated">
          <Button shape="circle" icon="ios-contact" @click="showModal('Login')">
            <span>登录</span>
          </Button>
          <Button
            shape="circle"
            icon="md-person-add"
            @click="showModal('Register')"
          >
            <span>注册</span>
          </Button>
        </template>
        <template v-else>
          <Submenu name="user">
            <template slot="title">
              <Icon type="ios-person-outline" size="20" custom="icon" />
              <span class="nav_text">{{ user.realname }}</span>
            </template>
            <MenuGroup title="用户">
              <MenuItem name="userinfo" :to="`/users/${user.id}`">
                个人信息
              </MenuItem>
              <MenuItem name="logout" @click.native="logout()">退出</MenuItem>
            </MenuGroup>
          </Submenu>
        </template>
      </div>
    </Menu>
    <Modal v-model="modalVisible" :footer-hide="true">
      <div slot="header">
        <span>{{ authModal.name }}</span>
      </div>
      <component :is="authModal.component"></component>
    </Modal>
  </Header>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Login from '~/components/Login'
import Register from '~/components/Register'

export default {
  components: {
    Login,
    Register
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['authModal']),
    ...mapGetters({
      user: 'user/user',
      isAuthenticated: 'user/isAuthenticated'
    }),
    modalVisible: {
      get() {
        return this.authModal.visible
      },
      set(value) {
        this.changeModal({ visible: value })
      }
    }
  },
  methods: {
    ...mapMutations({
      logout: 'user/logout'
    }),
    ...mapActions(['changeModal']),
    showModal(mode) {
      this.changeModal({
        visible: true,
        component: mode
      })
    }
  }
}
</script>

<style scoped>
.header {
  min-width: 1312px;
}

.icon {
  font-weight: bold;
}

.header_menu {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 10%;
  z-index: auto;
}

.nav_text {
  font-weight: bold;
}

.logo {
  font-size: 2rem;
  color: white;
}
</style>
