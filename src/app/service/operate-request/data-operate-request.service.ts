import {Injectable, Inject} from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataOperateRequestService {

  constructor(@Inject('http') private http) { }

  //首页获取数据书数量
  getDataCountInfo(){
    return this.http.operateRequest().then(res=>{
      return new Promise((resolve,reject)=>{
        resolve(res);
      })
    })
  }

  //业务大厅获取列表数据
  getshopList(params){
    return this.http.operateRequest("get_list",params).then(res=>{
      return new Promise((resolve,reject)=>{
        resolve(res);
      })
    })
  }

}

