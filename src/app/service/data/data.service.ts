import { Injectable , Inject } from '@angular/core';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class DataService {

  constructor(@Inject('request') private http) { }

  getIndustryData(params){
    console.log("resIN");
    return new Promise((rs,rj)=>{
      return this.http.request("get_industry",params).then(res=>{
        console.log("res:",res);
      })
    })
  }
}
