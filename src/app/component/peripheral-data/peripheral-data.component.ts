import {Component, OnInit, Inject} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Params} from '@angular/router';
import {any} from "codelyzer/util/function";


@Component({
  selector: 'app-peripheral-data',
  templateUrl: './peripheral-data.component.html',
  styleUrls: ['./peripheral-data.component.css']
})
export class PeripheralDataComponent implements OnInit {

  trafficInfo = [];
  population = [];
  customer=[];
  industryInfo=[];

  public radarOption: any;
  public populationOption: any;
  public barChartOption: any;

  constructor(private modalService: NgbModal, @Inject('data') private data, private route: ActivatedRoute, @Inject('PeripheralDataService') private PeripheralDataService) {
    let queryParams: Params = this.route.params;
    let oppoId = queryParams.value.id;
    oppoId != 'undefined' ? this.getInfo(oppoId) : '';

    let params = {
      shop_id: oppoId
    }


    //周边数据-交通信息
    this.PeripheralDataService.getPeripheralTraffic(params).then(res => {
      this.trafficInfo = res;
    })

    //周边数据-聚客来源
    this.PeripheralDataService.getPeripheralCustom(params).then(res => {
      this.customer=res;
 /*     console.log("res菊科:",res);*/


      var data1 = [];
      var data2 = [];
      var data3 = [];
      var data4 = [];
      var data5 = [];
      var data6 = [];

      for (var i = 0; i < 70; i++) {
        data1.push([Math.random() * 5, Math.random() * 360]);
        data2.push([Math.random() * 5, Math.random() * 360]);
        data3.push([Math.random() * 10, Math.random() * 360]);
        data4.push([Math.random() * 5, Math.random() * 360]);
        data5.push([Math.random() * 5, Math.random() * 360]);
        data6.push([Math.random() * 10, Math.random() * 360]);
      }

      this.radarOption = {

        title: {
          text: '',
          left: 'center'
        },
        legend: {
          data: ['住宅小区', '写字楼', '商场', '学校', '医院', '交通枢纽'],
          top: 10
        },
        polar: {},
        angleAxis: {
          type: 'value'
        },
        radiusAxis: {
          axisAngle: 0
        },
        dataZoom: [
          {
            type: 'slider',
            radiusAxisIndex: 0,
            bottom: 0,
            start: 20,
            end: 80
          },
          {
            type: 'inside',
            radiusAxisIndex: 0,
            start: 20,
            end: 80
          }
        ],
        series: [{
          coordinateSystem: 'polar',
          // FIXME
          // 现在必须得设置这个，能不能polar和catesian一样，要不然很多特殊处理。
          angleAxisIndex: 0,
          radiusAxisIndex: 0,
          name: '住宅小区',
          type: 'scatter',
          symbolSize: 10,
          data: data1
        }, {
          coordinateSystem: 'polar',
          angleAxisIndex: 0,
          radiusAxisIndex: 0,
          name: '写字楼',
          type: 'scatter',
          symbolSize: 10,
          data: data2
        }, {
          coordinateSystem: 'polar',
          angleAxisIndex: 0,
          radiusAxisIndex: 0,
          name: '商场',
          type: 'scatter',
          symbolSize: 10,
          data: data3
        }, {
          coordinateSystem: 'polar',
          angleAxisIndex: 0,
          radiusAxisIndex: 0,
          name: '学校',
          type: 'scatter',
          symbolSize: 10,
          data: data4
        }, {
          coordinateSystem: 'polar',
          angleAxisIndex: 0,
          radiusAxisIndex: 0,
          name: '医院',
          type: 'scatter',
          symbolSize: 10,
          data: data5
        }, {
          coordinateSystem: 'polar',
          angleAxisIndex: 0,
          radiusAxisIndex: 0,
          name: '交通枢纽',
          type: 'scatter',
          symbolSize: 10,
          data: data6
        }]
      }
    })

    //周边数据-周边人口

    this.PeripheralDataService.getPeripheralPerson(params).then(res => {
      this.population = res;
      this.populationOption = {
        title: {
          text: '',
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: []
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            data: [
              {value: this.population['community_population'], name: '居住'},
              {value: this.population['office_building_population'], name: '工作'},
              {value: this.population['school_population'], name: '上学'},
              {value: this.population['mobile_population'], name: '流动'}
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
    })

    //周边数据-周边业态
    this.PeripheralDataService.getPeripheralIndustry(params).then(res => {
      this.industryInfo=res;
      var industryNameArr=[];
      var industryCountArr=[];

      for(let v in this.industryInfo['shop_num_per_industry']){
        industryNameArr.push(v);
        industryCountArr.push(this.industryInfo['shop_num_per_industry'][v]);
      }
      this.barChartOption = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: industryNameArr,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: industryCountArr
          }
        ]
      }
    })
  }


  ngOnInit() {}

  getInfo(id) {

  }


  closeResult: string;

  openConnectInfoModal(content) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      /*result == '1' ? this.currentCity = this.tempCurrentCity : '';*/
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}


