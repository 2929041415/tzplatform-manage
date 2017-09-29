<template>
  <div class="platform-style">
    <el-row>
      <el-col :span="8">
        <img class="app-logo-style" :src="appologo">
        <span class="app-name-style">通州教育云平台APP</span>
      </el-col>
      <el-col :span="5" :offset="1">
        <div class="app-key-style">
          <div>
            <span>AppID :  wx53e72e0c43274985</span>
          </div>
          <div>
            <span>AppSecret :  wx53e72e0c43274985</span>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="float: right;margin-top: 20px;">
          <el-button size="small" type="danger">删除应用</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div class="row-space-style"></div>
    </el-row>
    <el-row>
      <h3>基本信息</h3>
    </el-row>
    <el-row>
      <div class="detail-content">
        <el-col :span="4">
          应用名称
        </el-col>
        <el-col :span="20">
          通州教育云平台
        </el-col>
      </div>
      <div class="detail-content">
        <el-col :span="4">
          英文名称
        </el-col>
        <el-col :span="20">
          tzeduyun
        </el-col>
      </div>
      <div class="detail-content">
        <el-col :span="4">
          应用描述
        </el-col>
        <el-col :span="20">
          北京市通州教育云平台
        </el-col>
      </div>
      <div class="detail-content">
        <el-col :span="4">
          网站信息登记表扫描件
        </el-col>
        <el-col :span="20">
          登记件
        </el-col>
      </div>
      <div class="detail-content">
        <el-col :span="4">
          应用图标
        </el-col>
        <el-col :span="20">
          <img class="app-logo-style" :src="appologo">
        </el-col>
      </div>
    </el-row>
    <el-row>
      <div class="row-space-style"></div>
    </el-row>
    <el-row>
      <h3>开发信息</h3>
    </el-row>
    <el-row>
      <div class="detail-content">
        <el-col :span="4">
          授权回调域
        </el-col>
        <el-col :span="20">
          sso.bjtzeduyun.com
        </el-col>
      </div>
    </el-row>
    <el-row>
      <div class="row-space-style"></div>
    </el-row>
    <el-row>
      <h3>接口信息</h3>
    </el-row>
  </div>
</template>

<script>
  import applogo from '../../../../assets/img/applogo.png'

  export default {
    data() {
      return {
        appologo: applogo
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .app-name-style {
    display: block;
    margin-left: 10px;
    line-height: 74px;
    float: left;
  }

  .app-key-style {
    display: block;
    margin-left: 10px;
    float: left;
    margin-top: 20px;
    font-size: 14px;
  }

  .app-key-style span {
    color: #9e9f9f;
  }

  .app-logo-style {
    float: left;
  }

  .el-icon-circle-check {
    color: #69d015;
  }

  .row-space-style {
    border-bottom: 1px solid #e6e7ec;
    margin-top: 10px;
    height: 5px;
  }

  h3 {
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    line-height: 45px;
    background-color: #ebebeb;
    padding: 0 32px;
  }

  .detail-content{
    padding-left: 32px;
    padding-top: 20px;
    height: 25px;
  }

  .platform-style{
    padding-top: 0px;
  }

</style>
