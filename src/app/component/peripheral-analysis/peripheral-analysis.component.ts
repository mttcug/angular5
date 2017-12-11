import {Component, OnInit, Inject} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-peripheral-analysis',
  templateUrl: './peripheral-analysis.component.html',
  styleUrls: ['./peripheral-analysis.component.css']
})

export class PeripheralAnalysisComponent implements OnInit {


  shopInfo = {};
  trafficInfo = [];
  population = [];
  customer = [];
  industryInfo = [];

  industryNameArr = [];
  industryCountArr = [];

  radarShow = false;                         //雷达图是否显示
  cooperativeShow=false;
  competitiveShow=false;

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


  ngOnInit() {}

  getInfo(oppo_id) {
    let params = {
      shop_id: oppo_id
    }
    //头部本店信息
    this.PeripheralDataService.getSelfInfo(params)
      .map((res: Response) => res.json())
      .subscribe(res => {
      this.shopInfo = res.result;
    });

    //周边数据-交通信息
    this.PeripheralDataService.getPeripheralTraffic(params)
      .map((res: Response) => res.json())
      .subscribe(res => {
      this.trafficInfo = res.result;
    })

    //周边数据-聚客来源
    this.PeripheralDataService.getPeripheralCustom(params)
      .map((res: Response) => res.json())
      .subscribe(res => {

      this.customer = res.result;
      console.log("customer:",res);

      this.radarShow = this.customer['FrontFour'].length > 0 ? true : false;
      var dataName = [];


      var tempRadarDataContainer = [];
      var tempMathY = [];
      var tempMathX = [];

      //准备雷达图用的数据
      this.customer['FrontFour'].forEach((v, i) => {
        dataName.push(v.name);
        var tempE = {
          coordinateSystem: 'polar',
          angleAxisIndex: 0,
          radiusAxisIndex: 0,
          name: v.name,
          type: 'scatter',
          symbolSize: 10,
          data: [[v.distance, Math.round(Math.abs(v.longitude - this.shopInfo['lng']) * 111319.55)]]
        };
        tempRadarDataContainer.push(tempE);
        tempMathX.push(v.distance);
        tempMathY.push(Math.round(Math.abs(v.longitude - this.shopInfo['lng']) * 111319.55));
      });

      var zoomYMin = 0;
      var zoomYMax = Math.max.apply(Math, tempMathY);
      var zoomXMin = 0;
      var zoomXMax = Math.max.apply(Math, tempMathX);

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
        radar: {
          center: ["30%", '50%']
        },
        legend: {
          data: dataName,
          zlevel: 100,
          right: 0,
          orient: 'vertical'
        },
        polar: {},
        angleAxis: {
          type: 'value',
          min: zoomXMin,   //73
          max: zoomXMax+100
        },
        radiusAxis: {
          axisAngle: 0,
          min: zoomXMin,
          max: zoomXMax+100
        },
        series: tempRadarDataContainer
      };

    });

    //周边数据-周边人口
    this.PeripheralDataService.getPeripheralPerson(params)
      .map((res: Response) => res.json())
      .subscribe(res => {
      this.population = res.result;
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
    });

    //周边数据-周边业态
    this.PeripheralDataService.getPeripheralIndustry(params)
      .map((res: Response) => res.json())
      .subscribe(res => {
      this.industryInfo = res.result;
      this.cooperativeShow = this.industryInfo['cooperative_shops'].length > 0 ? true : false;
      this.competitiveShow = this.industryInfo['competitive_shops'].length > 0 ? true : false;

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
          left: '0%',
          right: '2%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLabel:{
              rotate :45
            },
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
            name: '数量',
            type: 'bar',
            barWidth: '50%',
            data: this.industryCountArr
          }
        ]
      }
    });
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
