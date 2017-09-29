<template>
  <div>
    <el-dialog
      title="添加问题"
      :visible.sync="addmodalstatus"
      size="tiny"
      custom-class="right-dialog-style"
      top="0"
      :modal=false
      :before-close="handleClose">
      <el-form label-position="right" :rules="rules" ref="questionform" class="form-style" label-width="80px"
               :model="questionobj">
        <el-form-item label="问题类型" prop="questiontype">
          <el-select v-model="questionobj.questiontype" placeholder="请选择" size="small" :clearable=true>
            <el-option
              v-for="item in typelist"
              :key="item.name"
              :label="item.value"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题名称" prop="question">
          <el-input v-model="questionobj.question" size="small"></el-input>
        </el-form-item>
        <el-form-item label="答案" prop="answer">
          <el-input v-model="questionobj.answer" type="textarea" :rows="8" size="small"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
              <el-button type="primary" size="small" @click="submitForm('questionform')">确 定</el-button>
              <el-button size="small">取 消</el-button>
             </span>
    </el-dialog>
  </div>
</template>

<script>
  import { addQuestion } from '../../../service/question'
  import {QUESTION_DATA_LIST} from '../../../store/action-types'
  import {QUESTION_ADD_MODAL} from '../../../store/mutation-types'

  export default {
    data() {
      return {
        rules: {
          question: [
            {required: true, message: '请输入问题名称', trigger: 'blur'},
          ],
          answer: [
            {required: true, message: '请输入答案', trigger: 'blur'},
          ],
          questiontype: [
            {required: true, message: '请选择类型', trigger: 'change'},
          ]
        },
        questionobj: {
          question: '',
          answer: '',
          questiontype:''
        }
      }
    },
    computed: {
      addmodalstatus: {
        get() {
          return this.$store.state.question.addmodalstatus
        },
        set(value) {

        }
      },
      typelist: {
        get() {
          return this.$store.state.question.questiontype
        },
        set(value) {

        }
      }
    },
    components: {},
    methods: {
      handleClose() {
        this.resetForm('questionform')
        this.$store.commit(QUESTION_ADD_MODAL, false)
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const param = this.questionobj
            addQuestion(param).then(value =>{
              if(value.code === '1'){
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                const questiontype = this.$store.state.question.selecttype
                this.$store.dispatch(QUESTION_DATA_LIST,{questiontype})
                this.resetForm('questionform')
                this.$store.commit(QUESTION_ADD_MODAL, false)
              }else {
                this.$message.error('操作失败')
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
