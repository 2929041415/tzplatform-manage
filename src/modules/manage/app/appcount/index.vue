<template>
  <div class="platform-style">
    <el-row>
      <el-col :span="24">
        <div id="main" style="height:400px;"></div>
      </el-col>
    </el-row>

  </div>
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
      this.myChart = echarts.init(document.getElementById('main'))
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
            data: [50, 40, 36, 20, 20, 20, 20, 20, 20, 10]
          }],
          color: ['#20A0FF']
        });
      }
    }
  }
</script>

<style scoped>

</style>
