<template>
  <el-row class="app-style">
    <el-col :span="15">
      <div class="app-info-style">
        <div class="app-info-title">
          <i class="el-icon-fa-bell title-icon"></i>
          <span>应用最新动态</span>
        </div>
        <div class="app-info-content">
          <ul>
            <li class="content-cell">
                <span>康邦科技公司上架云平台应用</span>
                <span class="cell-date-style">2017-09-28</span>
            </li>
            <li class="content-cell">
              <span>康邦科技公司上架云平台应用</span>
              <span class="cell-date-style">2017-09-28</span>
            </li>
            <li class="content-cell">
              <span>康邦科技公司上架云平台应用</span>
              <span class="cell-date-style">2017-09-28</span>
            </li>
            <li class="content-cell">
              <span>康邦科技公司上架云平台应用</span>
              <span class="cell-date-style">2017-09-28</span>
            </li>
            <li class="content-cell">
              <span>康邦科技公司上架云平台应用</span>
              <span class="cell-date-style">2017-09-28</span>
            </li>
            <li class="content-cell">
              <span>康邦科技公司上架云平台应用</span>
              <span class="cell-date-style">2017-09-28</span>
            </li>
            <li class="content-cell">
              <span>康邦科技公司上架云平台应用</span>
              <span class="cell-date-style">2017-09-28</span>
            </li>
            <li class="content-cell">
              <span>康邦科技公司上架云平台应用</span>
              <span class="cell-date-style">2017-09-28</span>
            </li>
            <li class="content-cell">
              <span>康邦科技公司上架云平台应用</span>
              <span class="cell-date-style">2017-09-28</span>
            </li>
            <li class="content-cell">
              <span>康邦科技公司上架云平台应用</span>
              <span class="cell-date-style">2017-09-28</span>
            </li>
          </ul>
        </div>
      </div>
    </el-col>
    <el-col :span="8" :offset="1">
      <AppPieChart></AppPieChart>
    </el-col>
  </el-row>
</template>

<script>

  import AppPieChart from './apppiechart'

  export default {
    data() {
      return {}
    },
    components: {AppPieChart},
  }

</script>

<style scoped>
  .app-style {
    padding-top: 20px;
    padding-left: 32px;
  }

  .app-info-style {
    height: 420px;
  }

  .app-info-title {
    height: 40px;
    border: 1px solid #E5EBF2;
    background-color: #1ABC9C;

  }

  .app-info-title span {
    color: white;
  }

  .title-icon {
    font-size: 22px !important;
    line-height: 40px !important;
    padding-left: 10px;
    color: white;
  }

  .app-info-content {
    border: 1px solid #E5EBF2;
    height: 390px;
    overflow-y: hidden;
  }

  app-info-content ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .content-cell {
    font-size: 13px;
  }

  .content-cell span{
    line-height: 40px;
    padding-left: 10px;
  }

  .cell-date-style{
    float: right;
    padding-right: 10px;
  }
</style>
