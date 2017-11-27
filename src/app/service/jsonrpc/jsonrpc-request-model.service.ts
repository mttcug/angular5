import { Injectable , Inject } from '@angular/core';
import {  Http, Response, RequestOptions, Headers } from  '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class JsonrpcRequestModelService {

  constructor(private http : Http,@Inject('config') private configService) {

  }

  guide(){
    function  s4(){
      return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4() ;
  }

  jsonrpConfig={
    staticDataUrl:this.configService.getConf().dataApi,
    shopListUrl:this.configService.getConf().shopListApi,
    collectInfoUrl:this.configService.getConf().collectInfoApi,
    peripheralInfoUrl:this.configService.getConf().peripheralDataApi,
    homePageDataUrl:this.configService.getConf().homePageDataApi,
    id:0,
    jsonrpc:"2.0"
  }



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

    return this.http.post(this.jsonrpConfig.staticDataUrl,{
      id:this.jsonrpConfig.id,
      jsonrpc:this.jsonrpConfig.jsonrpc,
      method:method,
      params:params
    }).toPromise();
  }

  shopInfoRequest(method,params){
    return this.http.post(this.jsonrpConfig.shopListUrl,{
      id:this.jsonrpConfig.id,
      jsonrpc:this.jsonrpConfig.jsonrpc,
      method:method,
      params:params
    }).toPromise();
  }

  collectInfoRequest(method,params){
    return this.http.post(this.jsonrpConfig.collectInfoUrl,{
      id:this.jsonrpConfig.id,
      jsonrpc:this.jsonrpConfig.jsonrpc,
      method:method,
      params:params
    }).toPromise();
  }

  peripheralInfoRequest(method,params){
    return this.http.post(this.jsonrpConfig.peripheralInfoUrl,{
      id:this.jsonrpConfig.id,
      jsonrpc:this.jsonrpConfig.jsonrpc,
      method:method,
      params:params
    }).toPromise();
  }


  homePageRequest(method,params){
    return this.http.post(this.jsonrpConfig.homePageDataUrl,{
      id:this.jsonrpConfig.id,
      jsonrpc:this.jsonrpConfig.jsonrpc,
      method:method,
      params:params
    }).toPromise();
  }




}
