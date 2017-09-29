<template>
  <div class="platform-style">
    <el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="应用名称">
          <el-input placeholder="应用名称" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="search">查询</el-button>
          <el-button type="primary" size="small">重置</el-button>
        </el-form-item>
        <el-form-item class="addbutton-style">
          <el-button type="primary" size="small" @click="addapp">添加应用</el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-table
          :data="formdatalist"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="应用名称">
            <template scope="scope">
              <div style="display: table-cell; vertical-align: middle">
                <img class="app-logo-style" :src="scope.row.webapppicsmallbase">
                <span class="app-name-style">{{ scope.row.webappname }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="webappstatus"
            label="状态"
            :formatter="formatterstatus">
          </el-table-column>
          <el-table-column
            prop="kindvalue"
            label="所属分类">
          </el-table-column>
          <el-table-column
            prop="webappwebsite"
            label="应用官网">
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button
                size="small"
                type="text"
                class="green-style"
                @click="handleEdit(scope.$index, scope.row)">编辑应用
              </el-button>
              <el-button
                size="small"
                type="text"
                @click="webdetail(scope.row)">查看详情
              </el-button>
              <el-button
                size="small"
                type="text"
                class="danger-style"
                @click="handleEdit(scope.$index, scope.row)">下架应用
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-row>
  </div>
</template>

<script>
  import applogo from '../../../../assets/img/applogo.png'
  import {WEBAPP_DATA_LIST} from '../../../../store/action-types'
  import {WEBAPP_APP_ID} from '../../../../store/mutation-types'

  export default {
    data() {
      return {
        tableData: [{
          date: applogo,
          name: '选课系统',
          state: '已通过',
          address: '康邦科技有限公司'
        }, {
          date: applogo,
          name: '家校互动',
          state: '已通过',
          address: '康邦科技有限公司'
        }, {
          date: applogo,
          name: '云平台',
          state: '已通过',
          address: '康邦科技有限公司'
        }],
        applogo:applogo
      }
    },
    created() {

      /* 加载列表数据 */
      this.$store.dispatch(WEBAPP_DATA_LIST, {})

    },
    computed: {
      formdatalist: {
        get() {
          return this.$store.state.webapp.webapplist
        },
        set(value) {

        }
      }
    },
    methods: {
      webdetail(row) {
        this.$router.push({ path: '/manage/app/detail', query: { detailid: row.id }})
      },
      addapp() {
        this.$router.push({path: '/manage/app/webapp/add'})
      },
      handleEdit() {
        this.$router.push({path: '/manage/app/webapp/edit'})
      },
      formatterstatus(row, column) {
        const status = row.webappstatus
        let statusname = ''
        if ('1' === status) {
          statusname = '初审'
        } else if ('2' === status) {
          statusname = '已通过'
        }
        return statusname
      },
    }
  }
</script>

<style scoped>
  .platform-style {
    padding-top: 15px;
  }

  .app-name-style {
    margin-left: 15px;
    display: block;
    float: right;
    line-height: 80px;
  }

  .cell span {

  }


</style>
