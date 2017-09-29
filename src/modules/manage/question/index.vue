<template>
  <div class="platform-style">
    <el-row>
      <div class="main-support-content">
        <div class="content">
          <el-row>
            <el-col :span="8" :offset="16">

            </el-col>
          </el-row>
        </div>
      </div>
    </el-row>
    <div class="main-support-content ques-style">
      <el-row>
        <el-col :span="4">
          <div class="doc-left-menu">
            <dl class="sidebar-class active">
              <dt>
                <a href="javascript:void(0);">热门问题</a>
              </dt>
              <dd v-for="item in questiontypelist">
                <a href="javascript:void(0)" v-bind:class="{ selected_tab: itemselect==item.name }"
                   @click="choosetype(item.name)" :title="item.value" v-text="item.value">
                  常见问题
                </a>
              </dd>
            </dl>
          </div>
        </el-col>
        <el-col :span="20">
          <el-row>
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="问题名称">
                <el-input placeholder="问题名称" size="small" v-model="queryquestion"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" icon="search" @click="getdatalist">查询</el-button>
                <el-button type="primary" size="small" @click="resetquery">重置</el-button>
              </el-form-item>
              <el-form-item class="addbutton-style">
                <el-button type="primary" size="small" @click="addquestion">添加问题</el-button>
              </el-form-item>
            </el-form>
          </el-row>

          <el-table
            :data="formdatalist"
            style="width: 100%">
            <el-table-column
              prop="question"
              label="问题名称">
            </el-table-column>
            <el-table-column
              prop="questiontype"
              label="问题类型"
              :formatter="formattertype">
            </el-table-column>
            <el-table-column
              prop="answer"
              label="答案"
              width="280"
              :formatter="formatteranswer">
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button
                  size="small"
                  type="text"
                  @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button
                  size="small"
                  type="text"
                  class="danger-style"
                  @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-pagination v-if="totalNumber>0" class="page-style"
                       :current-page="pageNum"
                       @current-change="handleCurrentChange"
                       @size-change="handleSizeChange"
                       :page-sizes="[10,50, 100, 200]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="totalNumber">
        </el-pagination>
      </el-row>
    </div>

    <AddModal></AddModal>
    <EditModal>></EditModal>

  </div>
</template>
<script>
  import {dictvaluelist} from '../../../service/systemdict'
  import {delQuestion} from '../../../service/question'
  import {
    QUESTION_ADD_MODAL,
    QUESTION_TYPE_LIST,
    UPDATE_QUESTION_DATA,
    QUESTION_EDIT_MODAL,
    QUESTION_SELECT_TYPE
  } from '../../../store/mutation-types'
  import {QUESTION_DATA_LIST} from '../../../store/action-types'
  import AddModal from './addmodal'
  import EditModal from './editmodal'

  export default {
    data() {
      return {
        questiontypelist: [],
        tableData: [],
        pageNum: 1,
        pageSize: 10,
        queryquestion: ''
      }
    },
    created() {
      //加载问题类型
      const type = 'hotquestion'
      dictvaluelist({type}).then(value => {
        this.questiontypelist = value.data
        this.$store.commit(QUESTION_TYPE_LIST, value.data)
        const questiontype = value.data[0].name
        this.$store.commit(QUESTION_SELECT_TYPE, questiontype)
        this.getdatalist()
      })
    },
    computed: {
      formdatalist: {
        get() {
          return this.$store.state.question.questionlist
        },
        set(value) {

        }
      },
      itemselect: {
        get() {
          return this.$store.state.question.selecttype
        },
        set(value) {
        }
      },
      totalNumber:{
        get() {
          return this.$store.state.question.totalNumber
        },
        set(value) {
        }
      }
    },
    components: {AddModal, EditModal},
    methods: {
      formattertype(row, column) {
        const typelist = this.questiontypelist
        const result = typelist.find(function (value, index, arr) {
          return value.name === row.questiontype;
        })
        let resultname = ''
        if (undefined !== result) {
          resultname = result.value
        }
        return resultname
      },
      formatteranswer(row, column) {
        const answer = row.answer
        let resultanswer = ''
        if (answer.length > 15) {
          const result = answer.substring(0, 15)
          resultanswer = `${result}......`
        } else {
          resultanswer = answer
        }
        return resultanswer
      },
      addquestion() {
        this.$store.commit(QUESTION_ADD_MODAL, true)
      },
      handleEdit(index, row) {
        this.$store.commit(UPDATE_QUESTION_DATA, row)
        this.$store.commit(QUESTION_EDIT_MODAL, true)
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const id = row.id
          delQuestion({id}).then(value => {
            if (value.code === '1') {
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.$store.dispatch(QUESTION_DATA_LIST, {})
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
      },
      choosetype(item) {
        this.$store.commit(QUESTION_SELECT_TYPE, item)
        this.queryquestion = ''
        this.getdatalist()
      },
      getdatalist() {
        const pageNum = this.pageNum
        const pageSize = this.pageSize
        const question = this.queryquestion
        const questiontype = this.$store.state.question.selecttype
        this.$store.dispatch(QUESTION_DATA_LIST, {pageNum, pageSize, questiontype, question})
      },
      resetquery() {
        this.queryquestion = ''
        this.getdatalist()
      },
      handleCurrentChange(page) {
        this.pageNum = page
        this.getdatalist()
      },
      handleSizeChange(pagesize) {
        this.pageSize = pagesize
        this.pageNum = 1
        this.getdatalist()
      }
    }
  }
</script>
<style scoped>
  .platform-style {
    padding-top: 0px;
  }

  .main-support-content {
    background: #fff;
    border-radius: 6px;
  }

  .main-support-content .title {
    color: #222;
    font-size: 14px;
  }

  .main-support-content .title span {
    font-size: 26px;
    padding-right: 24px;
  }

  .main-support-content .content {
    margin-top: 20px;
  }

  .doc-left-menu .sidebar-class a {
    color: #555;
    text-decoration: none;
  }

  .doc-left-menu .sidebar-class > dd > a {
    display: block;
  }

  .doc-left-menu .sidebar-class > dt > a {
    display: block;
    color: #222;
    font-size: 16px;
    font-weight: 900;
  }

  .doc-left-menu .sidebar-class > dt {
    margin-bottom: 5px;
  }

  .doc-left-menu .sidebar-class > dd {
    font-size: 14px;
  }

  .doc-left-menu .sidebar-class > dd > a:hover {
    color: #20A0FF;
    border-right: 2px solid #20A0FF;
  }

  .selected_tab {
    color: #20A0FF !important;
  }

  .doc-left-menu .sidebar-class {
    line-height: 40px;
  }

  .question-content .data_title {
    border-bottom: 1px solid #e9e9e9;
    height: 35px;
    font-size: 22px;
    color: #269bff;
    margin-top: 8px;
  }

  .question-content .data_title h3 {
    float: left;
    font-weight: normal;
    font-size: 16px;
    color: #269bff;
  }

  .question-content ul li {
    float: left;
    width: 100%;
    line-height: 46px;
    height: 46px;
    background: #f6f9fb;
    font-size: 14px;
  }

  .question-content ul li a {
    color: #555555;
    display: block;
    height: 42px;
  }

  .question-content ul li a:hover {
    color: #269bff;
  }

  .question-content ul li a span {
    float: left;
  }

  .question-content ul li a em {
    float: right;
    color: #acacac;
  }

  .page-style {
    float: right;
  }

  .ques-style {
    min-height: 400px;
  }

  .addbutton-style {
    float: right;
  }
</style>
