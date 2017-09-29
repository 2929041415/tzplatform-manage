<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-menu class="el-menu-vertical-demo" default-active="/manage/syssetting/sysdict/list" :router=true>
          <el-menu-item index="/manage/syssetting/sysdict/type"><i class="el-icon-menu"></i>字典类型</el-menu-item>
          <el-menu-item index="/manage/syssetting/sysdict/list"><i class="el-icon-star-on"></i>字典列表</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <div class="type-form-style">
          <el-row>
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="字典名称">
                <el-input v-model="dictvalue" placeholder="字典名称" size="small"></el-input>
              </el-form-item>
              <el-form-item label="字典类型">
                <el-select v-model="dicttype" filterable  placeholder="请选择" size="small" :clearable=true>
                  <el-option
                    v-for="item in typelist"
                    :key="item.name"
                    :label="item.value"
                    :value="item.name">
                  </el-option>
                </el-select>
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
              <el-table-column
                label="所属类型"
                prop="type"
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
                <el-form-item label="字典类型">
                  <el-select v-model="dictobj.type" placeholder="请选择" size="small" :clearable=true>
                    <el-option
                      v-for="item in typelist"
                      :key="item.name"
                      :label="item.value"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="字典名称" prop="value">
                  <el-input v-model="dictobj.value" size="small"></el-input>
                </el-form-item>
                <el-form-item label="字典代码" prop="name">
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
                <el-form-item label="字典类型">
                  <el-select v-model="dictobj.type" placeholder="请选择" size="small" :clearable=true>
                    <el-option
                      v-for="item in typelist"
                      :key="item.name"
                      :label="item.value"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="字典名称" prop="value">
                  <el-input v-model="dictobj.value" size="small"></el-input>
                </el-form-item>
                <el-form-item label="字典代码" prop="name">
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
        dicttype:'',
        dictobj: {
          id: '',
          name: '',
          value: '',
          type:'',
          modalstatus: false,
          editmodalstatus: false
        },
        typelist: [],
        rules: {
          name: [
            {required: true, message: '请输入字典代码', trigger: 'blur'},
          ],
          value: [
            {required: true, message: '请输入字典名称', trigger: 'blur'},
          ],
          typename: [
            {required: true, message: '请选择字典类型', trigger: 'blur'},
          ]
        }
      }
    },
    created() {
      /* 加载表格数据 */
      this.getdatalist()
      this.dicttyelist()

    },
    methods: {
      handleEdit(index, row) {
        this.dictobj.id = row.id
        this.dictobj.name = row.name
        this.dictobj.value = row.value
        this.dictobj.type = row.type
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
        const pageNum = this.pageNum
        const pageSize = this.pageSize
        const value = this.dictvalue
        const type = this.dicttype
        systemdictservice.dictvaluelist({value, type, pageNum, pageSize}).then(value => {
          this.tabledictdata = value.data
          this.totalNumber = value.total
        })
      },
      dicttyelist() {
        const type = 'typeroot'
        systemdictservice.typeList({type}).then(value => {
          this.typelist = value.data
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
        this.dicttype = ''
        this.pageNum = 1
        this.pageSize = 10
        this.getdatalist()
      },
      adddict() {
        this.dictobj.type = this.dicttype
        this.dictobj.modalstatus = true
      },
      cancelmodal() {
        this.dictobj.modalstatus = false
        this.dictobj.name = ''
        this.dictobj.value = ''
        this.dictobj.type = ''
      },
      canceleditmodal() {
        this.dictobj.editmodalstatus = false
        this.dictobj.name = ''
        this.dictobj.value = ''
        this.dictobj.type = ''
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const param = this.dictobj
            systemdictservice.adddict({...param}).then(value => {
              if (value.code === '1') {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
                this.getdatalist()
                this.dictobj.modalstatus = false
                this.dictobj.name = ''
                this.dictobj.value = ''
                this.dictobj.type = ''
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
            systemdictservice.editdict({...param}).then(value => {
              if (value.code === '1') {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
                this.getdatalist()
                this.dictobj.editmodalstatus = false
                this.dictobj.name = ''
                this.dictobj.value = ''
                this.dictobj.type = ''
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
        this.dictobj.type = ''
      },
      formattertype(row, column) {
        const typelist = this.typelist
        let typename = ""
        for (const value of typelist) {
          if (value.name === row.type) {
            typename = value.value
          }
        }
        return typename
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

  li {
    padding-left: 0px !important;
  }

  item:hover {
    background-color: white !important;
  }

</style>
