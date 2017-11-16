import {Injectable, Inject} from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {

  constructor(@Inject('http') private http) {
  }


  getWeekData() {
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

  getServiceList() {
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
    ];
  }

  getPayWayList() {
    return [
      {code: 1, name: "一月一付"},
      {code: 2, name: "1月一付"},
      {code: 3, name: "2月一付"},
      {code: 4, name: "3月一付"},
      {code: 5, name: "半年一付"},
      {code: 6, name: "1年一付"},
      {code: 0, name: "自定义"}
    ];
  }

  getDepositList() {
    return [
      {code: 1, name: "1月租金", checked: false},
      {code: 2, name: "2月租金", checked: false},
      {code: 3, name: "3月租金", checked: false},
      {code: 3, name: "3月租金", checked: false},
      {code: 0, name: "自定义"}
    ];
  }

  getFacilities() {
    return [
      {code: 1, name: "可明火", checked: false ,amount:''},
      {code: 2, name: "上水", checked: false,amount:''},
      {code: 3, name: "下水", checked: false,amount:''},
      {code: 4, name: "380V电压", checked: false,amount:''},
      {code: 5, name: "排烟", checked: false,amount:''},
      {code: 6, name: "排污", checked: false,amount:''},
      {code: 7, name: "电梯", checked: false,amount:''},
      {code: 8, name: "中央空调", checked: false,amount:''},
      {code: 9, name: "网络", checked: false,amount:''},
      {code: 10, name: "暖气", checked: false,amount:''},
      {code: 11, name: "天然气", checked: false,amount:''},
      {code: 12, name: "停车位", checked: false,amount:''},
      {code: 13, name: "外摆区", checked: false,amount:''}
    ];
  }

  getFitmentLevel(){
    return [
      {code: 1, name: "毛坯"},
      {code: 2, name: "简装"},
      {code: 3, name: "精装"},
      {code: 4, name: "豪华"}
    ];
  }










  /*获取行业数据*/
  getIndustryData(params) {
    return this.http.request("get_industry", params).then(res => {
      console.log("行业：",res);
      return JSON.parse(res._body).result;
    });
  }

  /*获取区域城市等数据*/
  getDistrictData(params) {
    return this.http.request("get_city", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }

  /*获取建筑形状*/
  getBuildingShapeData(params) {
    return this.http.request("get_shape_type", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }

  /*获取转让状态列表*/
  getTransferStatusData(params) {
    return this.http.request("get_transfer_status", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }

  /*获取位置描述*/
  getPositionDesData(params) {
    return this.http.request("get_add_desc", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }

  /*获取位置描述*/
  getBesideStreet(params) {
    return this.http.request("beside_street", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }

  /*店铺证件类型*/
  getCertificateType(params) {
    return this.http.request("certificate_type", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }

  /*租金单位*/
  getRentMeasure(params) {
    return this.http.request("rent_utils", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }

  /*营业状态*/
  getOperateStatus(params) {
    return this.http.request("get_business_status", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }

  /*拆迁风险*/
  getPullRisk(params) {
    return this.http.request("pull_risk", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }

  /*产权类型*/
  getPerprotyRight(params) {
    return this.http.request("property_right", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }

  /*物业类型和上级物业*/
  getEstateType(params) {
    return this.http.request("get_estate_type", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }


}
