import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-peripheral-data',
  templateUrl: './peripheral-data.component.html',
  styleUrls: ['./peripheral-data.component.css']
})
export class PeripheralDataComponent implements OnInit {

  constructor() { }
 /* public chartOption: any;*/
  public radarOption: any;
  public populationOption:any;
  public barChartOption:any;


  ngOnInit() {
   /* this.chartOption = {
      title: {
        text: '堆叠区域图'
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : ['周一','周二','周三','周四','周五','周六','周日']
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'邮件营销',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
          name:'联盟广告',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
          name:'视频广告',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
          name:'直接访问',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
          name:'搜索引擎',
          type:'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: {normal: {}},
          data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }*/

    this.radarOption = {
      title: {
        text: ''
      },
      legend: {
        data: []
      },
      radar: [
        {
          indicator: [
            { text: '目标位置' }
          ],
          center: ['50%', '50%'],
          radius: 100,
          startAngle: 120,
          splitNumber: 4,
          shape: 'circle',
          name: {
            formatter:'[{value}]',
            textStyle: {
              color:'#72ACD1'
            }
          },
          splitArea: {
            areaStyle: {
              color: ['rgba(114, 172, 209, 0.2)',
                'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
                'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)'],
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowBlur: 10
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.5)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.5)'
            }
          }
        }
      ],
      series: [
        {
          name: '雷达图',
          type: 'radar',
          itemStyle: {
            emphasis: {
              color: 'rgba(114, 172, 209, 0.6)',
              lineStyle: {
                width: 4
              }
            }
          },
          data: [
            {
              value: [100, 8, 0.40, -80, 2000],
              name: '图一',
              symbol: 'circle',
              symbolSize: 10,
              lineStyle: {
                normal: {
                  type: 'dashed'
                }
              }
            }
          ]
        }
      ]
    }

    this.populationOption={
      title : {
        text: '',
        subtext: '',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: []
      },
      series : [
        {
          name: '',
          type: 'pie',
          radius : '60%',
          center: ['50%', '50%'],
          data:[
            {value:335, name:'居住'},
            {value:310, name:'工作'},
            {value:234, name:'上学'},
            {value:135, name:'流动'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

    this.barChartOption={
      color: ['#3398DB'],
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'直接访问',
          type:'bar',
          barWidth: '60%',
          data:[10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
  }

}


