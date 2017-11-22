import {Injectable, Inject} from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataOperateRequestService {

  constructor(@Inject('http') private http) { }

  //业务大厅获取列表数据
  getshopList(params){
    return this.http.operateRequest("get_list",params).then(res=>{
      return new Promise((resolve,reject)=>{
        resolve(res);
      })
    })
  }

}

