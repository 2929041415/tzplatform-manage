<template>
  <el-row class="app-style">
    <el-col :span="24">
      <div id="appaccess" style="height:400px;"></div>
    </el-col>
  </el-row>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'

  export default {
    data() {
      return {
        myChart: null
      }
    },
    mounted() {
      this.myChart = echarts.init(document.getElementById('appaccess'))
      this.createchart()
    },
    methods: {
      createchart() {
        this.myChart.setOption({
          title: {text: '应用访问排行Top10'},
          tooltip: {},
          xAxis: {
            data: ["智慧客堂", "家校互动", "OA办公", "百度网盘", "选课系统", "德育课程", "OA办公", "百度网盘", "选课系统", "德育课程"]
          },
          yAxis: {
            position: 'left'
          },
          series: [{
            name: '应用访问量',
            type: 'bar',
            data: [500, 400, 360, 220, 120, 120, 120, 120, 120, 110]
          }],
          color: ['#20A0FF']
        });
      }
    }
  }
</script>

<style scoped>
  .app-style{
    padding-top: 20px;
    padding-left: 32px;
  }
</style>
