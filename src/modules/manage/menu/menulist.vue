<template>
  <div>
    <el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" size="small" @click="addmenu">添加菜单</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-table
        :data="formdatalist"
        border
        style="width: 100%;min-height: 260px;"
        :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column
          prop="menuname"
          label="菜单名称">
        </el-table-column>
        <el-table-column
          prop="menuurl"
          label="菜单地址">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="text" class="danger-style"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>


    <AddModal></AddModal>
    <EditModal></EditModal>

  </div>
</template>

<script>
  import AddModal from './addmodal'
  import EditModal from './editmodal'
  import { MENU_ADD_MODAL, MENU_EDIT_MODAL, CHANGE_MENU_OBJECT } from '../../../store/mutation-types'
  import { REFRESH_MENU_TREE } from '../../../store/action-types'
  import * as menuservice from '../../../service/menuservice'

  export default {
    data() {
      return {
      }
    },
    components:{
      AddModal, EditModal
    },
    computed: {
      formdatalist: {
        get() {
          return this.$store.state.menu.childlist
        },
        set(value) {

        }
      }
    },
    methods: {
      addmenu () {
        this.$store.commit(MENU_ADD_MODAL,true);
      },
      handleEdit (index,row) {
        this.$store.commit(MENU_EDIT_MODAL,true);
        this.$store.commit(CHANGE_MENU_OBJECT,row);
      },
      handleDelete (index,row) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const id = row.id
          menuservice.delmenu({ id }).then(value =>{
            if(value.code === '1'){
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.$store.dispatch(REFRESH_MENU_TREE)
            }else {
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


