<template>
  <div>
    <el-dialog
      title="开发者登录"
      :visible.sync="modaldialogstatus"
      size="tiny"
      :before-close="handleClose">
      <div class="login-style">
        <el-form :model="loginform"  ref="loginform" label-width="60px">
          <el-form-item label="用户名">
            <el-input v-model="loginform.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="loginform.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <a>忘记密码?</a>
          </el-form-item>
          <el-form-item>
            <el-button class="loginbtn-style" type="primary">提交</el-button>
            <el-button class="loginbtn-style">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { LOGIN_MODAL_STATUS } from '../store/mutation-types'

  export default {
    data() {
      return {
        loginform: {
          pass:'',
          username: ''
        }
      };
    },
    computed: {
      modaldialogstatus: {
        get () {
          return this.$store.state.login.loginmodalstatus
        },
        set (value) {
        }
      },
    },
    methods: {
      handleClose () {
        this.$store.commit(LOGIN_MODAL_STATUS, false)
      }
    }
  }
</script>
<style scoped>
  .login-style{
    width: 400px;
    margin: 0 auto;
  }

  .login-style a{
    float: right;
    color: #49a7fd;
  }

  .loginbtn-style {
    margin-left: 30px;
  }
</style>
