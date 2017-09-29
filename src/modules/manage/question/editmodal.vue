<template>
  <div>
    <el-dialog
      title="修改问题"
      :visible.sync="editmodalstatus"
      size="tiny"
      custom-class="right-dialog-style"
      top="0"
      :modal=false
      :before-close="handleClose">
      <el-form label-position="right" :rules="rules" ref="questionform" class="form-style" label-width="80px"
               :model="questionobj">
        <el-form-item label="问题类型" prop="questiontype">
          <el-select v-model="questiontype" placeholder="请选择" size="small" :clearable=true>
            <el-option
              v-for="item in typelist"
              :key="item.name"
              :label="item.value"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题名称" prop="question">
          <el-input v-model="question" size="small"></el-input>
        </el-form-item>
        <el-form-item label="答案" prop="answer">
          <el-input v-model="answer" type="textarea" :rows="8" size="small"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
              <el-button type="primary" size="small" @click="submitForm('questionform')">确 定</el-button>
              <el-button size="small" @click="handleClose">取 消</el-button>
             </span>
    </el-dialog>
  </div>
</template>

<script>
  import {editQuestion} from '../../../service/question'
  import {QUESTION_DATA_LIST} from '../../../store/action-types'
  import {
    QUESTION_EDIT_MODAL,
    CHANGE_QUESTION_QUESTION,
    CHANGE_QUESTION_ANSWER,
    CHANGE_QUESTION_QUESTIONTYPE,
    RESET_QUESTION_DATA
  } from '../../../store/mutation-types'

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
          questiontype: ''
        }
      }
    },
    computed: {
      editmodalstatus: {
        get() {
          return this.$store.state.question.editmodalstatus
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
      },
      question: {
        get() {
          this.questionobj.question = this.$store.state.question.editobj.question
          return this.$store.state.question.editobj.question
        },
        set(value) {
          this.questionobj.question = value
          this.$store.commit(CHANGE_QUESTION_QUESTION,value)
        }
      },
      answer: {
        get() {
          this.questionobj.answer = this.$store.state.question.editobj.answer
          return this.$store.state.question.editobj.answer
        },
        set(value) {
          this.questionobj.answer = value
          this.$store.commit(CHANGE_QUESTION_ANSWER,value)
        }
      },
      questiontype: {
        get() {
          this.questionobj.questiontype = this.$store.state.question.editobj.questiontype
          return this.$store.state.question.editobj.questiontype
        },
        set(value) {
          this.questionobj.questiontype = value
          this.$store.commit(CHANGE_QUESTION_QUESTIONTYPE,value)
        }
      }
    },
    components: {},
    methods: {
      handleClose() {
        this.$store.commit(QUESTION_EDIT_MODAL, false)
        this.$store.commit(RESET_QUESTION_DATA)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const param = this.$store.state.question.editobj
            editQuestion(param).then(value => {
              if (value.code === '1') {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                const questiontype = this.$store.state.question.selecttype
                this.$store.dispatch(QUESTION_DATA_LIST, {questiontype})
                this.$store.commit(QUESTION_EDIT_MODAL, false)
              } else {
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
