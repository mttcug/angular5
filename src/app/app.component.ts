import {Component, Inject} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router, NavigationEnd} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  allIndustry = [];
  allDistrict = [];

  constructor(private modalService: NgbModal, @Inject('data') private data) {

    //行业和区域缓存起来以备不时之需
    //获取行业列表
    this.data.getIndustryData().then(res => {
      //所有数据[[],[]],用于推荐经营，不宜经营。。。
      res.forEach((value, i) => {
        value.forEach((v, j) => {
          this.allIndustry.push(v);
        });
      });
      sessionStorage.setItem("industry", JSON.stringify(this.allIndustry));
    });

    //获取城市列表
    this.data.getDistrictData().then(res => {
      this.allDistrict = res;
      sessionStorage.setItem("district", JSON.stringify(res));
    });

    //租金单位
    this.data.getRentMeasure().then(res => {
      sessionStorage.setItem("rentUnit", JSON.stringify(res));
    });

    /*获取位置描述*/
    this.data.getPositionDesData().then(res => {
      sessionStorage.setItem("locationType", JSON.stringify(res));
    })

    /*获取是否临街*/
    this.data.getBesideStreet().then(res => {
      sessionStorage.setItem("nearStreet", JSON.stringify(res));
    })

    //获取上级物业
    this.data.getEstateType().then(res => {
      sessionStorage.setItem("superFacility", JSON.stringify(res));
    });

  }

  //通过定位获取当前城市并缓存  flag=0表示定位的城市不在数据库中，1则代表在
  getCurrentCity(e) {
    var aim = this.allDistrict.find(item => item.name == '深圳市');
    console.log("aim:",aim);
    var v = {flag: 0, name: e.address.city};
    aim ? aim.flag = 1 : aim = v;
    sessionStorage.setItem("curCity", JSON.stringify(aim));
  }


  getWindowHeight() {
    return window.innerHeight;
  }

  getSideNavHeight() {
    return this.getWindowHeight() - 100;
  }


}
