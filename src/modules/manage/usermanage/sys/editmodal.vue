<template>
  <div>
    <el-dialog
      title="修改用户"
      :visible.sync="editmodalstatus"
      size="tiny"
      custom-class="right-dialog-style"
      top="0"
      :modal=false
      :before-close="handleClose">
      <el-form label-position="right" :rules="rules" ref="sysuserform" class="form-style" label-width="80px"
               :model="sysuserobj">
        <el-form-item label="帐号" class="item-style">
          <el-input size="small" v-model="account" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" class="item-style" prop="name">
          <el-input size="small" v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="电话" class="item-style" prop="telphone">
          <el-input size="small" v-model="telphone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" class="item-style" prop="email">
          <el-input size="small" v-model="email"></el-input>
        </el-form-item>
        <el-form-item label="角色授权" class="item-style">
          <el-checkbox-group v-model="checkrolelist">
            <el-row>
              <el-col :span="8" v-for="item in rolelist" :key="item.id">
                <el-checkbox :label="item.id">{{ item.rolename }}</el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" @click="submitform('sysuserform')">确 定</el-button>
      <el-button size="small" @click="cancelmodal">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    SYSUSER_EDIT_MODAL,
    GET_ROLES_BYUSER,
    CHANGE_SYSUSER_ACCOUNT,
    CHANGE_SYSUSER_NAME,
    CHANGE_SYSUSER_TELPHONE,
    CHANGE_SYSUSER_EMAIL,
    RESET_SYSUSER_DATA
  } from '../../../../store/mutation-types'
  import {SYS_USER_LIST} from '../../../../store/action-types'
  import * as sysuserservice from '../../../../service/sysuser'
  import regexutils from '../../../../utils/regexutls'

  export default {
    data() {
      /* 校验手机号规则 */
      const validatephone = (rule, value, callback) => {
        if (value != '' && null != value) {
          if (!(regexutils.validatephone(value))) {
            callback(new Error('请输入正确的手机号'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      /* 校验邮箱规则 */
      const validatemail = (rule, value, callback) => {
        if (value != '' && null != value) {
          if (!(regexutils.validateemail(value))) {
            callback(new Error('请输入正确的邮箱'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      return {
        sysuserobj: {
          account: '',
          name: '',
          telphone: '',
          email: ''
        },
        checkList: [],
        rules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
          ],
          telphone: [
            {validator: validatephone, trigger: 'blur'},
          ],
          email: [
            {validator: validatemail, trigger: 'blur'},
          ]
        }
      };
    },
    computed: {
      editmodalstatus: {
        get() {
          return this.$store.state.sysuser.editmodal
        },
        set(value) {

        }
      },
      checkrolelist: {
        get() {
          return this.$store.state.sysuser.hasrolelist
        },
        set(value) {
          this.$store.commit(GET_ROLES_BYUSER, value)
        }
      },
      rolelist: {
        get() {
          return this.$store.state.sysuser.rolelist
        },
        set(value) {
        }
      },
      account: {
        get() {
          this.sysuserobj.account = this.$store.state.sysuser.sysuserobj.account
          return this.$store.state.sysuser.sysuserobj.account
        },
        set(value) {
          this.sysuserobj.account = value
          this.$store.commit(CHANGE_SYSUSER_ACCOUNT, value)
        }
      },
      name: {
        get() {
          this.sysuserobj.name = this.$store.state.sysuser.sysuserobj.name
          return this.$store.state.sysuser.sysuserobj.name
        },
        set(value) {
          this.sysuserobj.name = value
          this.$store.commit(CHANGE_SYSUSER_NAME, value)
        }
      },
      telphone: {
        get() {
          this.sysuserobj.telphone = this.$store.state.sysuser.sysuserobj.telphone
          return this.$store.state.sysuser.sysuserobj.telphone
        },
        set(value) {
          this.sysuserobj.telphone = value
          this.$store.commit(CHANGE_SYSUSER_TELPHONE, value)
        }
      },
      email: {
        get() {
          this.sysuserobj.email = this.$store.state.sysuser.sysuserobj.email
          return this.$store.state.sysuser.sysuserobj.email
        },
        set(value) {
          this.sysuserobj.email = value
          this.$store.commit(CHANGE_SYSUSER_EMAIL, value)
        }
      }
    },
    methods: {
      handleClose() {
        this.$store.commit(SYSUSER_EDIT_MODAL, false)
        this.$store.commit(RESET_SYSUSER_DATA)
      },
      cancelmodal() {
        this.$store.commit(SYSUSER_EDIT_MODAL, false)
        this.$store.commit(RESET_SYSUSER_DATA)
      },
      submitform(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const param = this.$store.state.sysuser.sysuserobj
            const roleidlist = this.$store.state.sysuser.hasrolelist
            let roleids = ''
            if (roleidlist.length > 0) {
              for (const value of roleidlist) {
                roleids = roleids + "," + value
              }
            }
            sysuserservice.editsysuser({...param, roleids}).then(value => {
              if (value.code === '1') {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.$store.commit(SYSUSER_EDIT_MODAL, false)
                this.$store.dispatch(SYS_USER_LIST,{})
              } else {
                this.$message.error('操作失败')
              }
            })
          }
        });
      }
    }
  };
</script>

<style scoped>
  .form-style {
    width: 400px;
    margin-left: 20px;
  }

  .item-style {
    font-size: 12px !important;
  }
</style>
