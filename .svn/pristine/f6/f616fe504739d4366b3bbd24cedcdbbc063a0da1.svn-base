import {Injectable, Inject} from '@angular/core';
import { Http ,Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PeripheralDataService {

  constructor(@Inject('jsonrpcHttp') private jsonrpcHttp,@Inject('config') private conf) { }

  url:string = this.conf.peripheralDataApi;

  //周边数据--交通区位
  getPeripheralTraffic(params){
    return this.jsonrpcHttp.rpcRequest(this.url,"analyse_traffic",params);
  }

  //周边数据--聚客来源
  getPeripheralCustom(params) {
    return this.jsonrpcHttp.rpcRequest(this.url,"custom_analyze", params);
  }


  //周边数据--周边人口
  getPeripheralPerson(params){
    return this.jsonrpcHttp.rpcRequest(this.url,"analyse_population",params);
  }

  //周边数据--周边业态
  getPeripheralIndustry(params){
    return this.jsonrpcHttp.rpcRequest(this.url,"analyse_yetai",params);
  }


  //和本店相关数据--行业经纬度的查询
  getSelfInfo(params){
    return this.jsonrpcHttp.rpcRequest(this.url,"header",params);
  }

}
