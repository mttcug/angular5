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
    },error=>{console.log("industry server Error:",error)});

    //获取城市列表
    this.data.getDistrictData()
      .map((res: Response) => res.json())
      .subscribe(res => {
      this.allDistrict = res.result;
      sessionStorage.setItem("district", JSON.stringify(res.result));
    },error=>{console.log("district error:",error)});

    //租金单位
    this.data.getRentMeasure()
      .map((res: Response) => res.json())
      .subscribe(res => {
      sessionStorage.setItem("rentUnit", JSON.stringify(res.result));
    },error=>{console.log("rentUnit error:",error)});

    /*获取位置描述*/
    this.data.getPositionDesData()
      .map((res: Response) => res.json())
      .subscribe(res => {
      sessionStorage.setItem("locationType", JSON.stringify(res.result));
    },error=>{console.log("locationType error:",error)})

    /*获取是否临街*/
    this.data.getBesideStreet()
      .map((res: Response) => res.json())
      .subscribe(res => {
      sessionStorage.setItem("nearStreet", JSON.stringify(res.result));
    },error=>{console.log("nearStreet error:",error)})

    //获取上级物业
    this.data.getEstateType()
      .map((res: Response) => res.json())
      .subscribe(res => {
      sessionStorage.setItem("superFacility", JSON.stringify(res.result));
    },error=>{console.log("superFacility error:",error)});

    //获取转让状态列表
    this.data.getTransferStatusData()
      .map((res: Response) => res.json())
      .subscribe(res => {
      sessionStorage.setItem("transferStatus", JSON.stringify(res.result));
    },error=>{console.log("transferStatus error:",error)});

    //获取证件列表
    this.data.getCertificateType()
      .map((res: Response) => res.json())
      .subscribe(res => {
        sessionStorage.setItem("cetification", JSON.stringify(res.result));
      }, error => {
        console.log("data-collect error:", error)
      });

  }



  getWindowHeight(): number {
    return window.innerHeight;
  }

  getSideNavHeight(): number {
    return this.getWindowHeight() - 100;
  }


}
