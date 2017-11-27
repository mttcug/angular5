import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {

  constructor() {
  }

  getConf() {
    return {
      keyIndex:3,                                              //用于获取路由关键字的索引（字符串以‘/’分割后的索引）判断是什么页面
      //行业区域和当前城市存在了sessionStorage中
      dataApi: 'http://bigdata-api.xwkj.local/selectOption',   //请求静态数据的链接
      uploadApi: 'http://bigdata-api.xwkj.local/upload',       //上传图片的链接
      shopListApi:'http://bigdata-api.xwkj.local/shop/list/',        //请求回去列表数据的链接
      collectInfoApi:'http://bigdata-api.xwkj.local/shop/'
    };
  }
}
