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
  customer = [];
  industryInfo = [];

  public radarOption: any;
  public populationOption: any;
  public barChartOption: any;

  detailModelHidden = true;
  tempDetailInfoContainer = [];

  constructor(private modalService: NgbModal, @Inject('data') private data, private route: ActivatedRoute, @Inject('PeripheralDataService') private PeripheralDataService) {

    //获取参数oppo_Id
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
      this.customer = res;
      var dataName=[];
      this.customer['FrontFour'].forEach((v,i)=>{
        dataName.push(v.name);
      });


      var data1 = [];
      var data2 = [];
      var data3 = [];
      var data4 = [];

        data1.push([this.customer['FrontFour'][0]['longitude'], this.customer['FrontFour'][0]['latitude']]);
        data2.push([this.customer['FrontFour'][1]['longitude'], this.customer['FrontFour'][1]['latitude']]);
        data3.push([this.customer['FrontFour'][2]['longitude'], this.customer['FrontFour'][2]['latitude']]);
        data4.push([this.customer['FrontFour'][3]['longitude'], this.customer['FrontFour'][3]['latitude']]);


      this.radarOption = {

        title: {
          text: '',
          left: 'center'
        },
        legend: {
          data: dataName,
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
      this.industryInfo = res;
      var industryNameArr = [];
      var industryCountArr = [];

      for (let v in this.industryInfo['shop_num_per_industry']) {
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


  ngOnInit() {
  }

  getInfo(id) {

  }

  openDetailModal(title,detailInfoList) {
    this.detailModelHidden = false;
    this.tempDetailInfoContainer = detailInfoList;
    this.tempDetailInfoContainer['title']=title;
  }

  closeDetail(){
    this.detailModelHidden = true;
  }


  /*  closeResult: string;
    openConnectInfoModal(content) {
      this.modalService.open(content, {size: 'lg'}).result.then((result) => {
        /!*result == '1' ? this.currentCity = this.tempCurrentCity : '';*!/
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
    }*/

}


