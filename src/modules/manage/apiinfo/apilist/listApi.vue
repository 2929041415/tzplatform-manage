<template>
  <div>
    <!--<el-row style="padding-bottom: 20px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/manage/apiinfo/apilist/listApi' }">接口列表</el-breadcrumb-item>
        <el-breadcrumb-item></el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>-->
    <el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="接口名称" style="padding-left: 20px">
          <el-input placeholder="接口名称" v-model="apiname" size="small"></el-input>
        </el-form-item>
        <el-form-item label="接口类型">
          <el-select v-model="apittypeid" placeholder="请选择" size="small" :clearable=true>
            <el-option
              v-for="item in apiType"
              :key="item.id"
              :label="item.typename"
              :value="item.id">
            </el-option>
          </el-select>
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
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="apiname"
          label="接口名称">
        </el-table-column>
        <el-table-column
          prop="apittypeid"
          label="接口类型"
          :formatter="formmatterType">
        </el-table-column>
        <el-table-column
          prop="apiauth"
          label="是否需要授权"
          :formatter="formatterApiAuth">
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

  </div>
</template>
<script>
  import * as systemapiservice from '@/service/apiinfotype'
  import {APIINFO_OBJ_EDIT} from '@/store/mutation-types'

  export default {
    data() {
      return {
        //查询条件
        apiname: '',
        apittypeid: '',
        pageNum: 1,
        pageSize: 10,
        totalNumber: 0,
        //下拉列表值
        apiType: [],
        //查询返回列表值
        tableData: [],
        formData: {
          apiname: '',
          apittypeid: '',
        },
        addModalStatus: false,
        editModalStatus: false,

      }
    },
    created() {
      //查询下拉框
      this.getApiType();
      //查询接口列表
      this.gettabledata();
    },
    methods: {
      getApiType() {
        systemapiservice.apitypeList({}).then(value => {
          this.apiType = value.data;
        })
      },
      addModal() {
        this.$router.push({path: '/manage/apiinfo/apilist/addApi'})
      },
      handleEdit(index, row) {
        this.$store.commit(APIINFO_OBJ_EDIT, row);
        this.$router.push({path: '/manage/apiinfo/apilist/editApi'})
      },
      gettabledata() {
        const apittypeid = this.apittypeid;
        const apiname = this.apiname;
        const pageNum = this.pageNum;
        const pageSize = this.pageSize;
        systemapiservice.apiManagerList({apittypeid, apiname, pageSize, pageNum}).then(value => {
          this.tableData = value.data;
          this.totalNumber = value.total;
        })
      },
      resetApi() {
        this.apiname='';
        this.apittypeid = '';
        this.gettabledata();
      },
      //格式化接口类型
      formmatterType(row, column) {
        const typeList = this.apiType;
        let apittypename = "";
        for (const value of typeList) {
          if (value.id === row.apittypeid) {
            apittypename = value.typename;
          }
        }
        return apittypename;
      },
      formatterApiAuth(row,column){
        if(row.apiauth==='1')
          return "需要"
        return "不需要"
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
      },
      /*删除数据*/
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该记录,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const id = row.id;
          systemapiservice.deleteApiManager({id}).then(value => {
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
    }
  }
</script>
<style scoped>
  .page-style {
    float: right;
    padding-top: 15px;
  }
</style>
