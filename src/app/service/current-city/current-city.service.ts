import {Injectable, Inject} from '@angular/core';

@Injectable()
export class CurrentCityService {

  allDistricts = [];

  constructor(@Inject('data') private data) {
    //获取城市列表
    let district = sessionStorage.getItem("district");
    if (district) {
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
    if (sessionStorage.getItem("curCity")) {
      return JSON.parse(sessionStorage.getItem("curCity")).name;
    } else {
      var item = this.allDistricts.find(item => item.name == '深圳市');
      sessionStorage.setItem("curCity", JSON.stringify(item));
      return item.name;
    }
  }

  setCurCity(cityItem) {
    sessionStorage.setItem("curCity", JSON.stringify(cityItem));
  }
}
