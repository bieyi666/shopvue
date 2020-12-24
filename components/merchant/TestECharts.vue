<template>
  <div>
        <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <div id="myChart" style="width: 600px;height:400px;"></div>

  </div>
</template>

<script>
import echarts from 'echarts'

  export default {
    name: "TestECharts",
    data() {
      return {
        tests:["测试1","测试2","测试3","测试4","测试5","测试6"],
        test:[5, 20, 36, 10, 10, 20],
        text:"在Vue中测试echarts"
      }
    },
    mounted(){
      this.$nextTick(() => {
        this.getData();
      });
    },
    methods: {
      getData() {

        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: { text: this.text },
          tooltip: {},
          xAxis: {
            data:this.tests
          },
          yAxis: {},
          series: [{
            name: '收入',
            type: 'bar',
            data: this.test
          }]
        });
      }
    },
    created() {

    },
  }




</script>

<style scoped>

</style>
