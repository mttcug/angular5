import { Injectable , Inject } from '@angular/core';
import {  Http, Response, RequestOptions, Headers } from  '@angular/http';



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
  rpcRequest(url,method,params){
    //将登陆验证放在请求头部authorization
    /*    let authHeader = new Headers();
        authHeader.append('Authorization', 'XWWEB_SESSION_ID');

        let options = new RequestOptions({ headers: authHeader });

        return this.http.post(this.jsonrpConfig.rpcUrl,{
          id:this.jsonrpConfig.id,
          jsonrpc:this.jsonrpConfig.jsonrpc,
          method:method,
          params:params
        },options)*/

    return this.http.post(url,{
      id:this.jsonrpConfig.id,
      jsonrpc:this.jsonrpConfig.jsonrpc,
      method:method,
      params:params
    });
  }

}
