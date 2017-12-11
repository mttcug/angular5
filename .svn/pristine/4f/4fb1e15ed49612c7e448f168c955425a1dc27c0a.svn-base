import {Injectable, Inject} from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HomePageService {


  constructor(@Inject('jsonrpcHttp') private jsonrpcHttp,@Inject('config') private conf) { }

  url:string=this.conf.homePageDataApi;

  //首页获取店铺数量
  getShopCount(params){
    return this.jsonrpcHttp.rpcRequest(this.url,'shop_count',params);
  }

  //首页获取老板数量
  getBossCount(params){
    return this.jsonrpcHttp.rpcRequest(this.url,'boss_count',params);
  }

}
