import {Injectable, Inject} from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ShopHallService {

  constructor(@Inject('http') private http) { }

  //业务大厅获取列表数据
  getshopList(params){
    return this.http.shopInfoRequest("get_list",params).then(res=>{
      return JSON.parse(res._body).result;
    })
  }

}
