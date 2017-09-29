<template>
  <div class="platform-style">
    <el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="接口类型">
          <el-input placeholder="接口类型" v-model="typecode" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="search" @click="gettabledata">查询</el-button>
          <el-button type="primary" size="small" @click="resetApi">重置</el-button>
        </el-form-item>
        <el-form-item class="addbutton-style">
          <el-button type="primary" size="small" @click="addModal">添加接口类型</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-table
        :data="tableapiData" @sort-change="sortChange"
        style="width: 100%">
        <el-table-column
          prop="typecode" sortable="custom"
          label="类型代码">
        </el-table-column>
        <el-table-column
          prop="typename"
          label="类型名称" sortable="true">
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
    <!--分页模块-->
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
    <!--新增接口类型模态框-->
    <div>
      <el-dialog title="新增接口类型" :visible.sync="addModalStatus" size="tiny"
                 custom-class="right-dialog-style"
                 top="0"
                 :modal=false
                 :before-close="resetFormData"
      >
        <el-form :model="formData" label-position="right" :rules="rules" ref="addModal" class="form-style"
                 label-width="80px">
          <el-form-item label="类型代码" prop="typecode">
            <el-input v-model="formData.typecode" size="small" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型名称" prop="typename">
            <el-input v-model="formData.typename" size="small" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetFormData">取 消</el-button>
          <el-button type="primary" @click="submitFormAdd('addModal')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--修改接口类型模态框-->
    <div>
      <el-dialog title="修改接口类型" :visible.sync="editModalStatus" size="tiny"
                 custom-class="right-dialog-style"
                 top="0"
                 :modal=false
                 :before-close="resetFormData"
      >
        <el-form :model="formData" label-position="right" :rules="rules" ref="editModal" class="form-style"
                 label-width="80px">
          <el-form-item label="类型代码" prop="typecode">
            <el-input v-model="formData.typecode" size="small" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型名称" prop="typename">
            <el-input v-model="formData.typename" size="small" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetFormData">取 消</el-button>
          <el-button type="primary" @click="submitFormEdit('editModal')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>


<script>
  import * as systemapiservice from '@/service/apiinfotype'

  export default {
    data() {
      return {
        /*查询条件*/
        typecode: '',
        /*分页数据*/
        pageNum: 1,
        pageSize: 10,
        totalNumber: 0,
        sortOrder: '',
        sortName: '',
        tableapiData: [],
        addModalStatus: false,
        editModalStatus: false,
        formData: {
          id: '',
          typecode: '',
          typename: ''
        },
        /*formLabelWidth: '120px'*/
        rules: {
          typecode: [
            {required: true, message: '请输入类型代码', trigger: 'blur'}
          ],
          typename: [
            {required: true, message: '请输入类型名称', trigger: 'blur'}
          ],
        }
      }
    },
    created() {
      this.gettabledata();
    },
    methods: {
      /*点击排序*/

      sortChange(sortObj) {
        if (sortObj.order != null) {
          if (sortObj.order === 'descending') {
            this.sortName = sortObj.order.slice(0, 4);
          } else {
            this.sortName = sortObj.order.slice(0, 3);
          }
          this.sortOrder = sortObj.prop;
        }
        this.gettabledata();
      },
      /*重置查询条件*/
      resetApi() {
        this.typecode = '';
        this.gettabledata();
      },
      //获取接口类型数据
      gettabledata() {
        const sortOrder = this.sortOrder;
        const sortName = this.sortName;
        const typecode = this.typecode;
        const pageNum = this.pageNum;
        const pageSize = this.pageSize;
        systemapiservice.apitypeList({typecode, pageSize, pageNum, sortOrder, sortName}).then(value => {
          this.tableapiData = value.data;
          this.totalNumber = value.total;
        })
      },
      /*显示新增模态框*/
      addModal() {
        this.addModalStatus = true;
      },
      /*提交新增接口类型表单*/
      submitFormAdd(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const param = this.formData
            systemapiservice.addApi({...param}).then(value => {
              if (value.code === '1') {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
                this.resetFormData();
                this.gettabledata();
              } else {
                this.$message.error('操作失败')
              }
            })
          }
        })
      },
      /*清空模态框数据*/
      resetFormData() {
        this.addModalStatus = false;
        this.editModalStatus = false;
        this.formData.id = '';
        this.formData.typecode = '';
        this.formData.typename = '';
      },
      /*删除数据*/
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该记录,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const id = row.id;
          systemapiservice.deleteApi({id}).then(value => {
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
      /*打开修改模态框*/
      handleEdit(index, row) {
        this.formData.id = row.id;
        this.formData.typecode = row.typecode;
        this.formData.typename = row.typename;
        this.editModalStatus = true;
      },
      /*修改接口类型数据*/
      submitFormEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const param = this.formData;
            systemapiservice.editApi({...param}).then(value => {
              if (value.code === '1') {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.resetFormData();
                this.gettabledata();
              } else {
                this.$message.error('操作失败')
              }
            })
          }
        })
      },
      /*分页方法*/
      handleCurrentChange(page) {
        this.pageNum = page;
        this.gettabledata();
      },
      handleSizeChange(pagesize) {
        this.pageSize = pagesize;
        this.pageNum = 1;
        this.gettabledata();
      }
    }
  }
</script>

<style scoped>
  .page-style {
    float: right;
    padding-top: 15px;
  }
</style>
