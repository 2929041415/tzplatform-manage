<template>
  <div class="platform-style">
    <el-row>
      <el-form :inline="true">
        <el-form-item label="帐号名称">
          <el-input placeholder="帐号名称" size="small" v-model="account"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="searchdata">查询</el-button>
          <el-button type="primary" @click="resetlist" size="small">重置</el-button>
        </el-form-item>
        <el-form-item class="addbutton-style">
          <el-button type="primary" size="small" @click="addsysuser">添加用户</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-table
        :data="formdatalist"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="account"
          label="帐号">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="telphone"
          label="电话">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="text" @click="resetPwd(scope.$index, scope.row)">重置密码</el-button>
            <el-button size="small" type="text" class="danger-style" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row>
      <el-pagination class="page-style"
                     :current-page="pageNum"
                     @current-change="handleCurrentChange"
                     @size-change="handleSizeChange"
                     :page-sizes="[10,50, 100, 200]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="datatotal">
      </el-pagination>
    </el-row>

    <AddModal></AddModal>
    <EditModal></EditModal>

  </div>
</template>
<script>
  import {
    MENU_SELECT_CHANGE,
    SYSUSER_ADD_MODAL,
    SYSUSER_EDIT_DATA,
    USER_ROLE_LIST
  } from '../../../../store/mutation-types'
  import {GET_ROLES_BYUSER, SYS_USER_LIST} from '../../../../store/action-types'
  import AddModal from './addmodal'
  import * as sysuserservice from '../../../../service/sysuser'
  import * as systemroleservice from '../../../../service/systemrole'
  import EditModal from './editmodal'

  export default {
    data() {
      return {
        pageNum: 1,
        pageSize: 10,
        account: ''
      }
    },
    created() {
      this.$store.commit(MENU_SELECT_CHANGE, '2')

      //加载角色
      this.getrolelist()

      //加载数据
      this.getdatalist()
    },
    computed: {
      formdatalist: {
        get() {
          return this.$store.state.sysuser.sysuserlist
        },
        set(value) {

        }
      },
      datatotal: {
        get() {
          return this.$store.state.sysuser.datatotal
        },
        set(value) {

        }
      }
    },
    components: {AddModal, EditModal},
    methods: {
      addsysuser() {
        this.$store.commit(SYSUSER_ADD_MODAL, true)
      },
      getrolelist() {
        systemroleservice.rolelist({}).then(value => {
          this.$store.commit(USER_ROLE_LIST, value.data)
        })
      },
      handleEdit(index, row) {
        this.$store.commit(SYSUSER_EDIT_DATA, row)
        const userid = row.id
        this.$store.dispatch(GET_ROLES_BYUSER, {userid})
      },
      handleDelete(index, row) {

      },
      getdatalist() {
        const pageNum = this.pageNum
        const pageSize = this.pageSize
        this.$store.dispatch(SYS_USER_LIST, {pageNum, pageSize})
      },
      handleCurrentChange(page) {
        this.pageNum = page
        this.getdatalist()
      },
      handleSizeChange(pagesize) {
        this.pageSize = pagesize
        this.pageNum = 1
        this.getdatalist()
      },
      searchdata() {
        const account = this.account
        const pageNum = 1
        const pageSize = this.pageSize
        this.$store.dispatch(SYS_USER_LIST, {pageNum, pageSize, account})
      },
      resetlist() {
        this.account = ''
        const account = ''
        const pageNum = 1
        const pageSize = this.pageSize
        this.$store.dispatch(SYS_USER_LIST, {pageNum, pageSize, account})
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const id = row.id
          sysuserservice.delsysuser({id}).then(value => {
            if (value.code === '1') {
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.resetlist()
            } else {
              this.$message.error('操作失败')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      resetPwd(index, row) {
        const account = row.account
        this.$confirm(`此操作将重置账户  ${account}  的密码 , 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const accountid = row.id
          sysuserservice.resetPwd({ accountid }).then(value=>{
            if (value.code === '1') {
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.resetlist()
            } else {
              this.$message.error('操作失败')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>
<style scoped>
  .addbutton-style {
    float: right;
  }

  .page-style {
    float: right;
    padding-top: 15px;
  }
</style>
