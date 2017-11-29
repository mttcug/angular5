import {Component, Inject} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router, NavigationEnd, Params,ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  allIndustry = [];
  allDistrict = [];

  constructor(private modalService: NgbModal, @Inject('data') private data) {
  console.log("appComponent");
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



  getWindowHeight() {
    return window.innerHeight;
  }

  getSideNavHeight() {
    return this.getWindowHeight() - 100;
  }


}
