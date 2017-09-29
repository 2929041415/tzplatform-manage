<template>
  <div class="platform-style">
    <el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="角色名称">
          <el-input placeholder="角色名称" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="search">查询</el-button>
          <el-button type="primary" size="small">重置</el-button>
        </el-form-item>
        <el-form-item class="addbutton-style">
          <el-button type="primary" @click="addrole" size="small">添加角色</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-table
        :data="tableroleData"
        style="width: 100%">
        <el-table-column
          prop="rolename"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="rolecode"
          label="角色代码">
        </el-table-column>
        <el-table-column
          prop="roletype"
          label="角色类型"
          :formatter="formattertype">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="small"
              type="text"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="small"
              type="text"
              class="danger-style"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>


    <div>
      <el-dialog
        title="添加角色"
        :visible.sync="roleobj.addmodalstatus"
        size="tiny"
        custom-class="right-dialog-style"
        top="0"
        :modal=false
        :before-close="handleClose">
        <el-form label-position="right" :rules="rules" ref="roleEditForm" class="form-style" label-width="80px"
                 :model="roleobj">
          <el-form-item label="角色名称" prop="rolename">
            <el-input v-model="roleobj.rolename" size="small"></el-input>
          </el-form-item>
          <el-form-item label="角色代码" prop="rolecode">
            <el-input v-model="roleobj.rolecode" size="small"></el-input>
          </el-form-item>
          <el-form-item label="角色类型" prop="roletype">
            <el-select v-model="roleobj.roletype" placeholder="请选择" size="small" :clearable=true>
              <el-option
                v-for="item in roletype"
                :key="item.name"
                :label="item.value"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权限范围">
            <ResourceTree></ResourceTree>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
              <el-button type="primary" size="small" @click="submitForm('roleEditForm')">确 定</el-button>
              <el-button size="small" @click="cancelmodal">取 消</el-button>
             </span>
      </el-dialog>
    </div>


    <div>
      <el-dialog
        title="修改角色"
        :visible.sync="roleobj.editmodalstatus"
        size="tiny"
        custom-class="right-dialog-style"
        top="0"
        :modal=false
        :before-close="handleClose">
        <el-form label-position="right" :rules="rules" ref="roleEditForm" class="form-style" label-width="80px"
                 :model="roleobj">
          <el-form-item label="角色名称" prop="rolename">
            <el-input v-model="roleobj.rolename" size="small"></el-input>
          </el-form-item>
          <el-form-item label="角色代码" prop="rolecode">
            <el-input v-model="roleobj.rolecode" size="small"></el-input>
          </el-form-item>
          <el-form-item label="角色类型" prop="roletype">
            <el-select v-model="roleobj.roletype" placeholder="请选择" size="small" :clearable=true>
              <el-option
                v-for="item in roletype"
                :key="item.name"
                :label="item.value"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权限范围">
            <ResourceTree></ResourceTree>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
              <el-button type="primary" size="small" @click="submitEditForm('roleEditForm')">确 定</el-button>
              <el-button size="small" @click="cancelmodal">取 消</el-button>
             </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import {MENU_SELECT_CHANGE, HAS_RESOURCE_LIST} from '../../../store/mutation-types'
  import * as systemdictservice from '../../../service/systemdict'
  import * as systemroleservice from '../../../service/systemrole'
  import {ROLE_RESOURCE_LIST} from '../../../store/action-types'
  import ResourceTree from './resourcetree'

  export default {
    data() {
      return {
        tableroleData: [],
        roleobj: {
          id: '',
          rolename: '',
          roletype: '',
          rolecode: '',
          addmodalstatus: false,
          editmodalstatus: false
        },
        rules: {
          rolename: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
          ],
          rolecode: [
            {required: true, message: '请输入角色代码', trigger: 'blur'},
          ],
          roletype: [
            {required: true, message: '请选择角色类型', trigger: 'change'},
          ]
        },
        roletype: []
      }
    },
    created() {
      this.$store.commit(MENU_SELECT_CHANGE, '3')

      this.$store.dispatch(ROLE_RESOURCE_LIST)

      /* 加载角色类型 */
      const type = 'systemroletype'
      systemdictservice.dictvaluelist({type}).then(value => {
        this.roletype = value.data
      })

      this.gettabledata()
    },
    components: {ResourceTree},
    methods: {
      addrole() {
        //重新置空菜单树
        this.$store.commit(HAS_RESOURCE_LIST,[])
        this.roleobj.addmodalstatus = true
      },
      handleClose() {
        this.cancelmodal()
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const param = this.roleobj
            const resourcelist = this.$store.state.role.chooseresourcelist
            let menuids = ''
            if(resourcelist.length>0){
              for(const value of resourcelist){
                menuids=menuids+","+value.id
              }
            }
            systemroleservice.addrole({...param, menuids}).then(value => {
              if (value.code === '1') {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
                this.roleobj.addmodalstatus = false
                this.resetobj()
                this.gettabledata()
              } else {
                this.$message.error('操作失败')
              }
            })
          }
        });
      },
      submitEditForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const param = this.roleobj
            const resourcelist = this.$store.state.role.chooseresourcelist
            let menuids = ''
            if(resourcelist.length>0){
               for(const value of resourcelist){
                 menuids=menuids+","+value.id
               }
            }
            systemroleservice.editrole({...param, menuids}).then(value => {
              if (value.code === '1') {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.roleobj.editmodalstatus = false
                this.resetobj()
                this.gettabledata()
              } else {
                this.$message.error('操作失败')
              }
            })
          }
        });
      },
      gettabledata() {
        systemroleservice.rolelist({}).then(value => {
          this.tableroleData = value.data
        })
      },
      formattertype(row, column) {
        const typelist = this.roletype
        let typename = ""
        for (const value of typelist) {
          if (value.name === row.roletype) {
            typename = value.value
          }
        }
        return typename
      },
      handleEdit(index, row) {
        const roleid = row.id
        systemroleservice.getresourcebyrole({ roleid }).then(value =>{
          const  data = value.data
          this.$store.commit(HAS_RESOURCE_LIST,data)
          this.roleobj.id = row.id
          this.roleobj.rolename = row.rolename
          this.roleobj.roletype = row.roletype
          this.roleobj.rolecode = row.rolecode
          this.roleobj.editmodalstatus = true
        })
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const id = row.id
          systemroleservice.delrole({id}).then(value => {
            if (value.code === '1') {
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.gettabledata()

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
      resetobj() {
        this.roleobj.id = ''
        this.roleobj.rolename = ''
        this.roleobj.roletype = ''
        this.roleobj.rolecode = ''
      },
      cancelmodal() {
        this.roleobj.id = ''
        this.roleobj.rolename = ''
        this.roleobj.roletype = ''
        this.roleobj.rolecode = ''
        this.roleobj.addmodalstatus = false
        this.roleobj.editmodalstatus = false
      }
    }
  }

</script>

<style scoped>
  .form-style {
    width: 400px;
    margin-left: 20px;
  }
</style>
