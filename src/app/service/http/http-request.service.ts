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

  josnrpConfig={
    rpcUrl:this.configService.getConf().dataApi,
    id:0,
    jsonrpc:"2.0"
  }



  request(method,params){
    //将登陆验证放在请求头部authorization
/*    let authHeader = new Headers();
    authHeader.append('Authorization', 'XWWEB_SESSION_ID');

    let options = new RequestOptions({ headers: authHeader });

    return this.http.post(this.josnrpConfig.rpcUrl,{
      id:this.josnrpConfig.id,
      jsonrpc:this.josnrpConfig.jsonrpc,
      method:method,
      params:params
    },options).toPromise();*/

    return this.http.post(this.josnrpConfig.rpcUrl,{
      id:this.josnrpConfig.id,
      jsonrpc:this.josnrpConfig.jsonrpc,
      method:method,
      params:params
    }).toPromise();
  }


}
