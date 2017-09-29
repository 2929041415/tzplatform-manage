<template>
  <div class="platform-style">
    <el-row class="bread-style">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/manage/app/webapp/list' }">网站应用</el-breadcrumb-item>
        <el-breadcrumb-item>应用添加</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <el-form ref="webappform" :rules="rules" label-width="180px" :model="form" class="add-form-style">
        <el-form-item label="应用基本信息" class="app-title-style">
        </el-form-item>
        <el-form-item label="应用名称" prop="webappname">
          <el-input v-model="form.webappname" size="small" class="app-input-style"></el-input>
        </el-form-item>
        <el-form-item label="应用英文名称">
          <el-input v-model="form.webappenname" size="small" class="app-input-style"></el-input>
        </el-form-item>
        <el-form-item label="应用版本号" prop="webappversion">
          <el-input v-model="form.webappversion" size="small" class="app-input-style"></el-input>
        </el-form-item>
        <el-form-item label="应用类型">
          <el-select v-model="form.webapptype" placeholder="请选择应用类型" size="small">
            <el-option label="网站应用" value="website"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用分类" prop="webappkind">
          <el-select v-model="form.webappkind" placeholder="请选择应用分类" size="small">
            <el-option :label="item.value" v-for="item in webkindlist" :value="item.name" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用状态" prop="webappstatus">
          <el-radio-group v-model="form.webappstatus" size="small">
            <el-radio label="1">初审</el-radio>
            <el-radio label="2">审核通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否付费使用" prop="freestatus">
          <el-radio-group v-model="form.freestatus" size="small">
            <el-radio label="Y">是</el-radio>
            <el-radio label="N">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="网站信息登记表扫描件" prop="regestinfofile">
          <el-row>
            <p class="el-upload__tip">请下载<a style="color: #20A0FF" href="javascript:void(0)">《开放平台网站信息登记表》</a>后打印并上传至开放平台
              并盖章后上传扫描件。支持JPG、PNG、BMP格式，不超过2MB</p>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-upload
                class="upload-demo"
                ref="uploadregestinfo"
                action=""
                :file-list="filelistinfo"
                :on-change="handleregestinfoChange"
                :on-remove="handleregestinfoRemove"
                list-type="picture"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              </el-upload>
            </el-col>
          </el-row>

          <el-row>
            <el-input v-model="form.regestinfofile" v-if="false" size="small" class="app-input-style"></el-input>
          </el-row>


          <el-row style="padding-top: 20px;">
            <div style="border-bottom: 1px solid #bfcbd9; width: 800px; "></div>
          </el-row>
        </el-form-item>


        <el-form-item label="应用小图标" prop="applogosmall">
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
            <el-input v-model="form.applogosmall" v-if="false" size="small" class="app-input-style"></el-input>
          </el-row>

          <el-row>
            <div style="border-bottom: 1px solid #bfcbd9; width: 800px; padding-top: 20px;"></div>
          </el-row>


        </el-form-item>

        <el-form-item label="应用大图标" prop="applogo">

          <el-row>
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

          <el-row>
            <el-input v-model="form.applogo" v-if="false" size="small" class="app-input-style"></el-input>
          </el-row>

          <el-row>
            <div style="border-bottom: 1px solid #bfcbd9; width: 800px; padding-top: 20px;"></div>
          </el-row>

        </el-form-item>

        <el-form-item label="应用简介">
          <el-input type="textarea" v-model="form.desciption" size="small" class="app-input-style"></el-input>
        </el-form-item>

        <el-form-item label="应用网站信息" class="app-title-style">
        </el-form-item>

        <el-form-item label="应用官网" prop="webappwebsite">
          <el-input v-model="form.webappwebsite" size="small" class="app-input-style"></el-input>
        </el-form-item>
        <el-form-item label="应用维护访问地址">
          <el-input v-model="form.webappwebsitewh" size="small" class="app-input-style"></el-input>
        </el-form-item>
        <el-form-item label="oauth回调地址" prop="webappoauth">
          <el-input v-model="form.webappoauth" size="small" class="app-input-style"></el-input>
        </el-form-item>
        <el-form-item label="cas回调地址" prop="webappsso">
          <el-input v-model="form.webappsso" size="small" class="app-input-style"></el-input>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" size="small" :disabled="addbuttonstatus" @click="submitForm('webappform')">立即创建
          </el-button>
          <el-button size="small">取消</el-button>
        </el-form-item>

      </el-form>
    </el-row>
  </div>
</template>

<script>
  import {SECOND_MENU_SHOW} from '../../../../store/mutation-types'
  import applogo from '../../../../assets/img/applogo.png'
  import * as appservice from '../../../../service/webapp'
  import commonutils from '../../../../utils/commonutils'
  import {dictvaluelist} from '../../../../service/systemdict'

  export default {
    data() {
      const validateRegestInfo = (rule, value, callback) => {
        if (value === null) {
          callback(new Error('请上传网站登记信息表'))
        } else {
          callback()
        }
      }

      const validateapplogosmall = (rule, value, callback) => {
        if (value === null) {
          callback(new Error('请上传应用小图标'))
        } else {
          callback()
        }
      }

      const validateapplogo = (rule, value, callback) => {
        if (value === null) {
          callback(new Error('请上传应用大图标'))
        } else {
          callback()
        }
      }

      return {
        form: {
          desciption: '',
          freestatus: 'N',
          webappname: '',
          webappenname: '',
          webapptype: 'website',
          webappkind: '',
          webappstatus: '1',
          webappwebsite: '',
          webappwebsitewh: '',
          webappversion: '',
          webappversionname: '',
          webappoauth: '',
          webappsso: '',
          webappscope: '',
          regestinfofile: null,
          applogosmall: null,
          applogo: null
        },
        applogo: applogo,
        filelistsmall: [],
        filelistlarge: [],
        filelistinfo: [],
        addbuttonstatus: false,
        webkindlist: [],
        rules: {
          webappname: [
            {required: true, message: '请输入应用名称', trigger: 'blur'},
          ],
          webappversion: [
            {required: true, message: '请输入应用版本号', trigger: 'blur'},
          ],
          webappkind: [
            {required: true, message: '请选择应用分类', trigger: 'change'},
          ],
          webappstatus: [
            {required: true, message: '请选择应用状态', trigger: 'change'},
          ],
          freestatus: [
            {required: true, message: '请选择收费状态', trigger: 'change'},
          ],
          webappwebsite: [
            {required: true, message: '请输入应用网址', trigger: 'blur'},
          ],
          webappoauth: [
            {required: true, message: '请输入oauth地址', trigger: 'blur'},
          ],
          webappsso: [
            {required: true, message: '请输入sso地址', trigger: 'blur'},
          ],
          regestinfofile: [
            {required: true, validator: validateRegestInfo, trigger: 'change'},
          ],
          applogosmall: [
            {required: true, validator: validateapplogosmall, trigger: 'change'},
          ],
          applogo: [
            {required: true, validator: validateapplogo, trigger: 'change'},
          ]
        }
      }
    },
    created() {
      /* 隐藏掉二级导航栏 */
      this.$store.commit(SECOND_MENU_SHOW, false)

      /* 加载应用分类 */
      this.getwebkindlist()

    },
    methods: {
      getwebkindlist() {
        const type = 'webappkind'
        dictvaluelist({type}).then(value => {
          this.webkindlist = value.data
        })
      },
      handlesmallRemove(file, fileList) {
        this.$refs.uploadsmall.clearFiles()
        this.filelistsmall = []
        this.form.applogosmall = null
      },
      handlesmallChange(file, fileList) {
        this.$refs.uploadsmall.clearFiles()
        this.form.applogosmall = null
        const imgfile = file.raw
        if (!commonutils.checkImgExt(imgfile)) {
          this.$message.error('文件格式非法,请上传图片格式')
        } else {
          if (imgfile.size / 1000 < 500) {
            this.form.applogosmall = imgfile
            this.filelistsmall = [file]
          } else {
            this.$message.error('上传文件图片不能大于500KB')
          }
          this.checkfilestatus('webappform', 'applogosmall')
        }
      },
      handlelargeChange(file, fileList) {
        this.$refs.uploadlarge.clearFiles()
        this.form.applogo = null
        const imgfile = file.raw
        if (!commonutils.checkImgExt(imgfile)) {
          this.$message.error('文件格式非法,请上传图片格式')
        } else {
          if (imgfile.size / 1000 < 500) {
            this.form.applogo = imgfile
            this.filelistlarge = [file]
          } else {
            this.$message.error('上传文件图片不能大于500KB')
          }
          this.checkfilestatus('webappform', 'applogo')
        }
      },
      handlelargeRemove(file, fileList) {
        this.$refs.uploadlarge.clearFiles()
        this.filelistlarge = []
        this.form.applogo = null
      },
      handleregestinfoChange(file, fileList) {
        this.$refs.uploadregestinfo.clearFiles()
        this.form.regestinfofile = null
        const imgfile = file.raw
        if (!commonutils.checkImgExt(imgfile)) {
          this.$message.error('文件格式非法,请上传图片格式')
        } else {
          if (imgfile.size / 1000 < 2000) {
            this.form.regestinfofile = imgfile
            this.filelistinfo = [file]
          } else {
            this.$message.error('上传文件图片不能大于2M')
          }
          this.checkfilestatus('webappform', 'regestinfofile')
        }
      },
      handleregestinfoRemove(file, fileList) {
        this.$refs.uploadregestinfo.clearFiles()
        this.form.regestinfofile = null
        this.filelistinfo = []
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addbuttonstatus = true
            let formData = new FormData()
            formData.append('webappname', this.form.webappname)
            formData.append('webappenname', this.form.webappenname)
            formData.append('webapptype', this.form.webapptype)
            formData.append('webappkind', this.form.webappkind)
            formData.append('webappstatus', this.form.webappstatus)
            formData.append('webappwebsite', this.form.webappwebsite)
            formData.append('webappwebsitewh', this.form.webappwebsitewh)
            formData.append('webappversion', this.form.webappversion)
            formData.append('webappversionname', this.form.webappversionname)
            formData.append('webappoauth', this.form.webappoauth)
            formData.append('webappsso', this.form.webappsso)
            formData.append('regestinfofile', this.form.regestinfofile)
            formData.append('applogosmall', this.form.applogosmall)
            formData.append('applogo', this.form.applogo)
            formData.append('freestatus', this.form.freestatus)
            appservice.addapp(formData).then(value => {
              this.addbuttonstatus = false
              if (value.code === '1') {
                this.resetformobj()
                this.successadd()
              } else {
                this.$message.error('添加失败')
              }
            }).catch(function (reason) {
              this.addbuttonstatus = false
            })
          }
        })
      },
      checkfilestatus(formName, filed) {
        this.$refs[formName].validateField(filed)
      },
      successadd() {
        this.$confirm('添加应用成功', '提示', {
          confirmButtonText: '继续添加',
          cancelButtonText: '返回列表',
          type: 'success'
        }).then(() => {
          this.$router.push({path: '/manage/app/webapp/add'})
        }).catch(() => {
          this.$router.push({path: '/manage/app/webapp/list'})
        })
      },
      resetformobj() {
        this.form = {
          webappname: '',
          webappenname: '',
          webapptype: 'website',
          webappkind: '',
          webappstatus: '1',
          webappwebsite: '',
          webappwebsitewh: '',
          webappversion: '',
          webappversionname: '',
          webappoauth: '',
          webappsso: '',
          regestinfofile: null,
          applogosmall: null,
          freestatus: 'N',
        }
        this.filelistsmall = [],
          this.filelistlarge = [],
          this.filelistinfo = []
      }
    }
  }
</script>

<style scoped>
  .add-form-style {
    width: 1000px;
  }

  .bread-style {
    padding-bottom: 20px;
  }

  .el-breadcrumb {
    font-size: 14px;
  }

  .app-logo-large-style {
    width: 128px;
    height: 128px;
  }

  .upload-style {
    padding-top: 15px;
  }

  .app-title-style label {
    font-size: 15px !important;
  }

  .app-input-style {
    width: 500px;
  }

  .el-upload__tip {
    font-size: 13px;
    margin-top: 0px;
  }

</style>
