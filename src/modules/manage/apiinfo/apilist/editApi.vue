<template>
  <div class="editplatform">
    <el-row style="padding-bottom: 25px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/manage/apiinfo/apilist/listApi' }">接口列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/manage/apiinfo/apilist/listApi' }">修改接口</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-form :model="formData" :rules="rules" ref="editModal" label-position="right" class="form-style"
             label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="接口类型" prop="apittypeid">
            <el-select v-model="formData.apittypeid" placeholder="请选择" size="small" :clearable=true style="">
              <el-option
                v-for="item in apiType"
                :key="item.id"
                :label="item.typename"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="前置条件" prop="apicondition">
            <el-input v-model="formData.apicondition" auto-complete="off" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="接口名称" prop="apiname">
            <el-input v-model="formData.apiname" auto-complete="off" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="8">
          <el-form-item label="请求方式" prop="apireqway">
            <el-select v-model="formData.apireqway" auto-complete="off" size="small">
              <el-option label="POST" value="POST"></el-option>
              <el-option label="GET" value="GET"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="请求格式" prop="apireqtype">
            <el-input v-model="formData.apireqtype" auto-complete="off" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否需要授权" prop="apiauth">
            <el-radio class="radio" v-model="formData.apiauth" label="1">需要</el-radio>
            <el-radio class="radio" v-model="formData.apiauth" label="2">不需要</el-radio>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="请求次数限制" prop="apireqnumner">
        <el-input-number v-model="formData.apireqnumner" @change="handleChange" :min="0" size="small"
                         style="width: 213px"></el-input-number>
      </el-form-item>
      <el-row>
        <el-form-item label="请求地址" prop="apiurlBody">
          <el-input placeholder="请输入内容" v-model="formData.apiurlBody" class="select" size="small">
            <el-select v-model="apiurlHead" slot="prepend" placeholder="请选择">
              <el-option label="https://" value="https://"></el-option>
              <el-option label="http://" value="http://"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="接口简介" prop="apiintrouduce">
          <el-input type="textarea" v-model="formData.apiintrouduce" :autosize="{ minRows: 3, maxRows: 5}"
                    auto-complete="off"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="请求参数" prop="apireqparam">
          <div id="editorElemEdit">
            <div v-html="formData.apireqparam"></div>
          </div>
        </el-form-item>
      </el-row>
      <el-form-item>
        <div style="float: right;">
          <el-button type="primary" @click="submitFormEdit('editModal')" size="small">确 定</el-button>
          <el-button @click="resetFormData" size="small">取 消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import * as systemapiservice from '@/service/apiinfotype'
  import E from 'wangeditor'

  export default {
    data() {
      return {
        woshi:'wnis ',
        apiType: [],
        formData: {
          id:'',
          apittypeid: '',
          apiname: '',
          apiintrouduce:'',
          apicondition:'',
          apiurl:'',
          apireqway:'',
          apireqtype:'',
          apiauth: '',
          apireqnumner: '',
          apireqparam: '',
          apiurlBody:'',
        },
        apiurlHead:'',
        apireqparam:'',

        rules: {
          apittypeid:[{required:true,message:'请选择接口类型',trigger:'change'}],
          apiname:[{required:true,message:'请填写接口名称',trigger:'blur'}],
          apiintrouduce:[{required:true,message:'请填写接口简介',trigger:'blur'}],
          apicondition:[{required:true,message:'请填写前置条件',trigger:'blur'}],
          apiurlBody:[{required:true,message:'请填写请求地址',trigger:'blur'}],
          apireqway:[{required:true,message:'请选择请求方式',trigger:'blur'}],
          apireqtype:[{required:true,message:'请填写请求格式',trigger:'blur'}],
          apiauth:[{required:true,message:'请选择是否需要授权',trigger:'blur'}],
          apireqparam:[{required:true,message:'请填写请求参数',trigger:'blur'}],
        }
      }
    },
    computed:{
     /* formData:{
        get(){
          let apiinfoStr=sessionStorage.getItem('apiinfoData');
          return JSON.parse(apiinfoStr);
        },
        set(value){

        }
      }*/
    },
    created() {
      //查询下拉框
      this.getApiType();
      let apiinfoStr=sessionStorage.getItem('apiinfoData');
      this.formData= JSON.parse(apiinfoStr);
      this.apiurlHead=this.formData.apiurl.split("//")[0]+"//";
      this.formData.apiurlBody=this.formData.apiurl.split("//")[1];


    },
    mounted() {
      var editor = new E('#editorElemEdit');
      editor.customConfig.onchange = (html) => {
        this.apireqparam = html;
      }
      editor.create();
      /*editor.$txt.append('<p>新追加的内容</p>');*/
    },
    methods: {
      handleChange() {

      },
      getApiType() {
        systemapiservice.apitypeList({}).then(value => {
          this.apiType = value.data;
        })
      },
      gettabledata() {

      },
      resetFormData() {
        this.$router.push({path: '/manage/apiinfo/apilist/listApi'})
      },
      submitFormEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.formData.apiurl=this.apiurlHead+this.formData.apiurlBody;
            this.formData.apireqparam=this.apireqparam;
            const param = this.formData;
            systemapiservice.editApiManager({...param}).then(value => {
              if (value.code === '1') {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.$router.push({path: '/manage/apiinfo/apilist/listApi'})
              } else {
                this.$message.error('操作失败')
              }
            })
          }
        });
      }
    }
  }
</script>
<style scoped>
  .editplatform {
    width: 1150px;
  }
  .select .el-select .el-input {
    width: 100px;
  }
</style>
