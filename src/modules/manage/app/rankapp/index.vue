<template>
  <div class="platform-style">
    <el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="应用分类">
          <el-select v-model="form.region" placeholder="请选择分类" size="small">
            <el-option label="课堂教学" value="1"></el-option>
            <el-option label="网盘资源" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用类型" class="search-style">
          <el-radio-group v-model="form.resource" size="small">
            <el-radio label="网站应用"></el-radio>
            <el-radio label="移动应用"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-row>

    <el-row>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="应用名称">
          <template scope="scope">
            <div style="display: table-cell; vertical-align: middle">
              <img class="app-logo-style" :src="scope.row.date">
              <span class="app-name-style">{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="address"
          label="开发者">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-row>
              <el-col :span="6">
                <i class="el-icon-fa-arrow-up green-style" v-if="scope.$index>0"></i>
                <el-button
                  size="small"
                  v-if="scope.$index>0"
                  class="green-style"
                  type="text">上移
                </el-button>
              </el-col>
              <el-col :span="6">
                <i class="el-icon-fa-arrow-down danger-style"></i>
                <el-button
                  size="small"
                  type="text"
                  class="danger-style">下移
                </el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
  import weixinlogo from '../../../../assets/img/weixin.png'
  import sinalogo from '../../../../assets/img/sina.png'

  export default {
    data() {
      return {
        form: {
          resource: '移动应用',
          region: '1'
        },
        tableData: [{
          date: weixinlogo,
          name: '微信',
          state:'已通过',
          address: '康邦科技有限公司'
        }, {
          date: sinalogo,
          name: '新浪微博',
          state:'已通过',
          address: '康邦科技有限公司'
        }, {
          date: weixinlogo,
          name: '云平台APP',
          state:'已通过',
          address: '康邦科技有限公司'
        }, {
          date: weixinlogo,
          name: '云平台APP',
          state:'已通过',
          address: '康邦科技有限公司'
        }, {
          date: weixinlogo,
          name: '云平台APP',
          state:'已通过',
          address: '康邦科技有限公司'
        }, {
          date: weixinlogo,
          name: '云平台APP',
          state:'已通过',
          address: '康邦科技有限公司'
        }, {
          date: weixinlogo,
          name: '云平台APP',
          state:'已通过',
          address: '康邦科技有限公司'
        }, {
          date: weixinlogo,
          name: '云平台APP',
          state:'已通过',
          address: '康邦科技有限公司'
        }]
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .search-style {
    padding-left: 20px;
  }

  .app-name-style {
    margin-left: 15px;
    display:block;
    float: right;
    line-height: 80px;
  }
</style>
