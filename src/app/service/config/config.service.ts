import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {

  constructor() {
  }

  getConf() {
    return {
      dataApi: 'http://192.168.1.234:5544/selectOption',   //请求静态数据的链接
      uploadApi: 'http://192.168.1.234:5544/upload',       //上传图片的链接
      listApi:'http://192.168.1.234:5544/shop/list/'        //请求回去列表数据的链接
    };
  }

}
