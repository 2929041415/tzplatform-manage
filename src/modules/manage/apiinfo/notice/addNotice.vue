<template>
  <div class="addplatform">
    <el-row style="padding-bottom: 25px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/manage/apiinfo/notice/listnotice' }">系统公告</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/manage/apiinfo/notice/addNotice' }">添加系统公告</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-form :model="formData" :rules="rules" ref="addModal" label-position="right" class="form-style"
             label-width="120px">
      <el-row>
        <el-form-item label="是否显示" prop="showstatus">
          <el-radio class="radio" v-model="formData.showstatus" label="1">显示</el-radio>
          <el-radio class="radio" v-model="formData.showstatus" label="2">不显示</el-radio>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="公告标题" prop="title">
          <el-input type="textarea" v-model="formData.title" :autosize="{ minRows: 3, maxRows: 5}"
                    auto-complete="off"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="公告内容" prop="content">
          <div id="editorElem"></div>
        </el-form-item>
      </el-row>
      <el-form-item>
      <div style="float: right;">
        <el-button type="primary" @click="submitFormAdd('addModal')" size="small">确 定</el-button>
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
        formData: {
          title: '',
          content: '',
          showstatus: '',
        },
        rules: {
          title: [{required: true, message: '请填写文章标题', trigger: 'blur'}],
          content: [{required: true, message: '请填写文章内容', trigger: 'blur'}],
          showstatus: [{required: true, message: '请选择是否需要显示', trigger: 'blur'}],
        }
      }
    },
    mounted() {
      var editor = new E('#editorElem');
      editor.customConfig.onchange = (html) => {
        this.formData.content = html;
      }
      editor.create();
    },
    methods: {
      submitFormAdd(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const param = this.formData;
            systemapiservice.addnotice({...param}).then(value => {
              if (value.code === '1') {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.$router.push({path: '/manage/apiinfo/notice/listnotice'})
              } else {
                this.$message.error('操作失败')
              }
            })
          }
        })
      },
      resetFormData() {
        this.$router.push({path: '/manage/apiinfo/notice/listNotice'})
      },
    },

  }
</script>
<style scoped>
  .addplatform {
    width: 1150px;
  }
</style>
