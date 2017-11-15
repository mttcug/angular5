import { Injectable , Inject } from '@angular/core';
import {  Http, Response, RequestOptions, Headers } from  '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpRequestService {

  constructor(private http : Http) {

  }

  guide(){
    function  s4(){
      return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4() ;
  }

  josnrpConfig={
    rpcUrl:'http://192.168.1.234:5544/selectOption',
    id:0,
    jsonrpc:"2.0"
  }

  request(method,params){
    return this.http.post(this.josnrpConfig.rpcUrl,{
      id:this.josnrpConfig.id,
      jsonrpc:this.josnrpConfig.jsonrpc,
      method:method,
      params:params
    }).toPromise();
  }


}
