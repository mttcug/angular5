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
  fromPC=false;


  constructor(private modalService: NgbModal, @Inject('data') private data,private route: ActivatedRoute,private router: Router) {
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


    this.getUrlParams();

  }



  getWindowHeight(): number {
    return window.innerHeight;
  }

  getSideNavHeight(): number {
    return this.getWindowHeight() - 100;
  }

  getUrlParams(){
    var search=decodeURIComponent(window.location.search);
    var paramsList=search.substr(1).split("&");
    var paramsObj={};
      paramsList.forEach((v,i)=>{
          paramsObj[v.split('=')[0]] = v.split('=')[1];
      })
    //判断是否是从PC端过来过来则头部和侧边栏不显示
    this.fromPC = paramsObj['origin']=='PC' ?  true : false ;

    //判断是否登录，未登录则引导进入不可访问页面
    paramsObj['sessionId']!='' ? sessionStorage.setItem('sessionId',paramsObj['sessionId']) : this.router.navigate(['**']);
  }
}
