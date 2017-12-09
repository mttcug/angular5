import { Injectable , Inject} from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataCollectionService {

  constructor(@Inject('jsonrpcHttp') private jsonrpcHttp,@Inject('config') private conf) { }

  url:string=this.conf.collectInfoApi;

  //发布页面发布数据请求
  releaseInfo(params){
    return this.jsonrpcHttp.rpcRequest(this.url,"add",params);
  }
}
