import {Injectable, Inject} from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PeripheralDataService {

  constructor(@Inject('http') private http) { }

  //周边数据--交通区位
  getPeripheralTraffic(params){
    return this.http.peripheralInfoRequest("analyse_traffic",params).then(res=>{
      return JSON.parse(res._body).result;
    })
  }

  //周边数据--交通区位
  getPeripheralCustom(params){
    return this.http.peripheralInfoRequest("custom_analyze",params).then(res=>{
      return JSON.parse(res._body).result;
    })
  }


  //周边数据--周边人口
  getPeripheralPerson(params){
    return this.http.peripheralInfoRequest("analyse_population",params).then(res=>{
      return JSON.parse(res._body).result;
    })
  }

  //周边数据--周边业态
  getPeripheralIndustry(params){
    return this.http.peripheralInfoRequest("analyse_yetai",params).then(res=>{
      return JSON.parse(res._body).result;
    })
  }

}
