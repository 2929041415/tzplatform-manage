<template>
  <div class="platform-style">
    <el-row>
      <el-col :span="24">
        <div id="main" style="height:400px;"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div id="main1" style="height:400px;"></div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  import * as systemapiservice from '@/service/apiinfotype'

  export default {
    data() {
      return {
        myChart: null,
        apitypeList: [],
        apitypeCount: [],
        apitypePie:[],
      }
    },
    mounted() {
      this.myChart = echarts.init(document.getElementById('main'))
      this.myChart1 = echarts.init(document.getElementById('main1'))
      systemapiservice.statisticsApi({}).then(value => {
        for (const obj of value.data) {
          this.apitypeList.push(obj.TYPENAME);
          this.apitypeCount.push(obj.TYPENUM);
          let pie={};
          pie.name=obj.TYPENAME;
          pie.value=obj.TYPENUM;
          this.apitypePie.push(pie);
        }
        this.createchart(this.apitypeList, this.apitypeCount,this.apitypePie);
      })
    },
    methods: {
      createchart(list, count,pie) {
        this.myChart.setOption({
          title: {text: '接口数量统计'},
          tooltip: {},
          xAxis: {
            data: list
          },
          yAxis: {
            position: 'left'
          },
          series: [{
            name: '接口数量',
            type: 'bar',
            data: count
          }],
          color: ['#20A0FF']
        });

        this.myChart1.setOption({
          title : {
            text: '接口数量统计',
            subtext: '百分比',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient : 'vertical',
            x : 'left',
            data:list
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {
                show: true,
                type: ['pie', 'funnel'],
                option: {
                  funnel: {
                    x: '25%',
                    width: '50%',
                    funnelAlign: 'left',
                    max: 1548
                  }
                }
              },
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          series : [
            {
              name:'接口类型',
              type:'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:pie
            }
          ]
        });
      }
    }
  }
</script>

<style scoped>

</style>
