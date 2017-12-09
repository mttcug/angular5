import {Injectable, Inject} from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CurrentCityService {

  allDistricts = [];

  constructor(@Inject('data') private data,@Inject('config') private configService) {
    //获取城市列表
    let district = sessionStorage.getItem("district");
    if (district) {
      console.log('ooo:',district);
      JSON.parse(district).forEach((v, i) => {
        this.allDistricts.push(v);
      });
    } else {
      this.data.getDistrictData().then(res => {
        var result = res ? res : [];
        result.forEach((v, i) => {
          this.allDistricts.push(v);
        });
      });
    }
  }


   getCurCity() {
    if (sessionStorage.getItem("curCity") && sessionStorage.getItem("curCity")!='undefined') {
      return JSON.parse(sessionStorage.getItem("curCity"));
    } else {
        var item = this.configService.defaultCity;
        sessionStorage.setItem("curCity", JSON.stringify(item));
        return item ? item : '';
      }
    }


  setCurCity(cityItem) {
    sessionStorage.setItem("curCity", JSON.stringify(cityItem));
  }
}
