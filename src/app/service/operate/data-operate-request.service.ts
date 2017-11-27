import {Injectable, Inject} from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataOperateRequestService {

  constructor(@Inject('http') private http) { }

  //首页获取数据书数量
  getDataCountInfo(){
    return this.http.showInfoRequest().then(res=>{
      return JSON.parse(res._body).result;
    });
  }



}

