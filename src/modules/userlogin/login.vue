<template>
  <div class="login-index">
    <div class="wi-36K0f">
      <div class="wi-1ycfP">
        <div class="wi-1Nmz5" data-key="t0">
          <div class="">
            <img class="wi-3KzHg" src="data:image/png;base64,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">
            <span class="wi-3jCTO">开放平台管理中心</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="login-content">
        <el-row>
          <el-col :span="16"><div style="height: 300px;"></div></el-col>
          <el-col :span="8">
            <LoginModal></LoginModal>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import LoginModal from './loginmodal'

  export default {
    data() {
      return {
      };
    },
    components: { LoginModal },
    methods: {
    }
  }
</script>

<style scoped>
  .login-content {
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    overflow: hidden;
    padding: 77px 0 107px;
    position: absolute;
    left: 0;
    margin-bottom: 0;
    background-image: url(../../assets/img/banner.jpg);
    min-height: 450px;
  }

  .wi-36K0f {
    height: 70px;
    font-size: 16px;
    background-color: #fdfdfd;
  }

  .wi-1ycfP {
    width: 1080px;
    height: 100%;
  }
  .wi-1ycfP {
    margin: 0 auto;
  }

  .wi-1Nmz5 {
    float: left;
    height: 62px;
    line-height: 62px;
    text-align: left;
    margin-right: 40px;
    cursor: pointer;
  }
  .wi-L5rPO * {
    box-sizing: border-box;
  }

  .wi-3jCTO, .wi-3KzHg {
    vertical-align: middle;
  }
  .wi-3KzHg {
    height: 32px;
    width: 32px;
  }

  .wi-3jCTO {
    display: inline-block;
    text-align: left;
    padding-left: 10px;
    width: 154px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .container {
    width: 1080px!important;
    padding: 0!important;
  }

  .login-index{
    overflow-y: hidden;
  }
</style>
