<template>
  <div>
    <div class="head-style">
      <div class="head-content">
        <a @click="logoindex" style="height: 80px;">
          <h1 class="logo"></h1>
        </a>
        <div style="margin-left: 5px;">
          <ul class="menu">
            <li v-for="item in menulist">
              <a href="javascript:void(0)" @click="choosemenu(item.id,item.menuurl)">{{item.menuname}}</a>
            </li>
          </ul>
        </div>
        <p class="right-menu">
          <a href="javascript:void(0)" class="reg" @click="updatePassword">{{ruleForm.account}}</a>
          <a href="javascript:void(0)" class="reg" @click="logout">退出</a>
        </p>
      </div>
    </div>
    <childMenu></childMenu>
    <div>
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :modal=false size="tiny">
        <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="原密码" prop="passwordOld">
            <el-input type="password" size="small" v-model="ruleForm.passwordOld"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="passwordNew">
            <el-input type="password" size="small" v-model="ruleForm.passwordNew" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" size="small" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="submitForm('ruleForm')">确定</el-button>
          <el-button size="small" @click="resetForm('ruleForm')">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {RESOURCE_USER_LIST, RESOURCE_MENU_CHILDLIST} from '../store/action-types'
  import * as cookieservice from '../service/cookieservice'
  import childMenu from './childMenu'
  import * as sysuserService from '@/service/sysuser'
  import {getKey, USER_ACCOUNT} from '../service/cookieservice'

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.passwordNew) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        lionstyle: false,
        showdoc: false,
        dialogFormVisible: false,
        ruleForm: {
          passwordNew: '',
          checkPass: '',
          passwordOld: '',
          account: '',
        },
        rules2: {
          passwordOld: [{required: true, message: '请输入原密码', trigger: 'blur'}],
          passwordNew: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {required: true, validator: validatePass2, trigger: 'blur'}
          ]
        }
      };
    },
    created() {
      this.$store.dispatch(RESOURCE_USER_LIST)
      //进入页面查询得到用户
      let id = getKey(USER_ACCOUNT);
      sysuserService.sysuserlist({id}).then(value => {
        if (value.code === '1') {
          let userList=value.data;
          for(const user of userList){
            this.ruleForm.account=user.account;
          }
        }
      })
    },
    computed: {
      menulist: {
        get() {
          return this.$store.state.userresource.menuList
        },
        set(value) {

        }
      }
    },
    components: {childMenu},
    methods: {
      logoindex() {
        this.$router.push({path: '/manage'})
      },
      logout() {
        cookieservice.removeKey(cookieservice.USER_TOKEN)
        cookieservice.removeKey(cookieservice.USER_ACCOUNT)
        cookieservice.removeKey(cookieservice.USER_MENU)
        this.$router.push({path: '/'})
      },
      choosemenu(id, url) {
        const parentid = id
        this.$store.dispatch(RESOURCE_MENU_CHILDLIST, {parentid})
        this.$router.push({path: url})
      },
      updatePassword() {
        this.dialogFormVisible = true;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const param = this.ruleForm;
            sysuserService.updatePassword({...param}).then(value => {
              if (value.code === '1') {
                this.$message({
                  message: '修改密码成功',
                  type: 'success'
                });
              } else {
                this.$message.error('修改密码' + value.msg);
              }
              this.resetForm(formName);
            }).catch(() => {
              this.resetForm(formName);
              this.$message({
                type: 'info',
                message: '网络异常,请稍后再试'
              })
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisible = false;
      },
    }
  }
</script>
<style scoped>
  .head-style {
    background: #1D8CE0;
    height: 80px;
    width: 100%;
  }

  .right-menu {
    float: right;
  }

  .head-content {
    margin: 0 auto;
    height: 80px;
  }

  .head-content .logo {
    float: left;
    width: 315px;
    height: 41px;
    margin: 13px 0px 0px 10px;
    background: url(../assets/img/logo.png) no-repeat;
    text-indent: -999em;
    overflow: hidden;
  }

  .head-content .menu {
    float: left;
    height: 80px;
    margin-left: 10px;
  }

  .head-content .menu li {
    float: left;
    font-size: 15px;
    margin: 0px 15px;
    position: relative;
    z-index: 101;
    height: 80px;
  }

  .head-content .menu li a {
    display: block;
    padding: 0px 5px;
    line-height: 80px;
    text-decoration: none;
    color: white;
  }

  .head-content .menu li a:hover, .m-header .menu li.on a {
    border-bottom: #FFF solid 1px;
  }

  ol, ul, li {
    list-style: none;
  }

  .head-content .reg {
    width: 73px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    font-size: 15px;
    text-decoration: none;
    color: #e7e9f1;
    margin-right: 20px;
  }


</style>
