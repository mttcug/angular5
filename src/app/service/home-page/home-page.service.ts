import {Injectable, Inject} from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HomePageService {


  constructor(@Inject('http') private http) { }

  //首页获取店铺数量
  getShopCount(params){
    return this.http.homePageRequest('shop_count',params).then(res=>{
      return JSON.parse(res._body).result;
    });
  }

  //首页获取老板数量
  getBossCount(params){
    return this.http.homePageRequest('boss_count',params).then(res=>{
      return JSON.parse(res._body).result;
    });
  }

}
