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
    //行业和区域缓存起来以备不时之需
    //获取行业列表
    this.data.getIndustryData()
      .map((res: Response) => res.json())
      .subscribe(res => {
        var result=res.result;
      //所有数据[[],[]],用于推荐经营，不宜经营。。。

        result.forEach((value, i) => {
        value.forEach((v, j) => {
          this.allIndustry.push(v);
        });
      });
      sessionStorage.setItem("industry", JSON.stringify(this.allIndustry));
    });

    //获取城市列表
    this.data.getDistrictData()
      .map((res: Response) => res.json())
      .subscribe(res => {
      this.allDistrict = res.result;
      sessionStorage.setItem("district", JSON.stringify(res.result));
    });

    //租金单位
    this.data.getRentMeasure()
      .map((res: Response) => res.json())
      .subscribe(res => {
      sessionStorage.setItem("rentUnit", JSON.stringify(res.result));
    });

    /*获取位置描述*/
    this.data.getPositionDesData()
      .map((res: Response) => res.json())
      .subscribe(res => {
      sessionStorage.setItem("locationType", JSON.stringify(res.result));
    })

    /*获取是否临街*/
    this.data.getBesideStreet()
      .map((res: Response) => res.json())
      .subscribe(res => {
      sessionStorage.setItem("nearStreet", JSON.stringify(res.result));
    })

    //获取上级物业
    this.data.getEstateType()
      .map((res: Response) => res.json())
      .subscribe(res => {
      sessionStorage.setItem("superFacility", JSON.stringify(res.result));
    });

    //获取转让状态列表
    this.data.getTransferStatusData()
      .map((res: Response) => res.json())
      .subscribe(res => {
      sessionStorage.setItem("transferStatus", JSON.stringify(res.result));
    });

  }



  getWindowHeight() {
    return window.innerHeight;
  }

  getSideNavHeight() {
    return this.getWindowHeight() - 100;
  }


}
