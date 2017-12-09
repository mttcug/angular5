import {Injectable, Inject} from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ShopHallService {

  constructor(@Inject('jsonrpcHttp') private jsonrpcHttp,@Inject('config') private conf) { }

  url:string = this.conf.shopListApi;

  //业务大厅获取列表数据
  getshopList(params){
    return this.jsonrpcHttp.rpcRequest(this.url,"get_list",params);
  }
}
