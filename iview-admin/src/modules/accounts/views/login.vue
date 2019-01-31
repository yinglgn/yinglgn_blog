<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from './../Components/LoginForm'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ username, password }) {
      let _this = this
      _this.handleLogin({ username, password }).then(res => {
        if (res.code === 1) {
          _this.getUserInfo().then(res => {
            _this.$router.push({
              name: _this.$config.homeName
            })
          })
        } else {

        }
      })
    }
  }
}
</script>

<style>

</style>
