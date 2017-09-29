<template>
  <div class="platform-">
    <el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item class="addbutton-style">
          <el-button type="primary" size="small" @click="addModal">添加系统公告</el-button>
        </el-form-item>
      </el-form>
    </el-row>


    <el-row v-for="(notice,index) in noticeList"  :key="notice.updatetime" style="border-bottom: 1px solid #e6e6e6">
      <el-col :span="24">
        <a href="javascript:void(0)" @click="detail(notice.id)" style="line-height: 40px;font-size: 14px" v-text="notice.title"></a>
        <span style="line-height: 40px;font-size: 14px;float: right">{{notice.updatetime|formatter}}</span>
      </el-col>
    </el-row>

    <!--分页模块-->
    <el-row>
      <el-pagination class="page-style"
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
</template>
<script>
  import * as systemapiservice from '@/service/apiinfotype'
  export default {
    data() {
      return {
        pageNum:1,
        pageSize:10,
        totalNumber:0,
        noticeList: [],
      }
    },
    created(){
      this.getNoticeList();
    },
    filters:{
      formatter(time){
          return time.substr(0,11);
      }
    },
    methods: {
      detail(id) {
        this.$router.push({path:'/manage/apiinfo/notice/editnotice',query:{noticeId:id}})
      },
      addModal() {
        this.$router.push({path:'/manage/apiinfo/notice/addnotice'})

      },
      getNoticeList(){
        const pageNum=this.pageNum;
        const pageSize=this.pageSize;
        systemapiservice.querynoticeList({pageSize,pageNum}).then(value=>{
          this.noticeList=value.data;
          this.totalNumber=value.total;
        })
      },
      /*分页方法*/
      handleCurrentChange(page) {
        this.pageNum = page;
        this.getNoticeList();
      },
      handleSizeChange(pagesize) {
        this.pageSize = pagesize;
        this.pageNum = 1;
        this.getNoticeList();
      },
    }
  }
</script>

<style scoped>
  .page-style {
    float: right;
    padding-top: 15px;
  }
  a{
    color: #555;
  }
</style>
