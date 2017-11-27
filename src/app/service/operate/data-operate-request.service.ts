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

  //业务大厅获取列表数据
  getshopList(params){
    return this.http.showInfoRequest("get_list",params).then(res=>{
      return JSON.parse(res._body).result;
    })
  }

  //发布页面发布数据请求
  releaseInfo(params){
    return this.http.collectInfoRequest("add",params).then(res=>{
      return JSON.parse(res._body).result;
    })

  }



}

