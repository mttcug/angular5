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

  constructor(private modalService: NgbModal, @Inject('data') private data, @Inject('operate') private operate) {
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

  mapAddress = '深圳南山区';
  zoomLevel = 14;
  zoomList = [
    {code: 15, name: '500米'},
    {code: 14, name: '1公里'},
    {code: 13, name: '2公里'},
    {code: 12, name: '3公里'}
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

  //根据大行业加载相应小行业
  loadSmallIndustry(code) {
    this.allIndustry.forEach((v, i) => {
      code.toString().trim() === v.code.toString().substr(0, 2).trim() ? this.smallIndustryList.push(v) : '';
    });
  }

  //根据城市加载相应区域
  loadDistrict(code) {  //城市 1234000000   区1234560000
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
    this.zoomList.find(item => item.code.toString() == this.zoomLevel.toString()) ? params['distance_range'] = this.zoomList.find(item => item.code.toString() == this.zoomLevel.toString()).name : params['distance_range'] = '一公里';
    this.positionDescription != '' ? params['location_type'] = this.positionDescription : '';
    this.nearStreet ? params['near_street'] = "是" : params['near_street'] = '否';
    this.minArea ? params['min_area'] = this.minArea : '';
    this.maxArea ? params['max_area'] = this.maxArea : '';
    this.mindoorWidth ? params['min_door_width'] = this.maxArea : '';
    this.maxdoorWidth ? params['max_door_width'] = this.maxArea : '';

    console.log("参数：", params);


    this.operate.getshopList(params).then(res => {
      this.infoList = res;
    })
  }

  //打开地图弹出框
  closeResult: string;
  open(content) {
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
