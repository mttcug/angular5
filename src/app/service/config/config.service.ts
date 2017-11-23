import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {

  constructor() {
  }

  getConf() {
    return {
      //行业区域和当前城市存在了sessionStorage中
      dataApi: 'http://bigdata-api.xwkj.local/selectOption',   //请求静态数据的链接
      uploadApi: 'http://bigdata-api.xwkj.local/upload',       //上传图片的链接
      listApi:'http://bigdata-api.xwkj.local/shop/list/'        //请求回去列表数据的链接
    };
  }

}
