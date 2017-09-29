<template>
  <div class="login-modal">
    <div class="form-style">
      <el-form ref="loginform" label-width="60px" :rules="rules" :model="loginform">
        <el-form-item prop="account">
          <el-input size="large" v-model="loginform.account" placeholder="请输入帐号" @keyup.enter.native="loginsys('loginform')" @change="clearerror"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="large" v-model="loginform.password" type="password" placeholder="请输入密码" @keyup.enter.native="loginsys('loginform')" @change="clearerror"></el-input>
        </el-form-item>
        <el-form-item class="login-bt-style">
          <div>
            <span v-text="errorinfo"></span>
            <a href="javascript:void(0)">忘记密码?</a>
          </div>
          <el-button type="primary" size="large"   @click="loginsys('loginform')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {userLogin} from '../../service/login'
  import * as cookie from '../../service/cookieservice'
  import {USER_ACCESS_TOKEN} from '../../store/mutation-types'

  export default {
    data() {
      return {
        loginform: {
          account: '',
          password: ''
        },
        errorinfo: '',
        rules: {
          account: [
            {required: true, message: '请输入帐号', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        }
      };
    },
    methods: {
      loginsys(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const param = this.loginform
            userLogin(param).then(value => {
              if (value.code == '1') {
                const result = value.data
                cookie.setKey(cookie.USER_ACCOUNT, result.accountid)
                cookie.setKey(cookie.USER_TOKEN, result.token)
                this.$store.commit(USER_ACCESS_TOKEN,result.token)
                this.$router.push({ path: '/manage/home' })
              } else {
                this.errorinfo = value.msg
              }
            })
          }
        })
      },
      clearerror() {
        this.errorinfo = ''
      }
    }
  }
</script>

<style scoped>
  .login-modal {
    width: 400px;
    background-color: white;
    height: 350px;
  }

  .login-modal .el-form {
    width: 400px;
  }

  .el-input {
    width: 300px;
  }

  .el-input--large .el-input__inner {
    height: 50px;
  }

  .el-form-item {
    margin-bottom: 40px;
  }

  .form-style {
    padding-top: 70px;
  }

  .el-button--primary {
    width: 300px;
    line-height: 1;
  }

  .login-bt-style {
    margin-top: -15px;
  }

  .login-bt-style div span {
    color: red;
    line-height: 36px;
  }

  .login-bt-style div {
    height: 36px;
    width: 300px;
    margin-bottom: 5px;
  }

  .login-bt-style div a {
    float: right;
    text-decoration: none;
    color: #8391a5;
  }

  .login-bt-style div a:hover {
    color: #38adff;
  }
</style>
