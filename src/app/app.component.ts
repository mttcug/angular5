import {Component, Inject} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private modalService: NgbModal, @Inject('data') private data) {

    //行业和区域缓存起来以备不时之需
    //获取行业列表
    this.data.getIndustryData().then(res => {
      var result = res ? res : [];  //所有数据[[],[]],用于推荐经营，不宜经营。。。
      sessionStorage.setItem("industry",JSON.stringify(result));
    });

    //获取城市列表
    this.data.getDistrictData().then(res => {
      var result = res ? res : [];
      sessionStorage.setItem("district",JSON.stringify(result));
    });

  }

  getWindowHeight() {
    return window.innerHeight;
  }

  getSideNavHeight() {
    return this.getWindowHeight() - 100;
  }


}
