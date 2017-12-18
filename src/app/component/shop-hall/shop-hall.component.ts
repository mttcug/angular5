import {Component, OnInit, Inject ,ViewChild} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shop-hall',
  templateUrl: './shop-hall.component.html',
  styleUrls: ['./shop-hall.component.css']
})
export class ShopHallComponent implements OnInit {

  @ViewChild('mapModal') mapModal: ModalDirective;

  allIndustry = [];
  allDistricts = [];

  constructor( @Inject('data') private data, private router: Router, @Inject('ShopHallService') private ShopHallService, @Inject('CurrentCityService') private CurrentCityService) {


    //获取行业列表
    if (sessionStorage.getItem("industry")) {
      var result = JSON.parse(sessionStorage.getItem("industry"));
      this.allIndustry = result;
      this.bigIndustryList = this.getBigIndustry();
    } else {
      this.data.getIndustryData()
        .map((res: Response) => res.json())
        .subscribe(res => {
        var result = res ? res.result : [];  //所有数据[[],[]],用于推荐经营，不宜经营。。。
        result.forEach((value, i) => {
          value.forEach((v, j) => {
            this.allIndustry.push(v);
          });
        });
        this.bigIndustryList = this.getBigIndustry();
      },error=>{console.log("industry error:",error)});
    }


    //获取城市列表
    if (sessionStorage.getItem("district")) {
      var result = JSON.parse(sessionStorage.getItem("district"));
      this.allDistricts = result;
      this.city = this.CurrentCityService.getCurCity().id;
      this.loadDistrict(this.CurrentCityService.getCurCity().id);
    } else {
      this.data.getDistrictData()
        .map((res: Response) => res.json())
        .subscribe(res => {
        var result = res ? res.result : [];
        result.forEach((v, i) => {
          this.allDistricts.push(v);
        });
        this.city = this.CurrentCityService.getCurCity().id;
        this.loadDistrict(this.CurrentCityService.getCurCity().id);
      },error=>{console.log("district error:",error)});
    }


    //获取位置描述列表
    this.data.getPositionDesData()
      .map((res: Response) => res.json())
      .subscribe(res => {
      this.positionDescriptionList = res.result;
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

  city = '';
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

  mapAddress = this.CurrentCityService.getCurCity().name
  zoomLevel = 14;
  tempzoomLevel = 14;
  zoomList = [
    {code: 15, name: '500米', value: 0.5},
    {code: 14, name: '1公里', value: 1},
    {code: 13, name: '2公里', value: 2},
    {code: 12, name: '5公里', value: 5}
  ];

  pageNo = 1;
  pageSize = 10;
  maxSizePerPage=10;

  //临时变量
  templng = '';
  templat = '';
  tempcityName = '';
  tempdistrictName = '';


  //分页点击事件
  pageChange(e) {
    this.pageNo = e.page;
    this.getList();
  }

  //查询信息获取列表事件
  search() {
    this.getList();
  }

  //获取大行业
  getBigIndustry() {
    var tempC = [];
    this.allIndustry.forEach((value, i) => {
      value.code.toString().length == 2 ? tempC.push(value) : '';
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
  getCityList() {
    var tempC = [];
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

  //删除经纬度信息
  deletePosition() {
    this.longitude = '';
    this.latitude = '';
  }

  //获取列表数据
  getList() {
    var params = {
      city: parseInt(this.CurrentCityService.getCurCity().id),
      page_no: this.pageNo - 1,
      page_size: this.pageSize
    };

    this.bigIndustry ? ( this.smallIndustry ? params['industry'] = parseInt(this.smallIndustry) : params['industry'] = parseInt(this.bigIndustry) ) : '';
    this.unfitIndustry ? ( this.fitIndustry ? (this.currentIndustry ? params['industry_type'] = '不宜经营,适合经营,当前经营' : params['industry_type'] = '不宜经营,适合经营') : params['industry_type'] = '不宜经营') : params['industry_type'] = '当前经营';
    this.shopName ? params['keyword'] = this.shopName : '';
    this.shopPhoneNumber ? params['mobile'] = this.shopPhoneNumber : '';
    this.district ? params['district'] = parseInt(this.district) : '';
    this.longitude ? params['longitude'] = this.longitude : '';
    this.latitude ? params['latitude'] = this.latitude : '';
    this.zoomList.find(item => item.code.toString() == this.zoomLevel.toString()) ? params['distance_range'] = this.zoomList.find(item => item.code.toString() == this.zoomLevel.toString()).value : params['distance_range'] = 1;
    this.positionDescription != '' ? params['location_type'] = this.positionDescription : '';
    this.nearStreet ? params['near_street'] = '1' : '';
    this.minArea ? params['min_area'] = parseInt(this.minArea) : '';
    this.maxArea ? params['max_area'] = parseInt(this.maxArea) : '';
    this.mindoorWidth ? params['min_door_width'] = parseInt(this.maxArea) : '';
    this.maxdoorWidth ? params['max_door_width'] = parseInt(this.maxArea) : '';

    this.ShopHallService.getshopList(params)
      .map((res: Response) => res.json())
      .subscribe(res => {
      this.infoList = res ? res.result : [];
    });
  }

  //跳转到详情页
/*  goToDetailPage(shopId){
    this.router.navigate(['dataCollection'], {queryParams: {id: shopId}});
  }*/

  //打开地图弹出框
  mapModalShow() {
    this.tempzoomLevel=this.zoomLevel;
    var cityName = this.CurrentCityService.getCurCity().name;
    var districtName = this.allDistricts.find(item => item.id.toString() == this.district.toString()) ? this.allDistricts.find(item => item.id.toString() == this.district.toString()).name : '';
    this.mapAddress = (cityName + districtName ) ;
    this.mapModal.show();
  }

  //地图比例尺发生改变时间
  zoomChange(item) {
    this.tempzoomLevel = item.code;
  }

  //地图点击事件获取点和地址位置信息
  geoLocation(e) {
    this.templng = e.point.lng;
    this.templat = e.point.lat;
    this.tempcityName = e.address.city;
    this.tempdistrictName = e.address.district;
  }

  //地图模态框取消按钮点击事件
  mapModalClose(){
    this.mapModal.hide();
    this.tempzoomLevel = 14;
  }

  //地图模态框确定按钮点击事件
  mapModalSureBtn(){
    this.mapModal.hide();
    this.zoomLevel = this.tempzoomLevel;

    this.longitude = this.templng;
    this.latitude = this.templat;
  }


}
