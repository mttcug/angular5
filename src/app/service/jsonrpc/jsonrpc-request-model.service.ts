import { Injectable , Inject } from '@angular/core';
import {  Http, Response, RequestOptions, Headers } from  '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class JsonrpcRequestModelService {

  constructor(private http : Http,@Inject('config') private conf) {}

  guide(){
    function  s4(){
      return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4() ;
  }

  jsonrpConfig={
    url:'',
    id:0,
    jsonrpc:"2.0"
  }

  //静态数据的请求如行业区域等的下拉列表数据
  staticRequest(method,params){
    //将登陆验证放在请求头部authorization
    /*    let authHeader = new Headers();
        authHeader.append('Authorization', 'XWWEB_SESSION_ID');

        let options = new RequestOptions({ headers: authHeader });

        return this.http.post(this.jsonrpConfig.rpcUrl,{
          id:this.jsonrpConfig.id,
          jsonrpc:this.jsonrpConfig.jsonrpc,
          method:method,
          params:params
        },options).toPromise();*/

    return this.http.post(this.conf.dataApi,{
      id:this.jsonrpConfig.id,
      jsonrpc:this.jsonrpConfig.jsonrpc,
      method:method,
      params:params
    }).toPromise();
  }

  //店铺大厅的数据请求
  shopInfoRequest(method,params){
    return this.http.post(this.conf.shopListApi,{
      id:this.jsonrpConfig.id,
      jsonrpc:this.jsonrpConfig.jsonrpc,
      method:method,
      params:params
    }).toPromise();
  }

  //数据采集请求
  collectInfoRequest(method,params){
    return this.http.post(this.conf.collectInfoApi,{
      id:this.jsonrpConfig.id,
      jsonrpc:this.jsonrpConfig.jsonrpc,
      method:method,
      params:params
    }).toPromise();
  }

  //周边数据的请求
  peripheralInfoRequest(method,params){
    return this.http.post(this.conf.peripheralDataApi,{
      id:this.jsonrpConfig.id,
      jsonrpc:this.jsonrpConfig.jsonrpc,
      method:method,
      params:params
    }).toPromise();
  }

  //首页的数据请求
  homePageRequest(method,params){
    return this.http.post(this.conf.homePageDataApi,{
      id:this.jsonrpConfig.id,
      jsonrpc:this.jsonrpConfig.jsonrpc,
      method:method,
      params:params
    }).toPromise();
  }




}
