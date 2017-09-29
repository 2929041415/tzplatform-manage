<template>
  <div class="platform-style">
    <el-row class="bread-style">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/manage/app/webapp/list' }">网站应用</el-breadcrumb-item>
        <el-breadcrumb-item>应用添加</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <el-form ref="webappform"  label-width="180px" class="add-form-style">
        <el-form-item label="应用基本信息" class="app-title-style">
        </el-form-item>
        <el-form-item label="应用名称">
          <el-input v-model="form.name" size="small" class="app-input-style"></el-input>
        </el-form-item>
        <el-form-item label="应用英文名称">
          <el-input v-model="form.name" size="small" class="app-input-style"></el-input>
        </el-form-item>
        <el-form-item label="应用版本号">
          <el-input v-model="form.name" size="small" class="app-input-style"></el-input>
        </el-form-item>
        <el-form-item label="应用类型">
          <el-select v-model="form.region" placeholder="请选择应用类型" size="small">
            <el-option label="教学类" value="shanghai"></el-option>
            <el-option label="资源类" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用状态">
          <el-select v-model="form.status" placeholder="请选择应用类型" size="small">
            <el-option label="初审" value="1"></el-option>
            <el-option label="已审核" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否付费使用">
          <el-radio-group v-model="form.resource" size="small">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="网站信息登记表扫描件">
          <el-row>
            <p class="el-upload__tip">请下载<a style="color: #20A0FF" href="javascript:void(0)">《开放平台网站信息登记表》</a>后打印并上传至开放平台
              并盖章后上传扫描件。支持JPG、PNG、BMP格式，不超过2MB</p>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-upload
                class="upload-demo"
                ref="uploadsmall"
                action=""
                :file-list="filelistsmall"
                :on-change="handlesmallChange"
                :on-remove="handlesmallRemove"
                list-type="picture"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              </el-upload>
            </el-col>
          </el-row>
          <el-row style="padding-top: 20px;">
            <div style="border-bottom: 1px solid #bfcbd9; width: 800px; "></div>
          </el-row>
        </el-form-item>


        <el-form-item label="应用图标">
          <el-row>
            <el-col :span="18">
              <el-upload
                class="upload-demo"
                ref="uploadsmall"
                action=""
                :file-list="filelistsmall"
                :on-change="handlesmallChange"
                :on-remove="handlesmallRemove"
                list-type="picture"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">请上传网站应用水印图片64*64像素，仅支持PNG格式，大小不超过500KB。</div>
              </el-upload>
            </el-col>
            <el-col :span="5" :offset="1">
              <el-row><span>参考案例</span></el-row>
              <el-row><img class="app-logo-style" :src="applogo"></el-row>
            </el-col>
          </el-row>

          <el-row>
            <div style="border-bottom: 1px solid #bfcbd9; width: 800px; "></div>
          </el-row>

          <el-row class="upload-style">
            <el-col :span="18">
              <el-upload
                class="upload-demo"
                ref="uploadlarge"
                action=""
                :file-list="filelistlarge"
                :on-change="handlelargeChange"
                :on-remove="handlelargeRemove"
                list-type="picture"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">请上传网站应用水印图片128*128像素，仅支持PNG格式，大小不超过500KB。</div>
              </el-upload>
            </el-col>
            <el-col :span="5" :offset="1">
              <el-row><span>参考案例</span></el-row>
              <el-row><img class="app-logo-large-style" :src="applogo"></el-row>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="应用简介">
          <el-input type="textarea" v-model="form.desciption" size="small" class="app-input-style"></el-input>
        </el-form-item>

        <el-form-item label="应用网站信息" class="app-title-style">
        </el-form-item>

        <el-form-item label="应用官网">
          <el-input v-model="form.name" size="small" class="app-input-style"></el-input>
        </el-form-item>
        <el-form-item label="应用维护访问地址">
          <el-input v-model="form.name" size="small" class="app-input-style"></el-input>
        </el-form-item>
        <el-form-item label="oauth回调地址">
          <el-input v-model="form.name" size="small" class="app-input-style"></el-input>
        </el-form-item>
        <el-form-item label="cas回调地址">
          <el-input v-model="form.name" size="small" class="app-input-style"></el-input>
        </el-form-item>



        <el-form-item>
          <el-button type="primary" size="small">立即创建</el-button>
          <el-button size="small">取消</el-button>
        </el-form-item>

      </el-form>
    </el-row>
  </div>
</template>

<script>
  import {SECOND_MENU_SHOW} from '../../../../store/mutation-types'
  import applogo from '../../../../assets/img/applogo.png'

  export default {
    data() {
      return {
        form:{
          name:'',
          region:'',
          desciption:'',
          status:'1',
          resource:'否'
        },
        applogo:applogo,
        filelistsmall:[],
        filelistlarge:[],
      }
    },
    created() {
      this.$store.commit(SECOND_MENU_SHOW,false)
    },
    methods: {
      handlesmallRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlesmallChange(file, fileList) {
        this.filelistsmall = [file];
      },
      handlelargeChange(file, fileList) {
        this.filelistlarge = [file];
      },
      handlelargeRemove(file, fileList) {
        console.log(file, fileList);
      }
    }
  }
</script>

<style scoped>
  .add-form-style{
    width: 1000px;
  }
  .bread-style{
    padding-bottom: 20px;
  }

  .el-breadcrumb{
    font-size: 14px;
  }

  .app-logo-large-style{
    width: 128px;
    height: 128px;
  }

  .upload-style{
    padding-top: 15px;
  }

  .app-title-style label{
    font-size: 15px !important;
  }

  .app-input-style{
    width: 500px;
  }

  .el-upload__tip{
    font-size: 13px;
  }

</style>
