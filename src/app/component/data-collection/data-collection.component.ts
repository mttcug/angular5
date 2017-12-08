import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

//ngx-bootstrapmodal弹出框
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import {Person} from '../../interface/person/person';
import {MapData} from '../../interface/mapData/map-data';


@Component({
  selector: 'app-data-collection',
  templateUrl: './data-collection.component.html',
  styleUrls: ['./data-collection.component.css']
})
export class DataCollectionComponent implements OnInit {

  allIndustry = [];
  allDistricts = [];
  bigIndustryList = [];
  smallIndustryList = [];
  cityList = [];
  districtList = [];
  transferStatusList = [];
  operateStatusList = []; // 经营状态
  operateMode = [];
  vaildTime = [];
  fitmentLevelList = [];
  serviceList = [];
  payWayList = [];
  depositList = [];
  facilitiesList = [];
  rateChoice = [];
  emptyTransferList = [];
  sexType = [];
  memberTypeList = [];


  constructor(private ngxModalService: BsModalService, private router: Router, @Inject('data') private data, private route: ActivatedRoute, @Inject('DataCollectionService') private DataCollectionService, @Inject('CurrentCityService') private CurrentCityService) {
    //获取行业列表
    this.data.getIndustryData().then(res => {
      this.industries = res ? res : [];
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

    //获取建筑形状
    this.data.getBuildingShapeData().then(res => {
      this.buildingShapeList = res;
    });

    //获取转让状态列表
    this.data.getTransferStatusData().then(res => {
      this.transferStatusList = res;
    });

    //获取位置描述列表
    this.data.getPositionDesData().then(res => {
      this.positionDescriptionList = res;
    });

    //是否临街
    this.data.getBesideStreet().then(res => {
      this.positionList = res;
    });

    //店铺证件类型
    this.data.getCertificateType().then(res => {
      this.certificationsTypeList = res;
    });

    //租金单位
    this.data.getRentMeasure().then(res => {
      this.rentMeasureList = res;
    });

    //营业状态
    this.data.getOperateStatus().then(res => {
      this.operateStatusList = res;
    });

    //拆迁风险
    this.data.getPullRisk().then(res => {
      this.destroyedRatioList = res;
    });

    //产权类型
    this.data.getPerprotyRight().then(res => {
      this.propertyRightTypeList = res;
    });

    //物业类型和上级物业
    this.data.getEstateType().then(res => {
      res.forEach((v, i) => {
        v.value_description.trim() == '商铺' ? res.splice(i, 1) : '';  //去掉商铺
      });
      this.superFacilityList = res;
    });

    //经营模式
    this.operateMode = this.data.getOperateType();

    //获取星期列表
    this.vaildTime = this.data.getWeekData();

    //获取装修级别列表
    this.fitmentLevelList = this.data.getFitmentLevel();

    //获取服务列表
    this.serviceList = this.data.getServiceList();

    //获取支付方式列表
    this.payWayList = this.data.getPayWayList();

    //押金方式列表
    this.depositList = this.data.getDepositList();

    //物业设施列表
    this.facilitiesList = this.data.getFacilities();

    //获取是否上涨列表
    this.rateChoice = this.data.getRateChoiceList();

    //获取是否空转列表
    this.emptyTransferList = this.data.getEmptyChoice();

    //获取性别列表
    this.sexType = this.data.getSexTypeList();

    //获取会员类型
    this.memberTypeList = this.data.getMemberType();
  }

  ngOnInit() {
    //获取参数并判断时发布还是修改信息，修改则请求相应数据
    this.route.queryParams.subscribe((queryParams: Params) => {
      var oppoId = queryParams.id;
      /* oppoId != '' ? this.getShopInfo(oppoId) : '';*/
    });
  }


  // 品牌名称
  shopName:string = '';
  isBrandName:boolean = false;
  brandName:string = '';
  subShopName:string = '';
  operateType:string = '';

  // 经营行业
  bigIndustry:string = '';
  smallIndustry:string = '';

  industries;

  startOpenDate='';// 开业日期

  operateStatus = 1;
  endOpenDate = ''; // 停业日期
  shopImages = [];// 门面
  multiShops:boolean = true;
  environment = []; // 环境
  multiEnvironment:boolean = true;
  shopPhoneNumber:string = '';  // 前台电话
  takeOutPhone:string = '';  // 外卖电话
  wholeWeek:boolean = false;  // 营业时间

  operateDate = [];
  allDay:boolean = false;
  operateStartTime:string = '';
  operateEndTime:string = '';
  fitmentLevelStatus:string = '';  // 装修档次

  serviceProvided = [];  // 提供服务

  shopRent:string = '';  // 店铺租金
  rentMeasure = 1;
  rentMeasureList;

  payWay:string = '自定义';
  definedPayWay:string = '';
  rateWay:string = '';  // 递增或递减
  definedRateWay:string = '';

  depositWay:string = '';  // 押金
  definedDepositWay:string = '';

  rentDate = '';           //租期
  rentTime:string = '';           //租约
  leftContractTime:string = '';  //剩余合同期
  personProfit:string = '';  //客单价
  dayProfit:string = '';       //日均营业额
  consumePersonType:string = '';  //消费人群
  consumeTime:string = '';    //消费时间
  foodAmount:string = '';    //堂食量
  takeOutAmount:string = '';  //外卖量
  memberAmount:string = ''; //会员数
  memberType:string = '';  //会员类型
  transferStatus:string = '1'          //转让状态

  transferFee:string = '';              //转让费
  isNegotiable:boolean = false;
  emptyTransfer:string = '';           //可否空转

  emptyTransferFee:string = '';          //空转转让费
  transferStaff:string = '';           //转让内容
  transferReason:string = '';            //转让原因


  certifications = [];
  objCertification = {
    certificationType: '',
    name: "",
    headImage: '',
    backImage: '',
    otherImages: [],
    certificationNumber: '',
    owner_name: '',
    address: '',
    permissionScope: '',
    otherContent: ''
  }

  selectedCertificationType = 4;
  writeCertificationType = '';           //证件类型
  certificationsTypeList = [];
  headIsMulti:boolean = false;            //是否多张
  backIsMulti:boolean = false;
  otherIsMulti:boolean = true;
  headImage = '';
  backImage = '';
  headImageA = [];            //正面图片
  backImageA = [];            //反面图片
  otherImages = [];            //其他图片

  certificationNumber:string = '';     //证件名称
  owner_name:string = '';               //主题名称
  address:string = '';                 //地址
  permissionScope:string = '';         //许可范围
  otherContent:string = '';            //其他内容

  shopBoss: Person = {
    name: '',
    phoneList: [""],
    realName: '',
    sex: '',
    birthdayDate: '',
    contactAddress: '',
    email: '',
    qq: '',
    wx: '',
    personInfoDetail: ''
  };
  phoneList: string[] = [""];
  name: string = '';                       //名称
  realName: string = '';                   //真实名字

  sex: string = '';            //性别

  birthdayDate = '';
  contactAddress:string = '';            //联系地址
  email:string = '';                     //电子邮件
  qq:string = '';                        //qq
  wx:string = '';                        //微信
  personInfoDetail:string = '';          //详细描述

  partner: Person[] = [
    {
      name: "",
      phoneList: [''],
      realName: '',
      sex: '',
      birthdayDate: '',
      contactAddress: '',
      email: '',
      qq: '',
      wx: '',
      personInfoDetail: '',
      stockRatio: ''
    }
  ];

  entryTimePlaceHolder:string = '入职时间';
  leaveTimePlaceHolder:string = '离职时间';
  isDission:boolean = false;
  employee: Person[] = [{
    position: '', entryDate: '', workContent: '', leaveDate: '', isDission: false,
    name: "",
    phoneList: [''],
    realName: '',
    sex: '',
    birthdayDate: '',
    contactAddress: '',
    email: '',
    qq: '',
    wx: '',
    personInfoDetail: ''
  }];


  city:string = '';           //城市
  district:string = '';       //区域
  addressDetail:string = '';
  tempcity:string = '';
  tempdistrict:string = '';
  tempaddressDetail:string = '';

  mapAddress:string = '';  //将城市区域拼接起来的地址将传递给地图进行地址解析

  shopAddress:string = '';
  longitude:string = '';                       //经度
  latitude:string = '';                       //纬度
  tempshopAddress:string = '';
  templongitude:string = '';                       //经度
  templatitude:string = '';                       //纬度


  positionDescription:string = '';       //位置描述
  positionDescriptionList: string[] = [];

  isNearStreet:string = '';                //是否临街
  positionList: string[] = [];

  superFacility:string = '';                //上级物业
  superFacilityList: string[] = [];
  shopCityName:string = '';                 //商城名称

  buildingArea = '';                //建筑面积
  roomArea = '';                     //开间
  doorWidth = '';                    //门宽
  floor = '';                         //所处楼层
  validArea = '';                    //使用面积
  depth = '';                        //进深
  floorHeight = '';                   //层高
  floorAmount = '';                  //总层数

  fitIndustry = [];                   //适合经营
  recommendableIndustry = [];             //推荐经营
  unRecommendableIndustry = [];               //不推荐经营


  facilities = [];             //物业配套
  parking_num='';
  outward_area='';

  waterFee = '';                //水费
  facilityFee = '';             ////物业
  gasFee = '';                   //燃气
  elecFee = '';                  //电费
  rent = '';                      //租金
  rentMeasureF = 1;
  warmFee = '';                    //暖气

  buildingShape = '';
  buildingShapeList: string[] = [];

  propertyRightType = '';
  propertyRightTypeList: string[] = [];

  destroyedRatio = '';
  destroyedRatioList: string[] = [];
  destroyedRatioDetail = '';


  houseOwner: Person = {
    name: "",
    phoneList: [''],
    realName: '',
    sex: '',
    birthdayDate: '',
    contactAddress: '',
    email: '',
    qq: '',
    wx: '',
    personInfoDetail: ''
  };
  mapInfo : MapData = {'city': this.city, 'district': '', 'address': '', 'lng': '', 'lat': ''};

  //如果是修改则需要获取该店铺信息
  /* getShopInfo(id) {
     var result = [];
     this.shopName=result.shopName;                           //店名
     this.brandName=result.brandName;                         //品牌名称
     this.subShopName=result.subShopName;                      //分店名
     this.operateType=result.operateType;                     //运营模式
     this.bigIndustry=result.bigIndustry;
     this.smallIndustry=result.smallIndustry;
     this.startOpenDate=result.startOpenDate;                 //开业日期
     this.operateStatus=result.operateStatus;                 //经营状态
     this.endOpenDate=result.endOpenDate;                     //停业日期
     this.shopImages=result.shopImages;                       //店铺门面图片
     this.environment=result.environment;                    //店铺环境图片
     this.shopPhoneNumber=result.shopPhoneNumber;             //前台电话
     this.takeOutPhone=result.takeOutPhone;                    //外卖电话
     this.operateDate=result.operateDate;                     //营业日
     this.operateStartTime=result.operateStartTime;           //营业开始时间
     this.operateEndTime=result.operateEndTime;               //营业结束时间
     this.fitmentLevelStatus=result.fitmentLevelStatus;       //装修档次
     this.serviceProvided=result.serviceProvided;             //提供服务
     this.shopRent=result.shopRent;                           //店铺租金
     this.rentMeasure=result.rentMeasure;                     //店铺租金单位
     this.payWay=result.payWay;                               //支付方式
     this.rateWay=result.rateWay;                            //递增或递减
     this.definedRateWay=result.definedRateWay;              //增率或减率
     this.depositWay=result.depositWay;                       //押金方式
     this.rentDate=result.rentDate;                           //租期
     this.rentTime=result.rentTime;                           //租约
     this.leftContractTime=result.leftContractTime;           //剩余合同期
     this.personProfit=result.personProfit;                   //客单价
     this.dayProfit=result.dayProfit;                         //日均营业额
     this.consumePersonType=result.consumePersonType;         //消费人群
     this.consumeTime=result.consumeTime;                  //消费时间
     this.foodAmount=result.foodAmount;                      //堂食量
     this.takeOutAmount=result.takeOutAmount;                 //外卖量
     this.memberAmount=result.memberAmount;                   //会员数
     this.memberType=result.memberType;                       //会员类型
     this.transferStatus=result.transferStatus;               //转让状态
     this.transferFee=result.transferFee;                     //转让费
     this.emptyTransfer=result.emptyTransfer;                 //是否空转
     this.emptyTransferFee=result.emptyTransferFee;           //空转转让费
     this.transferStaff=result.transferStaff;                 //转让内容
     this.transferReason=result.transferReason;               //转让原因
     this.certifications=result.certifications;               //店铺证件
     this.shopBoss=result.shopBoss;                           //店铺老板
     this.partner=result.partner;                             //合作伙伴
     this.employee=result.employee;                           //店铺员工
     this.city=result.city;                                   //城市
     this.district=result.district;                           //区域
     this.addressDetail=result.addressDetail;                 //详细地址
     this.longitude=result.longitude;                         //经度
     this.latitude=result.latitude;                           //纬度
     this.positionDescription=result.positionDescription;     //位置描述
     this.isNearStreet=result.isNearStreet;                   //是否临街
     this.superFacility=result.superFacility;                //上级物业
     this.shopCityName=result.shopCityName;                   //商城名称
     this.buildingArea=result.buildingArea;                   //建筑面积
     this.roomArea=result.roomArea;                           //开间
     this.doorWidth=result.doorWidth;                          //门宽
     this.floor=result.floor;                                  //所处楼层
     this.validArea=result.validArea;                          //使用面积
     this.depth=result.depth;                                   //进深
     this.floorHeight=result.floorHeight;                       //层高
     this.floorAmount=result.floorAmount;                       //楼层数
     //this.fitIndustry=result.fitIndustry;                       //适合经营
     //this.recommendableIndustry=result.recommendableIndustry;                       //推荐经营
     //this.unRecommendableIndustry=result.unRecommendableIndustry;                   //不宜经营
     result.fitIndustry.forEach((v,i)=>{
       this.allIndustry.forEach((m,j)=>{m.code==v ? this.fitIndustry.push({code:v,name:m.name})});
     });
     result.recommendableIndustry.forEach((v,i)=>{
       this.allIndustry.forEach((m,j)=>{m.code==v ? this.recommendableIndustry.push({code:v,name:m.name})});
     });
     result.unRecommendableIndustry.forEach((v,i)=>{
       this.allIndustry.forEach((m,j)=>{m.code==v ? this.unRecommendableIndustry.push({code:v,name:m.name})});
     });

     this.facilities=result.facilities;                           //物业配套
     this.parking_num=result.parking_num;
     this.outward_area=result.outward_area;
     this.waterFee=result.waterFee;                             //水费
     this.facilityFee=result.facilityFee;                         //物业
     this.gasFee=result.gasFee;                                   //燃气费
     this.elecFee=result.elecFee;                                //电费
     this.rent=result.rent;                                         //租金
     this.warmFee=result.warmFee;                                 //暖气费
     this.buildingShape=result.buildingShape;                     //建筑形状
     this.propertyRightType=result.propertyRightType;             //产权类型
     this.destroyedRatio=result.destroyedRatio;                   //拆迁风险
     this.destroyedRatioDetail=result.destroyedRatioDetail;      //拆迁风险率
     this.houseOwner=result.houseOwner;
   }*/

  //该店铺是品牌时填写品牌名称时店铺名称需要随着改变
  updateShopName() {
    this.shopName = this.subShopName == '' ? this.brandName : this.brandName + "(" + this.subShopName + ")";
  }

  //根据大行业加载小行业
  loadSmallIndustry(code) {
    this.smallIndustry = '';
    this.smallIndustryList = [];
    this.allIndustry.forEach((v, i) => {
      (code.toString().length != v.code.toString().length) && code.toString().trim() === v.code.toString().substr(0, 2).trim() ? this.smallIndustryList.push(v) : '';
    });
  }

  //根据城市加载相应区域
  loadDistrict(code) {  //城市 1234000000   区1234560000
    this.district = '';
    this.districtList = [];
    this.allDistricts.forEach((v, i) => {
      (v.id.toString().substr(4, 2) != '00' && code.toString().substr(0, 4) == v.id.toString().substr(0, 4)) ? this.districtList.push(v) : '';
    });

    this.shopAddress = this.getWholeAddress();
  }

  mapAddressChange() {
    this.shopAddress = this.getWholeAddress();
  }

  //获取开业时间
  getStartTime(date) {
   /* console.log("开业日期：", date);*/
    this.startOpenDate = date;
  }

  //获取停业时间
  getEndTime(date) {
    this.endOpenDate = date;
  }

  //添加店铺照片
  addImages(oldImages, newInamges) {
    oldImages = newInamges;
  }

  //添加合伙人
  addPartner() {
    var obj = {
      name: "",
      phoneList: [''],
      realName: '',
      sex: '',
      birthdayDate: '',
      contactAddress: '',
      email: '',
      qq: '',
      wx: '',
      personInfoDetail: '',
      stockRatio: ''
    };
    var newObj: any = this.copy(obj);
    this.partner.push(newObj);
  }

  //添加店铺证件
  addCertificationImages(imageUrl, newInamges) {
    imageUrl = newInamges[0].url;
  }

  //当点完整周时，其他的不可用
  dayCheckValid = false;

  selectAllWeek() {
    if (this.wholeWeek === false) {
      this.vaildTime.map((item, index) => {
        item.checked = true;
      });
      this.dayCheckValid = true;
      this.vaildTime.forEach((v, i) => {
        this.operateDate.push(v);
      });
    } else {
      this.vaildTime.map((item, index) => {
        item.checked = false;
      });
      this.dayCheckValid = false;
      this.operateDate = [];
    }
  }

  //选择某一天点击事件
  selectThisDay(item) {
    if (item.checked === true) {
      this.operateDate.push(item);
    } else {
      this.operateDate.forEach((value, index) => {
        value.code = item.code ? this.operateDate.splice(index, 1) : "";
      });
    }
  }

  //选择一整天则时间不可填写
  canChangeTime = false;

  selectAllDay() {
    if (this.allDay === false) {
      this.operateStartTime = "00:00";
      this.operateEndTime = "24:00";
      this.canChangeTime = true;
    } else {
      this.operateStartTime = "";
      this.operateEndTime = "";
      this.canChangeTime = false;
    }
  }

  //选择提供的服务
  selectThisService(item) {
    if (item.checked === false) {
      this.serviceProvided.push(item);
    } else {
      this.serviceProvided.forEach((value, index) => {
        value.code.toString() === item.code.toString() ? this.serviceProvided.splice(index, 1) : '';
      });
    }
  }

  //选择支付方式
  definedWayShow = false;

  selectThisPayWay(item) {
    this.definedWayShow = item.code == '0' ? false : true;
    this.payWay = item.code == '0' ? this.definedPayWay : item.name;
  }

  //弹出框选择支付方式
  tempdefinedWayShow = true;

  selectThisPopUpPayWay(item) {
    this.tempdefinedWayShow = item.code == 0 ? false : true;
    this.temppayWay = item.code == 0 ? this.tempdefinedPayWay : item.name;
  }


  definedPayChange() {
    if (this.payWay.trim() == '自定义') {
      this.payWay = this.definedPayWay;
    }
  }

  //支付方式改变时
  definedPopUpPayChange() {
    if (this.temppayWay.trim() == '自定义') {
      this.temppayWay = this.tempdefinedPayWay;
    }
  }

  selectThisRate(item) {
    this.temprateWay = item.name;
  }

  selectThisDepositWay(item) {
    this.tempdepositWay = item.code == '0' ? this.tempdefinedDepositWay : item.name;
  }

  definedDepositChange() {
    this.tempdepositWay = this.tempdepositWay.trim() == '自定义' ? this.tempdefinedDepositWay : this.tempdepositWay;
  }

  getRentDate(date) {
    this.rentDate = date;
  }

  selectTransferStatus(item) {
    this.transferStatus = item.value;
  }

  selectModalTransferStatus(item) {
    this.temptransferStatus = item.value;
  }

  selectEmptyTransfer(item) {
    this.emptyTransfer = item.name;
  }

  selectModalEmptyTransfer(item) {
    this.tempemptyTransfer = item.name;
  }

  deleteCertification(item) {
    this.certifications.forEach((value, index) => {
      value.certificationType.toString() == item.certificationType.toString() ? this.certifications.splice(index, 1) : '';
    });
  }

  //添加电话号码
  phoneNumberExample = {number: ''};

  addPhoneNumbers() {
    var obj: any = this.copy(this.phoneNumberExample);
    this.phoneList.push(obj);          //增加输入框个数
  }

  selectSexStatus(item) {
    this.sex = item.code;
  }

  getbirthTime(date) {
    this.birthdayDate = date;
  }

  addEmployee() {
    var obj = {
      position: '', entryDate: '', workContent: '', leaveDate: '', isDission: false,
      name: "",
      phoneList: [''],
      realName: '',
      sex: '',
      birthdayDate: '',
      contactAddress: '',
      email: '',
      qq: '',
      wx: '',
      personInfoDetail: ''
    };
    var newObj: any = this.copy(obj);
    this.employee.push(newObj);
  }

  getEntryDate(date) {

  }

  getLeaveDate(date) {

  }




  //关闭弹出框时事件
  closeModal(modal){
   /* this.closeModalInit();*/
    modal.hide();
  }

  //弹出框确定按钮点击事件
  confirmModal(modalName,modal){
    this.sureBtnFunction(modalName);
    modal.hide();
  }

  //弹窗框配置
  config = {
    animated: true,
    keyboard: true,
    backdrop: 'static',
    ignoreBackdropClick: false,
    class: 'gray modal-lg'
  };

  //打开编辑店铺图片弹出框
  shopImageModalRef: BsModalRef;
  openEditShopImagesModal(content) {
    this.shopImages.forEach((v, i) => {
      this.tempshopImages.push(v);
    });
    this.environment.forEach((v, i) => {
      this.tempenvironment.push(v);
    });

    this.shopImageModalRef = this.ngxModalService.show(content, this.config);
  }

  //打开更多租金信息弹出框
  rentModalRef: BsModalRef;
  openRentModal(content) {
    this.tempshopRent = this.shopRent;
    this.temprentMeasure = this.rentMeasure;
    this.temppayWay = this.definedWayShow ? this.payWay : '自定义';
    this.tempdefinedPayWay = this.definedPayWay;
    this.tempdefinedWayShow = this.definedWayShow;
    this.temprateWay = this.rateWay;
    this.tempdefinedRateWay = this.definedRateWay;
    this.tempdepositWay = this.depositWay;
    this.tempdefinedDepositWay = this.definedDepositWay;
    this.temprentDate = this.rentDate;
    this.temprentTime = this.rentTime;
    this.templeftContractTime = this.leftContractTime;
console.log("123:",this.temppayWay);
    this.rentModalRef = this.ngxModalService.show(content,this.config);
  }

  //打开营业内容弹出框
  operateModalRef: BsModalRef;
  openOperateContentModal(content) {
    this.temppersonProfit = this.personProfit;
    this.tempdayProfit = this.dayProfit;
    this.tempconsumePersonType=this.consumePersonType;
    this.tempconsumeTime=this.consumeTime;
    this.tempfoodAmount=this.foodAmount;
    this.temptakeOutAmount=this.takeOutAmount;
    this.tempmemberAmount=this.memberAmount;
    this.tempmemberType=this.memberType;

    this.operateModalRef = this.ngxModalService.show(content,this.config);

  }

  //打开店铺转让内容弹出框
  transferModalRef: BsModalRef;
  openTransferInfoModal(content) {
    this.temptransferStatus = this.transferStatus;
    this.temptransferFee = this.transferFee;
    this.tempisNegotiable = this.isNegotiable;
    this.tempemptyTransfer = this.emptyTransfer;
    this.temptransferStaff = this.transferStaff;
    this.temptransferReason = this.transferReason;

    this.transferModalRef = this.ngxModalService.show(content,this.config);

  }

  //打开行业弹出框
  defaultIndustryList = [];
  tempdefaultIndustryList;
  industryModalRef: BsModalRef;
  openIndustryModel(content, selectedList) {
    this.defaultIndustryList = selectedList;

    this.tempdefaultIndustryList = [];
    selectedList.forEach((v, i) => {
      this.tempdefaultIndustryList.push(v);
    });

    this.industrySelectedFlag(this.industries, this.tempdefaultIndustryList);

    this.industryModalRef = this.ngxModalService.show(content,this.config);

  }

  //打开店铺证件弹出框
  defaultCertification;
  certificationModalRef: BsModalRef;
  openShopCertificationModal(content, item, type) {  //type1编辑2添加
    let newItem = {};
    type == '2' ? newItem = this.copy(item) : '';
    this.defaultCertification = type == '1' ? item : newItem;

    this.selectedCertificationType = item.certificationType;
    this.writeCertificationType = '';           //证件类型


    item.headImage == '' ? this.headImageA = [] : this.headImageA.push({url: item.headImage}); //正面图片
    item.backImage == '' ? this.headImageA = [] : this.backImageA.push({url: item.backImage}); //反面图片

    item.otherImages.forEach((v, i) => {
      this.otherImages.push(v);
    });                                                                 //其他图片

    this.certificationNumber = item.certificationNumber;                //证件名称
    this.owner_name = item.owner_name;                                    //主题名称
    this.address = item.address;                                        //地址
    this.permissionScope = item.permissionScope;                        //许可范围
    this.otherContent = item.otherContent;                              //其他内容


    this.certificationModalRef = this.ngxModalService.show(content,this.config);
    type == '2' ? this.certifications.push(<any>newItem) : '';

  }

  //打开个人信息弹出框
  defaultPerson;
  personModalRef: BsModalRef;
  openPersonalInfo(content, item) {
    this.defaultPerson = item;
    this.phoneList = [];
    item.phoneList.forEach((v, i) => {                   //考虑深浅拷贝问题和对象复制问题和基础类型和引用类型
      let obj: any = this.copy(this.phoneNumberExample);
      obj.number = v;
      this.phoneList.push(obj);
    });
    this.name = item.name;           //证件类型
    this.realName = item.realName;
    this.sex = item.sex;
    this.birthdayDate = item.birthdayDate;
    this.contactAddress = item.contactAddress;
    this.email = item.email;
    this.qq = item.qq;
    this.wx = item.wx;
    this.personInfoDetail = item.personInfoDetail;

    this.personModalRef = this.ngxModalService.show(content,this.config);

  }



  //行业弹出框选择行业
  selectThisIndustry(item) {
    if (this.tempdefaultIndustryList.length > 9) {
      alert('最多可选择10个');
      return;
    }

    var tempIndexArr = [];          //记录要删除的项的index
    var isConnected = false;         //标记是否是大小行业的关系是则删除对应的选项之外还要添加当前选择的项
    item.selected = true;

    //一个都没有的时候直接添加
    this.tempdefaultIndustryList.length == 0 ? this.tempdefaultIndustryList.push(item) : '';

    for (let i = 0; i < this.tempdefaultIndustryList.length; i++) {                //for和forEach 使用return的区别
      var v = this.tempdefaultIndustryList[i];
      if (v.code.toString() != item.code.toString()) {
        //不同的情况分为两种，1,完全不同和部分不同
        if (v.code.toString().length != item.code.toString().length && v.code.toString().substr(0, 2) == item.code.toString().substr(0, 2)) {
          tempIndexArr.push(i);
          isConnected = true;
        } else if (i == (this.tempdefaultIndustryList.length - 1)) {
          this.tempdefaultIndustryList.push(item);
          this.industrySelectedFlag(this.industries, this.tempdefaultIndustryList);
          isConnected = false;
        }
      } else {
        break;
      }
    }

    isConnected == true ? this.tempdefaultIndustryList.push(item) : '';

    for (let i = 0; i < tempIndexArr.length; i++) {
      //不可用forEach
      var v = tempIndexArr[i];
      this.tempdefaultIndustryList.splice(v, 1);
      this.industrySelectedFlag(this.industries, this.tempdefaultIndustryList);
      for (let j = 0; j < tempIndexArr.length; j++) {
        tempIndexArr[j] = tempIndexArr[j] - 1;
      }
    }
  }

  //删除选中的行业
  deleteSelectedIndustry(dataList, item) {
    dataList.forEach((value, index) => {
      value.code == item.code ? dataList.splice(index, 1) : '';
      this.industrySelectedFlag(this.industries, this.tempdefaultIndustryList);
    });
  }

  //勾选物业设施
  selectThisFacility(item) {
    var index = this.facilities.findIndex(v => v.code == item.code);
    item.checked ? this.facilities.splice(index, 1) : this.facilities.push(item);
  }

  //行业弹出框选择行业，当选择的行业发生变化是行业列表标红的选项也要改变
  industrySelectedFlag(industries, selectedL) {

    this.industries.forEach((v, i) => {
      v.map(item => item.selected = false);
    })

    for (let i = 0; i < selectedL.length; i++) {
      for (let j = 0; j < this.industries.length; j++) {
        for (let k = 0; k < this.industries[j].length; k++) {
          this.industries[j][k].code == selectedL[i].code ? this.industries[j][k].selected = true : '';
        }
      }
    }
  }

  //获取地图所需要的完成地址
  getWholeAddress() {
    let tempCityC = this.allDistricts.find(item => item.id.toString() == this.city.toString());
    let tempDistrictC = this.allDistricts.find(item => item.id.toString() == this.district.toString());
    let city = tempCityC ? tempCityC.name : '';
    let district = tempDistrictC ? tempDistrictC.name : '';
    let addressDetail = this.addressDetail;
    return city + district + addressDetail != '' ? city + district + addressDetail : '';
  }

  //控制地图显示或是隐藏
  mapBlock = false;

  mapShow() {
    this.mapBlock = true; //显示地图
    //获取地址传给map
    this.mapAddress = this.getWholeAddress() ? this.getWholeAddress() : this.CurrentCityService.getCurCity().name;
  }

  closeMap() {
    this.mapBlock = false;
  }

  //获取地图点击事件获取到的信息
  geoLocation(e) {
    this.templatitude = e.point.lat;
    this.templongitude = e.point.lng;
    this.tempcity = this.allDistricts.find(item => item.name == e.address.city) ? this.allDistricts.find(item => item.name == e.address.city).id : '';
    this.tempdistrict = this.allDistricts.find(item => item.name.trim() == e.address.district.trim()) ? this.allDistricts.find(item => item.name == e.address.district).id : '';
    this.tempaddressDetail = e.address.street;

    this.tempshopAddress = e.address.city + e.address.district + e.address.street;
  }

  //地图确定按钮
  sureLocation() {
    this.latitude = this.templatitude;
    this.longitude = this.templongitude;

    this.city = this.tempcity;
    this.loadDistrict(this.city);
    this.district = this.tempdistrict;
    this.addressDetail = this.tempaddressDetail;
    this.shopAddress = this.getWholeAddress();

    this.mapBlock = false;
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////
  //开始处理弹出框的值
  ////////////////////////////////////////////////////////////////////////////////////////////////
  /*图片弹出框*/
  tempshopImages = [];       //此处复制方式和shopImages一样；
  tempenvironment = [];


  /*店铺租金弹出框*/
  tempshopRent = '';
  temprentMeasure = 1;
  temppayWay = '';
  tempdefinedPayWay = '';
  temprateWay = '';
  tempdefinedRateWay = '';
  tempdepositWay = '';
  tempdefinedDepositWay = '';
  temprentDate = '';
  temprentTime = '';
  templeftContractTime = '';


  /*店铺营业状况弹出框*/
  temppersonProfit = '';
  tempdayProfit = '';
  tempconsumePersonType = '';
  tempconsumeTime = '';
  tempfoodAmount = '';
  temptakeOutAmount = '';
  tempmemberAmount = '';
  tempmemberType = '';


  /*转让信息弹出框*/
  temptransferStatus = '';
  temptransferFee = '';
  tempisNegotiable = false;
  tempemptyTransfer = '';
  tempemptyTransferFee = '';
  temptransferStaff = '';
  temptransferReason = '';


  /*行业列表弹出框*/
  tempfitIndustry = [];
  temprecommendableIndustry = [];
  tempunRecommendableIndustry = [];


  ////////////////////////////////////////////////////////////////////////////////////////////////
  //公共函数
  copy(obj) {
    var newObj = {};
    for (var v in obj) {
      newObj[v] = obj[v];
    }
    return newObj;
  }


  //确定按钮用于传参
  sureBtnFunction(content):void {
    var modalName:string = Object.keys(content._def.references)[0];
    if (modalName == 'shopImageContent') {
      this.shopImages = [];
      this.tempshopImages.forEach((v, i) => {
        this.shopImages.push(v);
      });
      this.environment = [];
      this.tempenvironment.forEach((v, i) => {
        this.environment.push(v);
      });
    }
    if (modalName == 'rentContent') {
      this.shopRent = this.tempshopRent;
      this.rentMeasure = this.temprentMeasure;
      this.payWay = this.tempdefinedWayShow ? this.temppayWay : '自定义' ;
      this.definedPayWay = this.tempdefinedPayWay;
      this.definedWayShow = this.tempdefinedWayShow;
      this.rateWay = this.temprateWay;
      this.definedRateWay = this.tempdefinedRateWay;
      this.depositWay = this.tempdepositWay;
      this.definedDepositWay = this.tempdefinedDepositWay;
      this.rentDate = this.temprentDate;
      this.rentTime = this.temprentTime;
      this.leftContractTime = this.templeftContractTime;
    }
    if (modalName == 'profitContent') {
      this.personProfit = this.temppersonProfit;
      this.dayProfit = this.tempdayProfit;
      this.consumePersonType = this.tempconsumePersonType;
      this.consumeTime = this.tempconsumeTime;
      this.foodAmount = this.tempfoodAmount;
      this.takeOutAmount = this.temptakeOutAmount;
      this.memberAmount = this.tempmemberAmount;
      this.memberType = this.tempmemberType;
    }
    if (modalName == 'transferContent') {
      this.transferStatus = this.temptransferStatus,
        this.transferFee = this.temptransferFee,
        this.isNegotiable = this.tempisNegotiable,
        this.emptyTransfer = this.tempemptyTransfer,
        this.emptyTransferFee = this.tempemptyTransferFee,
        this.transferStaff = this.temptransferStaff,
        this.transferReason = this.temptransferReason
    }
    if (modalName == 'industryContent') {
      this.defaultIndustryList.splice(0, this.defaultIndustryList.length);
      this.tempdefaultIndustryList.forEach((v, i) => {
        this.defaultIndustryList.push(v);
      });
    }
    if (modalName == 'certificationEdit') {
      this.defaultCertification.certificationType = this.selectedCertificationType;         //证件类型
      this.defaultCertification.name = this.certificationsTypeList.find(item => item.value.toString() == this.selectedCertificationType.toString()).value_description;
      this.defaultCertification.headImage = this.headImageA[0] ? this.headImageA[0].url : '';
      this.defaultCertification.backImage = this.backImageA[0] ? this.backImageA[0].url : '';
      this.defaultCertification.otherImages = [];
      this.otherImages.forEach((v, i) => {
        this.defaultCertification.otherImages.push(v);
      })

      this.defaultCertification.certificationNumber = this.certificationNumber;
      this.defaultCertification.owner_name = this.owner_name;
      this.defaultCertification.address = this.address;
      this.defaultCertification.permissionScope = this.permissionScope;
      this.defaultCertification.otherContent = this.otherContent;

    }
    if (modalName == 'personInfo') {
      var tempArr: any = [];
      this.phoneList.forEach((v: any, i) => {
        tempArr.push(v.number);
      });
      this.defaultPerson.phoneList = tempArr;
      this.defaultPerson.name = this.name;           //证件类型
      this.defaultPerson.realName = this.realName;
      this.defaultPerson.sex = this.sex;
      this.defaultPerson.birthdayDate = this.birthdayDate;
      this.defaultPerson.contactAddress = this.contactAddress;
      this.defaultPerson.email = this.email;
      this.defaultPerson.qq = this.qq;
      this.defaultPerson.wx = this.wx;
      this.defaultPerson.personInfoDetail = this.personInfoDetail;
    }

  }

  //关闭按钮只负责清空所有表单值值
  closeModalInit() {
    this.tempshopImages = [];
    this.tempenvironment = [];


    this.tempshopRent = '';
    this.temprentMeasure = 1;
    this.temppayWay = '';
    this.tempdefinedPayWay = '';
    this.temprateWay = '';
    this.tempdefinedRateWay = '';
    this.tempdepositWay = '';
    this.tempdefinedDepositWay = '';
    this.temprentDate = '';
    this.temprentTime = '';
    this.templeftContractTime = '';

    this.temppersonProfit = '';
    this.tempdayProfit = '';
    this.tempconsumePersonType = '';
    this.tempconsumeTime = '';
    this.tempfoodAmount = '';
    this.temptakeOutAmount = '';
    this.tempmemberAmount = '';
    this.tempmemberType = '';

    this.temptransferStatus = '';
    this.temptransferFee = '';
    this.tempisNegotiable = false;
    this.tempemptyTransfer = '';
    this.tempemptyTransferFee = '';
    this.temptransferStaff = '';
    this.temptransferReason = '';

    this.selectedCertificationType = 1;         //证件类型
    this.certificationsTypeList = [];
    this.headImageA = [];
    this.backImageA = [];
    this.otherImages = [];

    this.certificationNumber = '';
    this.owner_name = '';
    this.address = '';
    this.permissionScope = '';
    this.otherContent = '';


    this.phoneList = [];
    this.name = '';           //证件类型
    this.realName = '';
    this.sex = '';
    this.birthdayDate = '';
    this.contactAddress = '';
    this.email = '';
    this.qq = '';
    this.wx = '';
    this.personInfoDetail = '';
  }

  release() {
    /*  this.router.navigate(['glancePostedInfoItem']);*/

    //当前经营，适合经营和不宜经营需要的是code[code1,code2....];
    var fitC:Array<any> = [], recomC:Array<any> = [], unrecomC:Array<any> = [];
    this.fitIndustry.forEach((v, i) => {
      fitC.push(v.code);
    });
    this.recommendableIndustry.forEach((v, i) => {
      recomC.push(v.code);
    });
    this.unRecommendableIndustry.forEach((v, i) => {
      unrecomC.push(v.code);
    });
    var params = {
      shopName: this.shopName,                           //店名
      brandName: this.brandName,                         //品牌名称
      subShopName: this.subShopName,                      //分店名
      operateType: this.operateType,                      //运营模式
      industry: this.bigIndustry ? this.smallIndustry ? this.smallIndustry : this.bigIndustry : '',
      startOpenDate: this.startOpenDate,                 //开业日期
      operateStatus: this.operateStatus,                 //经营状态
      endOpenDate: this.endOpenDate,                     //停业日期
      shopImages: this.shopImages,                       //店铺门面图片
      environment: this.environment,                     //店铺环境图片
      shopPhoneNumber: this.shopPhoneNumber,             //前台电话
      takeOutPhone: this.takeOutPhone,                    //外卖电话
      operateDate: this.operateDate,                     //营业日
      operateStartTime: this.operateStartTime,           //营业开始时间
      operateEndTime: this.operateEndTime,               //营业结束时间
      fitmentLevelStatus: this.fitmentLevelStatus,       //装修档次
      serviceProvided: this.serviceProvided,             //提供服务
      shopRent: this.shopRent,                           //店铺租金
      rentMeasure: this.rentMeasure,                     //店铺租金单位
      payWay: this.payWay,                               //支付方式
      rateWay: this.rateWay,                             //递增或递减
      definedRateWay: this.definedRateWay,               //增率或减率
      depositWay: this.depositWay,                       //押金方式
      rentDate: this.rentDate,                           //租期
      rentTime: this.rentTime,                           //租约
      leftContractTime: this.leftContractTime,           //剩余合同期
      personProfit: this.personProfit,                   //客单价
      dayProfit: this.dayProfit,                         //日均营业额
      consumePersonType: this.consumePersonType,         //消费人群
      consumeTime: this.consumeTime,                     //消费时间
      foodAmount: this.foodAmount,                       //堂食量
      takeOutAmount: this.takeOutAmount,                 //外卖量
      memberAmount: this.memberAmount,                   //会员数
      memberType: this.memberType,                       //会员类型
      transferStatus: this.transferStatus,               //转让状态
      transferFee: this.transferFee,                     //转让费
      emptyTransfer: this.emptyTransfer,                 //是否空转
      emptyTransferFee: this.emptyTransferFee,           //空转转让费
      transferStaff: this.transferStaff,                 //转让内容
      transferReason: this.transferReason,               //转让原因
      certifications: this.certifications,               //店铺证件
      shopBoss: this.shopBoss,                           //店铺老板
      partner: this.partner,                             //合作伙伴
      employee: this.employee,                           //店铺员工
      city: this.city,                                   //城市
      district: this.district,                           //区域
      addressDetail: this.addressDetail,                 //详细地址
      longitude: this.longitude,                         //经度
      latitude: this.latitude,                           //纬度
      positionDescription: this.positionDescription,     //位置描述
      isNearStreet: this.isNearStreet,                   //是否临街
      superFacility: this.superFacility,                 //上级物业
      shopCityName: this.shopCityName,                   //商城名称
      buildingArea: this.buildingArea,                   //建筑面积
      roomArea: this.roomArea,                           //开间
      doorWidth: this.doorWidth,                          //门宽
      floor: this.floor,                                  //所处楼层
      validArea: this.validArea,                          //使用面积
      depth: this.depth,                                   //进深
      floorHeight: this.floorHeight,                       //层高
      floorAmount: this.floorAmount,                       //楼层数
      fitIndustry: fitC,                                  //适合经营
      recommendableIndustry: recomC,                       //推荐经营
      unRecommendableIndustry: unrecomC,                   //不宜经营
      facilities: this.facilities,                           //物业配套
      parking_num:this.parking_num,
      outward_area:this.outward_area,
      waterFee: this.waterFee,                             //水费
      facilityFee: this.facilityFee,                         //物业
      gasFee: this.gasFee,                                   //燃气费
      elecFee: this.elecFee,                                 //电费
      rent: this.rent,                                         //租金
      warmFee: this.warmFee,                                 //暖气费
      buildingShape: this.buildingShape,                     //建筑形状
      propertyRightType: this.propertyRightType,             //产权类型
      destroyedRatio: this.destroyedRatio,                   //拆迁风险
      destroyedRatioDetail: this.destroyedRatioDetail,       //拆迁风险率
      houseOwner: this.houseOwner                            //房主
    }
    console.log("params:", params);
    this.DataCollectionService.releaseInfo(params).then(res => {
      console.log("发布信息：", res);
    }).catch(function (error) {
      alert(error);
    });
  }


}

