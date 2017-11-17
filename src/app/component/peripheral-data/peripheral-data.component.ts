import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-peripheral-data',
  templateUrl: './peripheral-data.component.html',
  styleUrls: ['./peripheral-data.component.css']
})
export class PeripheralDataComponent implements OnInit {

  constructor() { }
  public chartOption: any;
  public radarOption: any;


  ngOnInit() {
    this.chartOption = {
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
    }

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
          center: ['10%', '50%'],
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
  }



}


