<template>
  <div>
    <el-dialog
      title="编辑菜单"
      :visible.sync="addmodalstatus"
      size="tiny"
      custom-class="right-dialog-style"
      top="0"
      :modal=false
      :before-close="handleClose">

      <el-form label-position="right" :rules="rules" ref="menuForm" class="form-style" label-width="80px" :model="menudata">
        <el-form-item label="菜单名称" class="item-style" prop="menuname">
          <el-input v-model="menuname" size="small"></el-input>
        </el-form-item>
        <el-form-item label="菜单url" class="item-style" prop="menuurl">
          <el-input v-model="menuurl" size="small"></el-input>
        </el-form-item>
        <el-form-item label="排序" class="item-style">
          <el-input-number v-model="sort" :min="1" :max="100" size="small"></el-input-number>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
      <el-button type="primary"  size="small" @click="submitForm('menuForm')">确 定</el-button>
      <el-button  size="small" @click="cancelmodal">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { MENU_EDIT_MODAL,CHANGE_MENU_MENUNAME,CHANGE_MENU_MENUURL,CHANGE_MENU_PARENTID,CHANGE_MENU_ID,RESET_MENU_OBJECT,CHANGE_MENU_SORT } from '../../../store/mutation-types'
  import { REFRESH_MENU_TREE } from '../../../store/action-types'
  import * as menuservice from '../../../service/menuservice'

  export default {
    data() {
      return {
        menudata:{
          menuname:'',
          menuurl:'',
          isrootmenu: '1',
          sort: 1
        },
        rules: {
          menuname: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
          ],
          menuurl: [
            { required: true, message: '请输入菜单url', trigger: 'blur' },
          ]
        }
      };
    },
    computed: {
      addmodalstatus: {
        get () {
          return this.$store.state.menu.editmodal
        },
        set (value) {

        }
      },
      menuname:{
        get () {
          this.menudata.menuname = this.$store.state.menu.menuObj.menuname
          return this.$store.state.menu.menuObj.menuname
        },
        set (value) {
          this.menudata.menuname = value
          this.$store.commit(CHANGE_MENU_MENUNAME,value);
        }
      },
      menuurl:{
        get () {
          this.menudata.menuurl = this.$store.state.menu.menuObj.menuurl
          return this.$store.state.menu.menuObj.menuurl
        },
        set (value) {
          this.menudata.menuurl = value
          this.$store.commit(CHANGE_MENU_MENUURL,value);
        }
      },
      sort:{
        get () {
          this.menudata.sort = this.$store.state.menu.menuObj.sort
          return this.$store.state.menu.menuObj.sort
        },
        set (value) {
          this.menudata.sort = value
          this.$store.commit(CHANGE_MENU_SORT,value);
        }
      }
    },
    methods: {
      handleClose() {
        this.$store.commit(MENU_EDIT_MODAL,false)
        this.resetForm('menuForm')
      },
      cancelmodal () {
        this.$store.commit(MENU_EDIT_MODAL,false)
        this.$store.commit(RESET_MENU_OBJECT)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const param = this.$store.state.menu.menuObj
            if(this.menudata.isrootmenu === '2'){
              param.parentid = this.$store.state.menu.choosetreeobj.id
            }
            param.sort = this.menudata.sort
            menuservice.editmenu(param).then(value => {
              if(value.code === '1'){
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
                this.$store.commit(RESET_MENU_OBJECT)
                this.$store.commit(MENU_EDIT_MODAL,false)
                this.resetdata()
                //刷新树和表格数据
                this.$store.dispatch(REFRESH_MENU_TREE)
              }else {
                this.$message.error('操作失败')
              }
            })
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      resetdata () {
        this.menudata.sort = 1
        this.menudata.isrootmenu = '1'
      }
    }
  };
</script>

<style scoped>
  .form-style{
    width: 400px;
    margin-left: 20px;
  }

  .item-style{
    font-size: 12px !important;
  }
</style>
