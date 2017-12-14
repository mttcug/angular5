import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {

  constructor() {}

  testEnv='xwkj.local';                                                     //测试环境xwkj.local
  env = this.testEnv || 'pupuwang.com';

  keyIndex = this.env=='pupuwang.com' ? 3 : 3;                              //用于获取路由关键字的索引（字符串以‘/’分割后的索引）判断是什么页面

  defaultCity = {name: '深圳市', id: '4403000000'};
                                                                            //行业区域和当前城市存在了sessionStorage中
  dataApi = `http://bigdata-api.${this.env}/selectOption`;                  //请求静态数据的链接
  uploadApi = `http://bigdata-api.${this.env}/upload`;                      //上传图片的链接
  shopListApi = `http://bigdata-api.${this.env}/shop/list/`;                //请求回去列表数据的链接
  collectInfoApi = `http://bigdata-api.${this.env}/shop/`;                  //发布信息
  peripheralDataApi = `http://bigdata-api.${this.env}/surrounding/`;        //周边环境
  homePageDataApi = `http://bigdata-api.${this.env}/index`;                 //周边环境
}
