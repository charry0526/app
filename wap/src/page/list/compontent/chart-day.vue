<template>
  <div>
    <div class="chartBox" ref="myEchart"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { Toast } from 'mint-ui'
import * as api from '@/axios/api'

export default {
  components: {},
  props: {
    code: {
      type: String,
      default: function () {}
    },
    id: {

    },
    data: {},
    selected: {
      type: String,
      default: function () {}
    }
  },
  data () {
    return {
      chart: null,
      hasload: false,
      classStyle: 'red'
    }
  },

  watch: {
    selected (newval) {
      // if (!this.hasload) {
      // this.getDate(newval)
      // }
    },
    data (newval) {
      this.getDate()
    }
  },

  computed: {},
  created () {
    // this.getDate()
    // this.classStyle = localStorage.getItem('styleName') ? localStorage.getItem('styleName') : 'red'
  },
  mounted () {
    // this.getDate()
  },
  methods: {

    formatDate (date, fmt) {
      date = new Date(date * 1000)
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
        }
      }
      return fmt
    },
    // 左边补0函数
    padLeftZero (str) {
      return ('00' + str).substr(str.length)
    },

    async getDate () {
      let id = this.id
      // this.data = {"status":0,"data":{"stockName":"伦敦银","stockCode":"XAG","values":[[23.919,23.441,23.405,24.619,0.0],[23.365,22.338,22.274,23.59,0.0],[22.218,22.246,22.129,22.595,0.0],[22.035,22.157,22.028,22.442,0.0],[22.11,22.304,22.11,22.519,0.0],[22.158,21.958,21.896,22.574,0.0],[21.943,22.0,21.814,22.289,0.0],[21.955,21.973,21.778,22.065,0.0],[21.851,21.828,21.589,22.023,0.0],[21.549,21.604,21.395,21.866,0.0],[21.458,21.565,21.419,21.8,0.0],[21.549,21.719,21.16,21.79,0.0],[21.635,21.752,21.515,21.891,0.0],[21.593,21.822,21.593,21.961,0.0],[21.767,21.49,21.427,21.965,0.0],[21.481,21.291,21.249,21.664,0.0],[21.248,20.755,20.724,21.384,0.0],[20.58,20.611,20.53,20.825,0.0],[20.606,20.875,20.398,20.985,0.0],[20.876,20.967,20.809,21.158,0.0],[20.973,20.873,20.653,20.994,0.0],[20.874,21.078,20.822,21.134,0.0],[21.219,21.028,20.959,21.284,0.0],[21.013,20.044,20.007,21.121,0.0],[20.07,20.004,19.892,20.206,0.0],[20.01,20.048,19.956,20.273,0.0],[20.076,20.5,19.88,20.771,0.0],[20.737,21.779,20.569,21.907,0.0],[21.776,21.665,21.454,21.953,0.0],[21.657,21.75,21.521,22.361,0.0],[21.768,21.668,21.446,22.064,0.0],[21.696,22.572,21.64,22.581,0.0],[22.282,22.518,22.2,22.695,0.0],[22.507,22.37,22.134,22.629,0.0],[22.356,22.966,22.248,23.05,0.0],[22.952,23.083,22.738,23.203,0.0],[23.068,23.211,22.946,23.505,0.0],[23.233,23.051,22.829,23.253,0.0],[23.053,23.302,22.804,23.355,0.0],[23.308,23.316,23.026,23.395,0.0],[23.296,23.881,23.215,23.909,0.0],[23.881,24.064,23.672,24.141,0.0],[24.085,23.964,23.546,24.17,0.0],[23.957,24.979,23.802,24.999,0.0],[24.961,24.925,24.62,25.115,0.0],[24.922,24.949,24.541,24.984,0.0],[24.706,24.849,24.691,25.054,0.0],[24.847,25.029,24.813,25.029,0.0],[25.019,25.475,25.012,25.475,0.0],[25.454,25.8,25.367,25.8,0.0],[25.805,25.362,25.132,25.805,0.0]],"volumes":[[0,0.0,-1],[1,0.0,-1],[2,0.0,1],[3,0.0,1],[4,0.0,1],[5,0.0,-1],[6,0.0,1],[7,0.0,1],[8,0.0,-1],[9,0.0,1],[10,0.0,1],[11,0.0,1],[12,0.0,1],[13,0.0,1],[14,0.0,-1],[15,0.0,-1],[16,0.0,-1],[17,0.0,1],[18,0.0,1],[19,0.0,1],[20,0.0,-1],[21,0.0,1],[22,0.0,-1],[23,0.0,-1],[24,0.0,-1],[25,0.0,1],[26,0.0,1],[27,0.0,1],[28,0.0,-1],[29,0.0,1],[30,0.0,-1],[31,0.0,1],[32,0.0,1],[33,0.0,-1],[34,0.0,1],[35,0.0,1],[36,0.0,1],[37,0.0,-1],[38,0.0,1],[39,0.0,1],[40,0.0,1],[41,0.0,1],[42,0.0,-1],[43,0.0,1],[44,0.0,-1],[45,0.0,1],[46,0.0,1],[47,0.0,1],[48,0.0,1],[49,0.0,1],[50,0.0,-1]],"date":["2023-02-02","2023-02-03","2023-02-06","2023-02-07","2023-02-08","2023-02-09","2023-02-10","2023-02-13","2023-02-14","2023-02-15","2023-02-16","2023-02-17","2023-02-20","2023-02-21","2023-02-22","2023-02-23","2023-02-24","2023-02-27","2023-02-28","2023-03-01","2023-03-02","2023-03-03","2023-03-06","2023-03-07","2023-03-08","2023-03-09","2023-03-10","2023-03-13","2023-03-14","2023-03-15","2023-03-16","2023-03-17","2023-03-20","2023-03-21","2023-03-22","2023-03-23","2023-03-24","2023-03-27","2023-03-28","2023-03-29","2023-03-30","2023-03-31","2023-04-03","2023-04-04","2023-04-05","2023-04-06","2023-04-10","2023-04-11","2023-04-12","2023-04-13","2023-04-14"]}}
      // let data = this.data;
      let time = parseInt(new Date().getTime() / 1000) + ''
      let endtime = 0
      console.log(id)
      let day = 0
      switch (id + '') {
        case '1':
          day = 367
          endtime = time - day * 3600 * 24
          break
        case '2':
          day = 181
          endtime = time - day * 3600 * 24
          break
        case '3':
          day = 91
          endtime = time - day * 3600 * 24
          break
        case '4':
          day = 8
          endtime = time - day * 3600 * 24
          break
          // case '4':

          // case '6':
          //   endtime = 0;
          //   break;
      }
      console.log(endtime)

      let data = {
        'status': 0,
        'data': {
          'stockName': this.code,
          'stockCode': this.code,
          'values': [
          ],
          'volumes': [

          ],
          'date': []
        }
      }
      console.log(data)

      for (let index = this.data.t.length; index >= 0; index--) {
        if (this.data.t[index] > endtime) {
          data.data.date.push(this.formatDate(this.data.t[index], 'yyyy-MM-dd'))
          data.data.values.push([
            this.data.o[index],
            this.data.c[index],
            this.data.h[index],
            this.data.l[index]

          ])
          data.data.volumes.push([index, this.data.v[index], -1])
        }
      }

      data.data.date = data.data.date.reverse()
      data.data.values = data.data.values.reverse()
      data.data.volumes = data.data.volumes.reverse()

      for (let index = 0; index < data.data.volumes.length; index++) {
        data.data.volumes[index][0] = index
      }
      console.log(data.data)
      this.initEchartMap(data.data)

      // 期货
      // if(this.code.indexOf('hf_')!=-1){
      //   // let data = await api.getFuturesDayK({code: this.code})
      //   if (data.status === 0) {
      //     alert(1)
      //     this.initEchartMap(data.data)
      //     this.hasload = true
      //   } else {
      //     //Toast(data.msg)
      //   }
      // } else if(this.code.indexOf('sh')!=-1 || this.code.indexOf('sz')!=-1){
      //   let data = await api.getIndexDayK({code: this.code})
      //   if (data.status === 0) {
      //     this.initEchartMap(data.data)
      //     this.hasload = true
      //   } else {
      //     //Toast(data.msg)
      //   }
      // } else{
      //   let opts = {
      //     code: this.code,
      //     time: 30,
      //     ma: 5,
      //     size: 50
      //   }
      //   let data = await api.getDayK(opts)
      //   if (data.status === 0) {
      //     this.initEchartMap(data.data)
      //     this.hasload = true
      //   } else {
      //     //Toast(data.msg)
      //   }
      // }
    },
    splitData (rawData) {
      var categoryData = []
      var values = []
      var volumes = []
      for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0])
        values.push(rawData[i])
        volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1])
      }
      return {
        categoryData: categoryData,
        values: values,
        volumes: volumes
      }
    },
    calculateMA (dayCount, data) {
      var result = []
      for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-')
          continue
        }
        var sum = 0
        for (var j = 0; j < dayCount; j++) {
          sum += data.values[i - j][1]
        }
        result.push(+(sum / dayCount).toFixed(3))
      }
      return result
    },
    initEchartMap (data) {

      console.log(data.values)
      let this_ = this
      let upColor = '#00da3c'
      let downColor = '#ec0000'
      // var data = this.splitData(rawData);
      let myChart = echarts.init(this.$refs.myEchart)
      window.onresize = myChart.resize
      let option = {
        backgroundColor: '#21252a',
        animation: true,
        legend: { // 图例组件
          bottom: 10, // 图例组件离容器下侧的距离。
          left: 'center', // 图例组件离容器左侧的距离。
          data: data.stockName
        },
        tooltip: { // 提示框组件 坐标轴指示器是指示坐标轴当前刻度的工具
          trigger: 'axis', // 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图
          axisPointer: {
            type: 'cross'
          },
          backgroundColor: 'rgba(245, 245, 245, 0.8)',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          textStyle: {
            color: '#000'
          },
          position: function (pos, params, el, elRect, size) {
            var obj = { top: 20 }
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30
            return obj
          },
          formatter: function (param) {
            let param2
            if (param[0].seriesName === '成交量') {
              param2 = param[0]
              param = param[1]
            } else {
              param2 = param[1]
              param = param[0]
            }
            return [
              this_.code + '<hr size=1 style="margin: 3px 0">',
              'O: ' + param.data[1] + '<br/>',
              'H: ' + param.data[3] + '<br/>',
              'L: ' + param.data[4] + '<br/>',
              'C: ' + param.data[2] + '<br/>',
              // 'Khối lượng: ' + param.data[4] + '<br/>',

              param.name
            ].join('')
          }
          // extraCssText: 'width: 170px'
        },
        axisPointer: { // 坐标轴指示器
          link: { xAxisIndex: 'all' },
          label: {
            backgroundColor: '#777' // hover  number bg
          }
        },
        toolbox: { // 工具栏
          feature: { // 各工具配置项。//除了各个内置的工具按钮外，还可以自定义工具按钮。
            dataZoom: {// 数据区域缩放
              yAxisIndex: false
            },
            brush: { // 选框组件的控制按钮
              type: ['clear']
            }
          }
        },
        brush: { // brush 是区域选择组
          xAxisIndex: 'all',
          brushLink: 'all',
          outOfBrush: {
            colorAlpha: 0.1
          }
        },
        visualMap: { // visualMap 是视觉映射组件，
          show: false,
          seriesIndex: 5,
          dimension: 2,
          pieces: [{
            value: 1,
            color: downColor
          }, {
            value: -1,
            color: upColor
          }]
        },
        grid: [ // 直角坐标系内绘图网格  设置表格的位置
          {
            left: '10%',
            right: '6%',
            height: '65%',
            top: '10%'
          },
          {
            left: '10%',
            right: '6%',
            top: '78%',
            height: '20%'
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: data.date,
            scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            splitLine: { show: false },
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
              z: 100
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: this_.classStyle === 'red' ? '#666' : '#ccc'

              }
            }
          },
          {
            type: 'category',
            gridIndex: 1,
            data: data.date,
            scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
            // axisPointer: {
            //     label: {
            //         formatter: function (params) {
            //             var seriesValue = (params.seriesData[0] || {}).value;
            //             return params.value
            //             + (seriesValue != null
            //                 ? '\n' + echarts.format.addCommas(seriesValue)
            //                 : ''
            //             );
            //         }
            //     }
            // }
          }
        ],
        yAxis: [
          {
            scale: true,
            splitArea: { // 设置y轴分割块颜色
              show: false,
              areaStyle: {
                color: ['rgba(33,37,42,1)', 'rgba(33,37,42,1)'],
                opacity: 0
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: this_.classStyle === 'red' ? '#666' : '#ccc'
              }
            },
            splitLine: {
              lineStyle: {
                // 使用深浅的间隔色
                color: this_.classStyle === 'red' ? '#eee' : '#333' // 分割线
              }
            }
          },
          {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          }
        ],
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: 0,
            end: 100
          },
          {
            show: false,
            xAxisIndex: [0, 1],
            type: 'slider',
            top: '65%',
            start: 0,
            end: 100
          }
        ],
        series: [
          {
            name: data.stockName,
            type: 'candlestick',
            data: data.values,
            itemStyle: {
              normal: {
                color: upColor,
                color0: downColor,
                borderColor: null,
                borderColor0: null
              }
            },
            tooltip: {
              formatter: function (param) {
                param = param[0]
                return [
                  '开盘: ' + param.data[0] + '<br/>',
                  '收盘: ' + param.data[1] + '<br/>',
                  '最低: ' + param.data[2] + '<br/>',
                  '最高: ' + param.data[3] + '<br/>'
                ].join('')
              }
            }
          },
          {
            name: '成交量',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: data.volumes
          }
        ]
      }
      myChart.setOption(option)
      // myChart.dispatchAction({
      //     type: 'brush',
      //     areas: [
      //         {
      //             brushType: 'lineX',
      //             coordRange: ['2016-06-02', '2016-06-20'],
      //             xAxisIndex: 0
      //         }
      //     ]
      // });
    }
  }
}
</script>
<style lang="less" scoped>
  .chartBox {
    height: 380px;
    width: 100%;
    width: 7.5rem;
    margin-top: -6.3%;
  }
</style>
