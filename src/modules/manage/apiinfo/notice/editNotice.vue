<template>
  <div class="editplatform">
    <el-row style="padding-bottom: 25px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/manage/apiinfo/notice/listnotice' }">系统公告</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/manage/apiinfo/notice/addNotice' }">修改系统公告</el-breadcrumb-item>
        <el-button style="float: right" type="danger" size="small" @click="deleteForm">删除该公告</el-button>
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
          <div id="editorElem">
            <div v-html="formData.content"></div>
          </div>
        </el-form-item>
      </el-row>
      <el-form-item>
        <div style="float: right;">
          <el-button type="primary" @click="submitFormAdd('addModal')" size="small">修改</el-button>
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
        id: this.$route.query.noticeId,
        rules: {
          title: [{required: true, message: '请填写文章标题', trigger: 'blur'}],
          content: [{required: true, message: '请填写文章内容', trigger: 'blur'}],
          showstatus: [{required: true, message: '请选择是否需要显示', trigger: 'blur'}],
        }
      }
    },
    created() {
      this.getNotice(this.$route.query.noticeId);
    },
    mounted() {
      var editor = new E('#editorElem');
      editor.customConfig.onchange = (html) => {
        this.formData.content = html;
      }
      editor.create();
    },
    methods: {
      getNotice(id) {
        systemapiservice.querynoticeList({id}).then(value => {
          for (const obj of value.data) {
            this.formData = obj
          }
        })
      },
      submitFormAdd(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const id = this.formData.id;
            const title = this.formData.title;
            const content = this.formData.content;
            const showstatus=this.formData.showstatus;
            systemapiservice.updatenotice({id, title, content,showstatus}).then(value => {
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
      deleteForm() {
        this.$confirm('此操作将永久删除该记录,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const id = this.id;
          systemapiservice.deletenotice({id}).then(value => {
            if (value.code === '1') {
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.$router.push({path: '/manage/apiinfo/notice/listNotice'})
            } else {
              this.$message.error('操作失败')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>
<style scoped>
  .editplatform {
    width: 1150px;
  }
</style>
