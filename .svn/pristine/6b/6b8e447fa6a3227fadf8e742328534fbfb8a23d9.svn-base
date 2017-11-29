import { Injectable , Inject} from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataCollectionService {

  constructor(@Inject('http') private http) { }

  //发布页面发布数据请求
  releaseInfo(params){
    return this.http.collectInfoRequest("add",params).then(res=>{
      return JSON.parse(res._body).result;
    })
  }
}
