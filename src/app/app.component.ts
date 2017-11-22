import {Component, Inject} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  allIndustry=[];
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
      sessionStorage.setItem("industry",JSON.stringify(this.allIndustry));
    });

    //获取城市列表
    this.data.getDistrictData().then(res => {
      sessionStorage.setItem("district",JSON.stringify(res));
    });

    //租金单位
    this.data.getRentMeasure().then(res => {
      sessionStorage.setItem("rentUnit",JSON.stringify(res));
    });

  }

  getWindowHeight() {
    return window.innerHeight;
  }

  getSideNavHeight() {
    return this.getWindowHeight() - 100;
  }


}
