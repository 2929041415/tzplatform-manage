<template>
  <div id="appapieccess" style="height:400px;"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  import commonutils from '../../../utils/commonutils'

  export default {
    data() {
      return {
        myChart: null
      }
    },
    mounted() {
      this.myChart = echarts.init(document.getElementById('appapieccess'))
      this.createchart()
    },
    methods: {
      createchart() {
        this.myChart.setOption({
          title: {
            text: '应用分类统计',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: '占比统计',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 335, name: '教师发展'},
                {value: 310, name: '教育管理'},
                {value: 234, name: '名师成长'},
                {value: 135, name: '学生成长'},
                {value: 1548, name: '课堂教学'}
              ],
            }
          ],
          color: commonutils.getcolor(5)
        });
      }
    }
  }
</script>

<style scoped>
  .app-style {
    padding-top: 20px;
    padding-left: 32px;
  }
</style>
