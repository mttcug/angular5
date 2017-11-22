import { Injectable , Inject } from '@angular/core';
import {  Http, Response, RequestOptions, Headers } from  '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpRequestService {

  constructor(private http : Http,@Inject('config') private configService) {

  }

  guide(){
    function  s4(){
      return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4() ;
  }

  jsonrpConfig={
    staticRpcUrl:this.configService.getConf().dataApi,
    operateRpcUrl:this.configService.getConf().listApi,
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

    return this.http.post(this.jsonrpConfig.staticRpcUrl,{
      id:this.jsonrpConfig.id,
      jsonrpc:this.jsonrpConfig.jsonrpc,
      method:method,
      params:params
    }).toPromise();
  }

  operateRequest(method,params){
    return this.http.post(this.jsonrpConfig.operateRpcUrl,{
      id:this.jsonrpConfig.id,
      jsonrpc:this.jsonrpConfig.jsonrpc,
      method:method,
      params:params
    }).toPromise();
  }



}
