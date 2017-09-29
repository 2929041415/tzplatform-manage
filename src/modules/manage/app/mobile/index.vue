<template>
  <div class="platform-style">
    <el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="应用名称">
          <el-input placeholder="应用名称" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="search">查询</el-button>
          <el-button type="primary" size="small">重置</el-button>
        </el-form-item>
        <el-form-item class="addbutton-style">
          <el-button type="primary" size="small">添加应用</el-button>
        </el-form-item>
      </el-form>
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
              <el-button
                size="small"
                type="text" @click="appdetail">查看详情
              </el-button>
              <el-button
                size="small"
                type="text"
                class="danger-style">下架应用
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-row>
  </div>
</template>

<script>
  import weixinlogo from '../../../../assets/img/weixin.png'
  import sinalogo from '../../../../assets/img/sina.png'

  export default {
    data() {
      return {
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
        }]
      }
    },
    methods: {
      appdetail() {
        this.$router.push({path: '/manage/app/appdetail'})
      }
    }
  }
</script>

<style scoped>
  .platform-style {
    padding-top: 15px;
  }

  .app-name-style {
    margin-left: 15px;
    display:block;
    float: right;
    line-height: 80px;
  }



</style>
