import {Component, OnInit, Inject} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-peripheral-data',
  templateUrl: './peripheral-data.component.html',
  styleUrls: ['./peripheral-data.component.css']
})
export class PeripheralDataComponent implements OnInit {


  shopInfo={};
  trafficInfo = [];
  population = [];
  customer = [];
  industryInfo = [];

  industryNameArr = [];
  industryCountArr = [];

  public radarOption: any;
  public populationOption: any;
  public barChartOption: any;

  detailModelHidden = true;
  tempDetailInfoContainer = [];

  oppo_Id = '';

  constructor(@Inject('data') private data, private route: ActivatedRoute, @Inject('PeripheralDataService') private PeripheralDataService) {

    //获取参数oppo_Id
    let queryParams: Params = this.route.params;
    this.oppo_Id = queryParams.value.id;
    this.oppo_Id != 'undefined' ? this.getInfo(this.oppo_Id) : '';
  }


  ngOnInit() {
  }

  getInfo(oppo_id) {
    let params = {
      shop_id: oppo_id
    }
    //头部本店信息
    this.PeripheralDataService.getSelfInfo(params).then(res=>{
      this.shopInfo=res;
      console.log("shopInfo:",this.shopInfo);
    })

    //周边数据-交通信息
    this.PeripheralDataService.getPeripheralTraffic(params).then(res => {
      this.trafficInfo = res;
    })

    //周边数据-聚客来源
    this.PeripheralDataService.getPeripheralCustom(params).then(res => {
      this.customer = res;
      var dataName = [];
      this.customer['FrontFour'].forEach((v, i) => {
        dataName.push(v.name);
      });
      console.log("dataName:",dataName);


      var data1 = [];
      var data2 = [];
      var data3 = [];
      var data4 = [];

      data1.push([this.customer['FrontFour'][0]['distance'], Math.abs(this.customer['FrontFour'][0]['longitude']-this.shopInfo['lng'])*111319.55]);
      data2.push([this.customer['FrontFour'][1]['distance'], Math.abs(this.customer['FrontFour'][1]['longitude']-this.shopInfo['lng'])*111319.55]);
      data3.push([this.customer['FrontFour'][2]['distance'], Math.abs(this.customer['FrontFour'][2]['longitude']-this.shopInfo['lng'])*111319.55]);
      data4.push([this.customer['FrontFour'][3]['distance'], Math.abs(this.customer['FrontFour'][3]['longitude']-this.shopInfo['lng'])*111319.55]);
      console.log("data:",[this.customer['FrontFour'][0]['distance'], Math.abs(this.customer['FrontFour'][0]['longitude']-this.shopInfo['lng'])*111319.55]);
      console.log("data1:",[this.customer['FrontFour'][1]['distance'], Math.abs(this.customer['FrontFour'][1]['longitude']-this.shopInfo['lng'])*111319.55]);
      console.log("data2:",[this.customer['FrontFour'][2]['distance'], Math.abs(this.customer['FrontFour'][2]['longitude']-this.shopInfo['lng'])*111319.55]);
      console.log("data3:",[this.customer['FrontFour'][3]['distance'], Math.abs(this.customer['FrontFour'][3]['longitude']-this.shopInfo['lng'])*111319.55]);


      this.radarOption = {

        title: {
          text: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        radar:{
          center:["30%",'50%']
        },
        legend: {
          data: dataName,
          zlevel:100,
          right: 0,
          orient:'vertical'
        },
        polar: {},
        angleAxis: {
          type: 'value',
          min: 0,   //73
          max: 100
        },
        radiusAxis: {
          axisAngle: 0,
          min: 0,
          max: 100
        },
        series: [{
          coordinateSystem: 'polar',
          angleAxisIndex: 0,
          radiusAxisIndex: 0,
          name: this.customer['FrontFour'][0]['name'],
          type: 'scatter',
          symbolSize: 10,
          data: data1
        }, {
          coordinateSystem: 'polar',
          angleAxisIndex: 0,
          radiusAxisIndex: 0,
          name: this.customer['FrontFour'][1]['name'],
          type: 'scatter',
          symbolSize: 10,
          data: data2
        }, {
          coordinateSystem: 'polar',
          angleAxisIndex: 0,
          radiusAxisIndex: 0,
          name: this.customer['FrontFour'][2]['name'],
          type: 'scatter',
          symbolSize: 10,
          data: data3
        }, {
          coordinateSystem: 'polar',
          angleAxisIndex: 0,
          radiusAxisIndex: 0,
          name: this.customer['FrontFour'][3]['name'],
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

      for (let v in this.industryInfo['shop_num_per_industry']) {
        this.industryNameArr.push(v);
        this.industryCountArr.push(this.industryInfo['shop_num_per_industry'][v]);
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
            data: this.industryNameArr,
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
            data: this.industryCountArr
          }
        ]
      }
    })
  }

  //聚客来源数据点击弹出详细信息
  openDetailModal(title, detailInfoList) {
    this.detailModelHidden = false;
    this.tempDetailInfoContainer = detailInfoList;
    this.tempDetailInfoContainer['title'] = title;
  }


  closeDetail() {
    this.detailModelHidden = true;
  }

}


