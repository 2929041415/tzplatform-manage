<template>
    <el-row class="home-content">
      <el-col :span="5">
        <div class="home-title user">
          <i class="el-icon-fa-users home-title-icon user"></i>
          <span>500</span>
        </div>
        <div class="home-title-description user">
          <span>平台开发者总量</span>
        </div>
      </el-col>

      <el-col :span="5" :offset="1">
        <div class="home-title app">
          <i class="el-icon-fa-laptop home-title-icon app"></i>
          <span>3000</span>
        </div>
        <div class="home-title-description app">
          <span>已接入应用总量</span>
        </div>
      </el-col>

      <el-col :span="5" :offset="1">
        <div class="home-title apiinfo">
          <i class="el-icon-fa-bar-chart home-title-icon apiinfo"></i>
          <span>2000</span>
        </div>
        <div class="home-title-description apiinfo">
          <span>接口注册总量</span>
        </div>
      </el-col>

      <el-col :span="5" :offset="1">
        <div class="home-title task">
          <i class="el-icon-fa-tasks home-title-icon task"></i>
          <span>20</span>
        </div>
        <div class="home-title-description task">
          <span>待审核应用总量</span>
        </div>
      </el-col>
    </el-row>
</template>

<script>
  export default {
    data() {
      return {}
    },
  }

</script>

<style scoped>

  .home-content{
    padding-left: 40px;
  }

  .platform-style{
    padding-top: 60px;
  }

  .home-title{
    height: 95px;
    border: 1px solid #E5EBF2;
    text-align: center;
    background-color: white;
  }

  .home-title span{
    display: block;
    padding-top: 10px;
    font-size: 18px;
    font-weight: 500;
  }

  .home-title.user span{
    color: #1D8CE0;
  }

  .home-title.task span{
    color: #F0433D;
  }

  .home-title.app span{
    color: #5cb85c;
  }

  .home-title.apiinfo span{
    color: #f0ad4e;
  }


  .home-title-icon {
    font-size: 50px !important;
    margin-top: 5px;
  }


  .home-title-icon.user {
    color: #1D8CE0;
  }

  .home-title-icon.app {
    color: #5cb85c;
  }

  .home-title-icon.task {
    color: #F0433D;
  }

  .home-title-icon.apiinfo {
    color: #f0ad4e;
  }



  .home-title-description{
    text-align: center;
    height: 40px;
    vertical-align: middle;
  }

  .home-title-description.user{
    background-color: #1D8CE0;
  }

  .home-title-description.task{
    background-color: #F0433D;
  }

  .home-title-description.app{
    background-color: #5cb85c;
  }

  .home-title-description.apiinfo{
    background-color: #f0ad4e;
  }

  .home-title-description span{
    color: white;
    line-height: 40px;
  }


</style>
