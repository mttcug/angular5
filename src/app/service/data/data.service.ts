import { Injectable , Inject } from '@angular/core';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class DataService {

  constructor(@Inject('request') private http) { }


  getWeekData(){
    return [
      {code: 1, name: "周一", checked: false},
      {code: 2, name: "周二", checked: false},
      {code: 3, name: "周三", checked: false},
      {code: 4, name: "周四", checked: false},
      {code: 5, name: "周五", checked: false},
      {code: 6, name: "周六", checked: false},
      {code: 7, name: "周日", checked: false}
    ];
  }

  getServiceList(){
    return [
      {code: 1, name: "可刷卡", checked: false},
      {code: 2, name: "支付宝", checked: false},
      {code: 3, name: "微信", checked: false},
      {code: 4, name: "包间", checked: false},
      {code: 5, name: "WIFI", checked: false},
      {code: 6, name: "可订座", checked: false},
      {code: 7, name: "外卖", checked: false},
      {code: 8, name: "机打发票", checked: false},
      {code: 9, name: "手撕发票", checked: false}
    ]
  }

  getPayWayList(){
    return [
      {code: 1, name: "一月一付"},
      {code: 2, name: "1月一付"},
      {code: 3, name: "2月一付"},
      {code: 4, name: "3月一付"},
      {code: 5, name: "半年一付"},
      {code: 6, name: "1年一付"},
      {code: 0, name: "自定义"}
    ]
  }

  getDepositList(){
    return [
      {code: 1, name: "1月租金", checked: false},
      {code: 2, name: "2月租金", checked: false},
      {code: 3, name: "3月租金", checked: false},
      {code: 3, name: "3月租金", checked: false},
      {code: 0, name: "自定义"}
    ]
  }



  /*获取行业数据*/
  getIndustryData(params){
      return this.http.request("get_industry",params).then(res=>{
        return JSON.parse(res._body).result;
    })
  }

  /*获取区域城市等数据*/
  getDistrictData(params){
      return this.http.request("get_city",params).then(res=>{
        return JSON.parse(res._body).result;
    })
  }
}
