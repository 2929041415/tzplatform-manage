<template>
  <div>
    <el-dialog
      title="添加用户"
      :visible.sync="addmodalstatus"
      size="tiny"
      custom-class="right-dialog-style"
      top="0"
      :modal=false
      :before-close="handleClose">
      <el-form label-position="right" :rules="rules" ref="sysuserform" class="form-style" label-width="80px"
               :model="sysuserobj">
        <el-form-item label="帐号" class="item-style" prop="account">
          <el-input size="small" v-model="sysuserobj.account"></el-input>
        </el-form-item>
        <el-form-item label="姓名" class="item-style" prop="name">
          <el-input size="small" v-model="sysuserobj.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" class="item-style" prop="telphone">
          <el-input size="small" v-model="sysuserobj.telphone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" class="item-style" prop="email">
          <el-input size="small" v-model="sysuserobj.email"></el-input>
        </el-form-item>
        <el-form-item label="角色授权" class="item-style">
          <el-checkbox-group v-model="checkList">
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
  import {SYSUSER_ADD_MODAL} from '../../../../store/mutation-types'
  import {SYS_USER_LIST} from '../../../../store/action-types'
  import * as sysuserservice from '../../../../service/sysuser'
  import regexutils from '../../../../utils/regexutls'

  export default {
    data() {
      /* 校验帐号规则 */
      const validateaccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入帐号'))
        } else {
          const account = value
          sysuserservice.checksysuser({account}).then(value => {
            if (!value.data) {
              callback(new Error('帐号已存在'))
            } else {
              callback()
            }
          })
        }
      }
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
          account: [
            {required: true, validator: validateaccount, trigger: 'blur'},
          ],
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
      addmodalstatus: {
        get() {
          return this.$store.state.sysuser.addmodal
        },
        set(value) {

        }
      },
      rolelist: {
        get() {
          return this.$store.state.sysuser.rolelist
        },
        set(value) {
        }
      }
    },
    methods: {
      handleClose() {
        this.$store.commit(SYSUSER_ADD_MODAL, false)
        this.resetsysuser()
      },
      cancelmodal() {
        this.$store.commit(SYSUSER_ADD_MODAL, false)
        this.resetsysuser()
      },
      submitform(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const param = this.sysuserobj
            const roleidlist = this.checkList
            let roleids = ''
            if (roleidlist.length > 0) {
              for (const value of roleidlist) {
                roleids = roleids + "," + value
              }
            }
            sysuserservice.addsysuser({...param, roleids}).then(value => {
              if (value.code === '1') {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.$store.commit(SYSUSER_ADD_MODAL, false)
                this.$store.dispatch(SYS_USER_LIST, {})
                this.resetsysuser()
              } else {
                this.$message.error('操作失败')
              }
            })
          }
        });
      },
      resetsysuser() {
        this.sysuserobj.account = ''
        this.sysuserobj.name = ''
        this.sysuserobj.telphone = ''
        this.sysuserobj.email = ''
        this.checkList = []
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
