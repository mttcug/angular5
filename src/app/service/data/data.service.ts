import {Injectable, Inject} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {

  constructor(@Inject('http') private http) {
  }

  getOperateType() {
    return [
      {code: 1, name: "连锁"},
      {code: 2, name: "直营"},
      {code: 3, name: "代理"},
      {code: 4, name: "经销"},
      {code: 5, name: "特许"},
      {code: 6, name: "其他"}
    ];
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
      {code: 1, name: "1月一付"},
      {code: 2, name: "2月一付"},
      {code: 3, name: "3月一付"},
      {code: 4, name: "半年一付"},
      {code: 5, name: "1年一付"},
      {code: 0, name: "自定义"}
    ];
  }

  getDepositList() {
    return [
      {code: 1, name: "1月租金", checked: false},
      {code: 2, name: "2月租金", checked: false},
      {code: 3, name: "3月租金", checked: false},
      {code: 0, name: "自定义"}
    ];
  }

  getFacilities() {
    return [
      {code: 1, name: "可明火", checked: false },
      {code: 2, name: "上水", checked: false},
      {code: 3, name: "下水", checked: false},
      {code: 4, name: "380V电压", checked: false},
      {code: 5, name: "排烟", checked: false},
      {code: 6, name: "排污", checked: false},
      {code: 7, name: "电梯", checked: false},
      {code: 8, name: "中央空调", checked: false},
      {code: 9, name: "网络", checked: false},
      {code: 10, name: "暖气", checked: false},
      {code: 11, name: "天然气", checked: false},
      {code: 12, name: "停车位", checked: false},
      {code: 13, name: "外摆区", checked: false}
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

  getRateChoiceList(){
    return [
      {code: 1, name: "不递增"},
      {code: 2, name: "递减"}
    ]
  }

  getEmptyChoice(){
    return [
      {code: 1, name: "可空转"},
      {code: 2, name: "不可空转"}
    ]
  }

  getSexTypeList(){
    return [
      {code: 1, name: "男"},
      {code: 2, name: "女"},
      {code: 3, name: "其他"}
    ]
  }

  getMemberType(){
    return [
      {code:1,name:'会员卡'},
      {code:1,name:'注册会员'},
      {code:1,name:'储值卡'}
    ]
  }










  /*获取行业数据*/
  getIndustryData(params) {
    return this.http.staticRequest("get_industry", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }


  /*获取区域城市等数据*/
  getDistrictData(params) {
    return this.http.staticRequest("get_city", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }

  /*获取建筑形状*/
  getBuildingShapeData(params) {
    return this.http.staticRequest("get_shape_type", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }

  /*获取转让状态列表*/
  getTransferStatusData(params) {
    return this.http.staticRequest("get_transfer_status", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }

  /*获取位置描述*/
  getPositionDesData(params) {
    return this.http.staticRequest("get_add_desc", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }

  /*获取是否临街*/
  getBesideStreet(params) {
    return this.http.staticRequest("beside_street", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }

  /*店铺证件类型*/
  getCertificateType(params) {
    return this.http.staticRequest("certificate_type", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }

  /*租金单位*/
  getRentMeasure(params) {
    return this.http.staticRequest("rent_utils", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }

  /*营业状态*/
  getOperateStatus(params) {
    return this.http.staticRequest("get_business_status", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }

  /*拆迁风险*/
  getPullRisk(params) {
    return this.http.staticRequest("pull_risk", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }

  /*产权类型*/
  getPerprotyRight(params) {
    return this.http.staticRequest("property_right", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }

  /*物业类型和上级物业*/
  getEstateType(params) {
    return this.http.staticRequest("get_estate_type", params).then(res => {
      return JSON.parse(res._body).result;
    });
  }


}
