<!--EChrats-->
<template>
  <div>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="myChart" style="margin-left:200px;width: 600px;height:400px;" v-if="statistic.length!=0 || statistic.length!=0"></div>

  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: "TestECharts",
    data() {
      return {
        tests: ["测试1", "测试2", "测试3", "测试4", "测试5", "测试6"],
        test: [5, 20, 36, 10, 10, 20],
        text: "在Vue中测试echarts",
        //statistic:[1,2,31,1,3,4,5,6,73,3,3,2],
        statistic: [],
        statistics: []
      }
    },
    mounted() {


    },
    methods: {
      //预估收益
      getStatistic(state) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("state3", state);
        params.append("storeid", 1);
        this.$axios.post("queryStatisticsBySid.action", params).then((result => {
          //_this.statistic = result.data;
          var arr = [];
          for (var i = 1; i < 13; i++) {
            arr.push(result.data[i]);
          }

          arr.forEach(function (val, key) {
            _this.statistic.push(val)
          })
          _this.getData();

        })).catch((error => {
          alert(error)
        }))
      },
      //实际收益
      getStatistics(state) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("state3", state);
        params.append("storeid", 1);
        this.$axios.post("queryStatisticsBySid.action", params).then((result => {
          var arr = [];
          for (var i = 1; i < 13; i++) {
            arr.push(result.data[i]);
          }


          arr.forEach(function (val, key) {
            _this.statistics.push(val)
          })
          _this.getData();
        })).catch((error => {
          alert(error)
        }))
      },

      getData() {

        var cdom = document.getElementById('myChart');

        // 基于准备好的dom，初始化echarts实例


        console.log(cdom)
        // 绘制图表
        if (cdom != null && cdom != undefined) {

          let myChart = this.$echarts.init(cdom)

          myChart.setOption({
            /*title: { text: this.text },
            tooltip: {},
            xAxis: {
              data:this.tests
            },
            yAxis: {},
            series: [{
              name: '收入',
              type: 'bar',
              data: this.test
            }]*/

            title: {
              text: '预估收入和实际收入',
              subtext: '实际收入为已收货订单'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['预估收入', '实际收入']
            },
            toolbox: {
              show: true,
              feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            calculable: true,
            xAxis: [
              {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '预估收入',
                type: 'bar',
                data: this.statistic,
                markPoint: {
                  data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                  ]
                },
                markLine: {
                  data: [
                    {type: 'average', name: '平均值'}
                  ]
                }
              },
              {
                name: '实际收入',
                type: 'bar',
                data: this.statistics,
                markPoint: {
                  data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                  ]
                },
                markLine: {
                  data: [
                    {type: 'average', name: '平均值'}
                  ]
                }
              }
            ]


          });
        }
      }
    },
    created() {
      var _this = this;


      this.$nextTick(() => {

        _this.getStatistic(3);
        _this.getStatistics(1);

      })


    },
  }


</script>

<style scoped>

</style>
