import {Injectable, Inject} from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HomePageService {


  constructor(@Inject('http') private http) { }

  //首页获取店铺数量
  getShopCount(){
    return this.http.homePageRequest('shop_count').then(res=>{
      return JSON.parse(res._body).result;
    });
  }

  //首页获取老板数量
  getBossCount(){
    return this.http.homePageRequest('boss_count').then(res=>{
      return JSON.parse(res._body).result;
    });
  }

}
