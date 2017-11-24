import {Component, OnInit, Inject} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {any} from "codelyzer/util/function";

@Component({
  selector: 'app-shop-hall',
  templateUrl: './shop-hall.component.html',
  styleUrls: ['./shop-hall.component.css']
})
export class ShopHallComponent implements OnInit {

  allIndustry =[];
  allDistricts = [];

  constructor(private modalService: NgbModal, @Inject('data') private data, @Inject('operate') private operate) {
    console.log("shopHallComponent",sessionStorage.getItem('curCity'));

    //获取行业列表
    if(sessionStorage.getItem("industry")){
      var result=JSON.parse(sessionStorage.getItem("industry"));
      this.allIndustry=result;
      this.bigIndustryList=this.getBigIndustry();
    }else{
      this.data.getIndustryData().then(res => {
        var result = res ? res : [];  //所有数据[[],[]],用于推荐经营，不宜经营。。。
        result.forEach((value, i) => {
          value.forEach((v, j) => {
            this.allIndustry.push(v);
          });
        });
        this.bigIndustryList=this.getBigIndustry();
      });
    }


    //获取城市列表
    if(sessionStorage.getItem("district")){
      var result=JSON.parse(sessionStorage.getItem("district"));
      this.allDistricts=result;
      this.cityList=this.getCityList();
      this.districtList = this.cityCanSelect ? [] : this.getSomeDistrict(this.city);
    }else{
      this.data.getDistrictData().then(res => {
        var result = res ? res : [];
        result.forEach((v, i) => {this.allDistricts.push(v);});
        this.cityList=this.getCityList();
        this.districtList = this.cityCanSelect ? [] : this.getSomeDistrict(this.city);
      });
    }


    //获取位置描述列表
    this.data.getPositionDesData().then(res => {
      this.positionDescriptionList = res;
    });

  }

  ngOnInit() {
    this.getList();
  }


  infoList = [];                      //信息列表

  bigIndustry = '';
  smallIndustry = '';
  bigIndustryList = [];
  smallIndustryList = [];

  currentIndustry = true;
  fitIndustry = false;
  unfitIndustry = false;

  shopName = '';
  shopPhoneNumber = '';

  city = JSON.parse(sessionStorage.getItem('curCity')).id ;
  district = '';
  cityCanSelect = false;
  cityList = [];
  districtList = [];

  latitude = '';
  longitude = '';

  positionDescription = '';
  positionDescriptionList = [];
  nearStreet = false;

  minArea = '';
  maxArea = '';

  mindoorWidth = '';
  maxdoorWidth = '';

  mapAddress = '';
  zoomLevel = 14;
  zoomList = [
    {code: 15, name: '500米', value: 0.5},
    {code: 14, name: '1公里', value: 1},
    {code: 13, name: '2公里', value: 2},
    {code: 12, name: '5公里', value: 5}
  ];

  pageNo = 0;
  pageSize = 10;
  totalResultCount = 90;

  //临时变量
  templng = '';
  templat = '';
  tempcityName = '';
  tempdistrictName = '';


  //分页点击事件
  pageChange(e) {}

  //查询信息获取列表事件
  search() {
    this.getList();
  }

  //地图比例尺发生改变时间
  zoomChange(item) {
    this.zoomLevel = item.code;
  }

  //地图点击事件获取点和地址位置信息
  geoLocation(e) {
    this.templng = e.point.lng;
    this.templat = e.point.lat;
    this.tempcityName = e.address.city;
    this.tempdistrictName = e.address.district;
  }

  //获取大行业
  getBigIndustry(){
    var tempC=[];
    this.allIndustry.forEach((value, i) => {
      value.code.toString().length==2 ? tempC.push(value) : '';
    });
    return tempC;
  }

  //根据大行业加载相应小行业  此处由于头部已经定位到市所以该处市不能下拉选择
  loadSmallIndustry(code) {
    this.smallIndustry = '';
    this.smallIndustryList = [];
    this.allIndustry.forEach((v, i) => {
      (code.toString().length != v.code.toString().length) && code.toString().trim() === v.code.toString().substr(0, 2).trim() ? this.smallIndustryList.push(v) : '';
    });
  }

  //获取城市列表
  getCityList(){
    var tempC=[];
    this.allDistricts.forEach((v, i) => {
      v.id.toString().substr(-6) == '000000' ? tempC.push(v) : '';
    });
    return tempC;
  }

  //根据城市加载相应区域
  loadDistrict(code) {  //城市 1234000000   区1234560000
    this.district = '';
    this.districtList = [];
    this.allDistricts.forEach((v, i) => {
      (v.id.toString().substr(4, 2) != '00' && code.toString().substr(0, 4) == v.id.toString().substr(0, 4)) ? this.districtList.push(v) : '';
    });
  }

  getSomeDistrict(code) {
    var tempcontainer = [];
    this.allDistricts.forEach((v, i) => {
      (v.id.toString().substr(4, 2) != '00' && code.toString().substr(0, 4) == v.id.toString().substr(0, 4)) ? tempcontainer.push(v) : '';
    });
    return tempcontainer;
  }

  //删除经纬度信息
  deletePosition() {
    this.longitude = '';
    this.latitude = '';
  }

//获取列表数据
  getList() {
    var params = {
      page_no: this.pageNo,
      page_size: this.pageSize
    };
    this.bigIndustry ? ( this.smallIndustry ? params['industry'] = this.smallIndustry : params['industry'] = this.bigIndustry ) : '';
    this.unfitIndustry ? ( this.fitIndustry ? (this.currentIndustry ? params['industry_type'] = '不宜经营,适合经营,当前经营' : params['industry_type'] = '不宜经营,适合经营') : params['industry_type'] = '不宜经营') : params['industry_type'] = '当前经营';
    this.shopName ? params['keyword'] = this.shopName : '';
    this.shopPhoneNumber ? params['mobile'] = this.shopPhoneNumber : '';
    this.bigIndustry ? ( this.smallIndustry ? params['district'] = this.smallIndustry : params['district'] = this.bigIndustry ) : '';
    this.longitude ? params['longitude'] = this.longitude : '';
    this.latitude ? params['latitude'] = this.latitude : '';
    this.zoomList.find(item => item.code.toString() == this.zoomLevel.toString()) ? params['distance_range'] = this.zoomList.find(item => item.code.toString() == this.zoomLevel.toString()).value : params['distance_range'] = 1;
    this.positionDescription != '' ? params['location_type'] = this.positionDescription : '';
    this.nearStreet ? params['near_street'] = '1' : params['near_street'] = '2';
    this.minArea ? params['min_area'] = this.minArea : '';
    this.maxArea ? params['max_area'] = this.maxArea : '';
    this.mindoorWidth ? params['min_door_width'] = this.maxArea : '';
    this.maxdoorWidth ? params['max_door_width'] = this.maxArea : '';




    this.operate.getshopList(params).then(res => {
      this.infoList = res;
    })
  }

  //打开地图弹出框
  closeResult: string;

  open(content) {
    //地址
    var cityName = this.allDistricts.find(item => item.id.toString() == this.city.toString()) ? this.allDistricts.find(item => item.id.toString() == this.city.toString()).name : '';
    var districtName = this.allDistricts.find(item => item.id.toString() == this.district.toString()) ? this.allDistricts.find(item => item.id.toString() == this.district.toString()).name : '';

    this.mapAddress = (cityName + districtName ) ? (cityName + districtName ) : JSON.parse(sessionStorage.getItem("curCity")).name;

    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result == '1') {
        this.longitude = this.templng;
        this.latitude = this.templat;
        this.city = this.allDistricts.find(item => item.name == this.tempcityName) ? this.allDistricts.find(item => item.name == this.tempcityName).id : '';
        this.loadDistrict(this.city);
        this.district = this.allDistricts.find(item => item.name == this.tempdistrictName) ? this.allDistricts.find(item => item.name == this.tempdistrictName).id : '';
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
