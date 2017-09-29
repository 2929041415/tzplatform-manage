<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-menu class="el-menu-vertical-demo" default-active="/manage/syssetting/sysdict/type" :router=true>
          <el-menu-item index="/manage/syssetting/sysdict/type"><i class="el-icon-menu"></i>字典类型</el-menu-item>
          <el-menu-item index="/manage/syssetting/sysdict/list"><i class="el-icon-star-on"></i>字典列表</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <div class="type-form-style">
          <el-row>
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="类型名称">
                <el-input v-model="dictvalue" placeholder="类型名称" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="getdatalist" size="small" icon="search">查询</el-button>
                <el-button type="primary" @click="resetlist" size="small">重置</el-button>
              </el-form-item>
              <el-form-item class="addbutton-style">
                <el-button type="primary" @click="adddict" size="small">添加类型</el-button>
              </el-form-item>
            </el-form>
          </el-row>

          <el-row>
            <el-table
              :data="tabledictdata"
              border
              style="width: 100%">
              <el-table-column
                label="名称"
                sortable
                prop="value">
              </el-table-column>
              <el-table-column
                label="代码"
                prop="name">
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

          <el-row>
            <el-pagination class="page-style"
                           :current-page="pageNum"
                           @current-change="handleCurrentChange"
                           @size-change="handleSizeChange"
                           :page-sizes="[10,50, 100, 200]"
                           :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="totalNumber">
            </el-pagination>
          </el-row>

          <div>
            <el-dialog
              title="添加类型"
              :visible.sync="dictobj.modalstatus"
              size="tiny"
              custom-class="right-dialog-style"
              top="0"
              :modal=false
              :before-close="handleClose">
              <el-form label-position="right" :rules="rules" ref="dictForm" class="form-style" label-width="80px"
                       :model="dictobj">
                <el-form-item label="类型名称" prop="value">
                  <el-input v-model="dictobj.value" size="small"></el-input>
                </el-form-item>
                <el-form-item label="类型代码" prop="name">
                  <el-input v-model="dictobj.name" size="small"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" @click="submitForm('dictForm')">确 定</el-button>
      <el-button size="small" @click="cancelmodal">取 消</el-button>
      </span>
            </el-dialog>
          </div>

          <div>
            <el-dialog
              title="修改类型"
              :visible.sync="dictobj.editmodalstatus"
              size="tiny"
              custom-class="right-dialog-style"
              top="0"
              :modal=false
              :before-close="handleClose">
              <el-form label-position="right" :rules="rules" ref="dictEditForm" class="form-style" label-width="80px"
                       :model="dictobj">
                <el-form-item label="类型名称" prop="value">
                  <el-input v-model="dictobj.value" size="small"></el-input>
                </el-form-item>
                <el-form-item label="类型代码" prop="name">
                  <el-input v-model="dictobj.name" size="small"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
              <el-button type="primary" size="small" @click="submiteditForm('dictEditForm')">确 定</el-button>
              <el-button size="small" @click="canceleditmodal">取 消</el-button>
             </span>
            </el-dialog>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>


</template>

<script>
  import * as systemdictservice from '../../../../service/systemdict'

  export default {
    data() {
      return {
        tabledictdata: [],
        pageNum: 1,
        pageSize: 10,
        totalNumber: 0,
        dictvalue: '',
        dictobj: {
          id: '',
          name: '',
          value: '',
          modalstatus: false,
          editmodalstatus: false
        },
        rules: {
          name: [
            {required: true, message: '请输入类型代码', trigger: 'blur'},
          ],
          value: [
            {required: true, message: '请输入类型名称', trigger: 'blur'},
          ]
        }
      }
    },
    created() {
      /* 加载表格数据 */
      this.getdatalist()
    },
    methods: {
      handleEdit(index, row) {
        this.dictobj.id = row.id
        this.dictobj.name = row.name
        this.dictobj.value = row.value
        this.dictobj.editmodalstatus = true
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const id = row.id
          systemdictservice.deldict({id}).then(value => {
            if (value.code === '1') {
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.getdatalist()
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
      getdatalist() {
        const type = 'typeroot'
        const pageNum = this.pageNum
        const pageSize = this.pageSize
        const value = this.dictvalue
        systemdictservice.typeList({value, type, pageNum, pageSize}).then(value => {
          this.tabledictdata = value.data
          this.totalNumber = value.total
        })
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
      resetlist() {
        this.dictvalue = ''
        this.pageNum = 1
        this.pageSize = 10
        this.getdatalist()
      },
      adddict() {
        this.dictobj.modalstatus = true
      },
      cancelmodal() {
        this.dictobj.modalstatus = false
        this.dictobj.name = ''
        this.dictobj.value = ''
      },
      canceleditmodal() {
        this.dictobj.editmodalstatus = false
        this.dictobj.name = ''
        this.dictobj.value = ''
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const param = this.dictobj
            const type = 'typeroot'
            systemdictservice.adddict({...param, type}).then(value => {
              if (value.code === '1') {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
                this.resetlist()
                this.dictobj.modalstatus = false
                this.dictobj.name = ''
                this.dictobj.value = ''
              } else {
                this.$message.error('操作失败')
              }
            })
          }
        });
      },
      submiteditForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const param = this.dictobj
            const type = 'typeroot'
            systemdictservice.editdict({...param, type}).then(value => {
              if (value.code === '1') {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
                this.resetlist()
                this.dictobj.editmodalstatus = false
                this.dictobj.name = ''
                this.dictobj.value = ''
              } else {
                this.$message.error('操作失败')
              }
            })
          }
        });
      },
      handleClose() {
        this.dictobj.modalstatus = false
        this.dictobj.editmodalstatus = false
        this.dictobj.name = ''
        this.dictobj.value = ''
      }
    }
  }
</script>

<style scoped>
  .type-form-style {
    padding-top: 13px;
  }

  .page-style {
    float: right;
    padding-top: 15px;
  }

  .addbutton-style {
    float: right;
  }

  .form-style {
    width: 400px;
    margin-left: 20px;
  }

  .danger-style {
    margin-left: 30px;
  }

  .el-menu {
    background-color: white;
  }

  li{
    padding-left: 0px !important;
  }

  item:hover {
    background-color: white !important;
  }

</style>
