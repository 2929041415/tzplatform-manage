<template>
  <div class="platform-style" v-cloak>

    <el-row class="bread-style">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/manage/app/webapp/list' }">网站应用</el-breadcrumb-item>
        <el-breadcrumb-item>应用详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>

    <el-row>
      <el-col :span="8">
        <img class="app-logo-style" :src="detaiobj.webapppicsmallbase">
        <span class="app-name-style" v-text="detaiobj.webappname"></span>
      </el-col>
      <el-col :span="10" :offset="1">
        <div class="app-key-style">
          <div>
            <span>AppID :  {{detaiobj.webappid}}</span>
          </div>
          <div>
            <span>AppSecret :  {{detaiobj.webappsecret}}</span>
          </div>
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
        <el-col :span="20" v-text="detaiobj.webappname">
        </el-col>
      </div>
      <div class="detail-content">
        <el-col :span="4">
          英文名称
        </el-col>
        <el-col :span="20"  v-text="detaiobj.webappenname">
          tzeduyun
        </el-col>
      </div>
      <div class="detail-content">
        <el-col :span="4">
          所属分类
        </el-col>
        <el-col :span="20" v-text="detaiobj.kindvalue">
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
          <img class="app-logo-style" :src="detaiobj.regestinfobase">
        </el-col>
      </div>
      <div class="detail-content">
        <el-col :span="4">
          应用图标
        </el-col>
        <el-col :span="20">
          <img class="app-logo-style" :src="detaiobj.webapppicsmallbase">
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
          oauth回调域
        </el-col>
        <el-col :span="20" v-text="detaiobj.webappoauth">
        </el-col>
      </div>
      <div class="detail-content">
        <el-col :span="4">
          sso回调域
        </el-col>
        <el-col :span="20" v-text="detaiobj.webappsso">
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
  import {SECOND_MENU_SHOW} from '../../../../store/mutation-types'
  import {appdetail} from '../../../../service/webapp'

  export default {
    data() {
      return {
        appologo: applogo,
        detaiobj: {
          freestatus: '',
          webappname: '',
          webappenname: '',
          webapptype: '',
          webappkind: '',
          webappstatus: '',
          webappwebsite: '',
          webappwebsitewh: '',
          webappversion: '',
          webappversionname: '',
          webappoauth: '',
          webappsso: '',
          webappscope: '',
          webapppicsmallbase: '',
          webappid: '',
          webappsecret:'',
          regestinfobase:'',
          kindvalue:''
        },
      }
    },
    created() {
      /* 隐藏掉二级导航栏 */
      this.$store.commit(SECOND_MENU_SHOW, false)

      //查询详情
      this.getDetail(this.$route.query.detailid)

    },
    methods: {
      getDetail(id) {
        appdetail({id}).then(value => {
          const data = value.data
          this.detaiobj = {
            webappname: data.webappname,
            webappenname: data.webappenname,
            webapptype: data.webapptype,
            webappkind: data.webappkind,
            webappstatus: data.webappstatus,
            webappwebsite: data.webappwebsite,
            webappwebsitewh: data.webappwebsitewh,
            webappversion: data.webappversion,
            webappversionname: data.webappversionname,
            webappoauth: data.webappoauth,
            webappsso: data.webappoauth,
            freestatus: data.freestatus,
            webapppicsmallbase: data.webapppicsmallbase,
            webappid: data.webappid,
            webappsecret:data.webappsecret,
            regestinfobase:data.regestinfobase,
            kindvalue:data.kindvalue
          }
        })
      }
    }
  }
</script>

<style scoped>
  .app-name-style {
    display: block;
    margin-left: 10px;
    line-height: 74px;
    float: left;
    font-size: 15px;
  }

  .app-key-style {
    display: block;
    margin-left: 10px;
    float: left;
    margin-top: 20px;
    font-size: 13px;
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
    font-size: 15px;
    font-weight: 400;
    font-style: normal;
    line-height: 45px;
    background-color: #ebebeb;
    padding: 0 32px;
  }

  .detail-content {
    padding-left: 32px;
    padding-top: 20px;
    height: 25px;
    font-size: 14px;
  }

  .platform-style {
    padding-top: 20px;
  }

  .bread-style {
    padding-bottom: 20px;
  }

  [v-cloak] {
    display:none !important;
  }

</style>
