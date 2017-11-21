import {Component, OnInit, Inject} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shop-hall',
  templateUrl: './shop-hall.component.html',
  styleUrls: ['./shop-hall.component.css']
})
export class ShopHallComponent implements OnInit {

  allIndustry = [];
  allDistricts = [];

  constructor(private modalService: NgbModal, @Inject('data') private data) {
    //获取行业列表
    this.data.getIndustryData().then(res => {
      var result = res ? res : [];  //所有数据[[],[]],用于推荐经营，不宜经营。。。
      result.forEach((value, i) => {
        value.forEach((v, j) => {
          j == 0 ? this.bigIndustryList.push(v) : '';
          this.allIndustry.push(v);
        });
      });
    });

    //获取城市列表
    this.data.getDistrictData().then(res => {
      console.log("城市：", res);
      var result = res ? res : [];
      result.forEach((v, i) => {
        this.allDistricts.push(v);
        v.id.toString().substr(-6) == '000000' ? this.cityList.push(v) : '';
      });
    });

    //获取位置描述列表
    this.data.getPositionDesData().then(res => {
      this.positionDescriptionList = res;
    });
  }

  ngOnInit() {
  }

  bigIndustry = '';
  smallIndustry = '';
  bigIndustryList = [];
  smallIndustryList = [];

  currentIndustry = true;
  fitIndustry = false;
  unfitIndustry = false;

  shopName = '';
  shopPhoneNumber = '';

  city = '';
  district = '';
  cityList = [];
  districtList = [];

  latitude = '38.907';
  longitude = '119.087';

  positionDescription = '';
  positionDescriptionList = [];

  minArea = '';
  maxArea = '';

  mindoorWidth = '';
  maxdoorWidth = '';

  mapAddress = '深圳南山区';
  zoomLevel = 15;
  zoomList = [
    {code: 15, name: '500米'},
    {code: 14, name: '1公里'},
    {code: 13, name: '2公里'},
    {code: 12, name: '3公里'},
  ];


  zoomChange(item) {
    console.log("item:", item);
    this.zoomLevel = item.code;
  }

  templng='';
  templat='';
  tempcityName='';
  tempdistrictName='';
  geoLocation(e) {
    console.log("e");
    this.templng=e.point.lng;
    this.templat=e.point.lat;
    this.tempcityName=e.address.city;
    this.tempdistrictName=e.address.district;
  }

  loadSmallIndustry(code) {
    this.allIndustry.forEach((v, i) => {
      code.toString().trim() === v.code.toString().substr(0, 2).trim() ? this.smallIndustryList.push(v) : '';
    });
  }

  loadDistrict(code) {  //城市 1234000000   区1234560000
    this.allDistricts.forEach((v, i) => {
      (v.id.toString().substr(4, 2) != '00' && code.toString().substr(0, 4) == v.id.toString().substr(0, 4)) ? this.districtList.push(v) : '';
    });
  }

  deletePosition(){
    this.longitude='';
    this.latitude='';
  }


  closeResult: string;

  open(content) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if(result == '1'){
        this.longitude=this.templng;
        this.latitude=this.templat;
        this.city=this.allDistricts.find(item=>item.name==this.tempcityName) ? this.allDistricts.find(item=>item.name==this.tempcityName).id : '';
        this.loadDistrict(this.city);
        this.district=this.allDistricts.find(item=>item.name==this.tempdistrictName) ? this.allDistricts.find(item=>item.name==this.tempdistrictName).id : '';
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
