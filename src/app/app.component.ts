import {Component, Inject} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private modalService: NgbModal, @Inject('request') private request) {
  }

  title = 'app';


  /*品牌名称*/
  shopName = '';
  isBrandName = false;
  brandName = '';
  subShopName = '';
  operateType = '';
  operateMode = [{
    code: 1,
    name: "银行"
  },
    {
      code: 2,
      name: "啥地方是否"
    }, {
      code: 3,
      name: "123"
    }];
  /* 经营行业*/
  bigIndustry = '';
  smallIndustry = '';
  industries = [
    [
      {code: 12, name: "娱乐设施"}, {code: 27895, name: "娱乐"}, {code: 32341, name: "运动"}, {
      code: 27895,
      name: "娱乐"
    }, {code: 32341, name: "运动"}, {code: 27895, name: "娱乐"}, {code: 32341, name: "运动"}, {
      code: 27895,
      name: "娱乐"
    }, {code: 32341, name: "运动"}, {code: 27895, name: "娱乐"}, {code: 32341, name: "运动"}, {
      code: 27895,
      name: "娱乐"
    }, {code: 32341, name: "运动"}, {code: 27895, name: "娱乐"}, {code: 32341, name: "运动"}, {
      code: 27895,
      name: "娱乐"
    }, {code: 32341, name: "运动"}, {code: 27895, name: "娱乐"}, {code: 32341, name: "运动"}, {
      code: 27895,
      name: "娱乐"
    }, {code: 32341, name: "运动"}, {code: 27895, name: "娱乐"}, {code: 32341, name: "运动"}, {
      code: 27895,
      name: "娱乐"
    }, {code: 32341, name: "运动"}
    ], [
      {code: 13, name: "餐饮美食"}, {code: 2123123, name: "娱乐small"}, {code: 3123123, name: "运动small"}
    ]
  ];
  bigIndustryList = [
    {code: 1, name: "餐饮"}, {code: 2, name: "娱乐"}, {code: 3, name: "运动"}
  ];
  smallIndustryList = [
    {code: 1, name: "餐饮small"}, {code: 2, name: "娱乐small"}, {code: 3, name: "运动small"}
  ];
  /*开业日期*/
  startOpenDate = '';
  /*经营状态*/
  operateStatusList = [
    {code: 1, name: "经营中"}, {code: 2, name: "停业"}, {code: 3, name: "装修"}
  ];
  operateStatus = 1;
  /*停业日期*/
  endOpenDate = '';
  /*店铺图片*/
  /*门面*/
  shopImages = [];
  multiShops = true;
  /*环境*/
  environment = [
    {id: 123, url: "./app/public/images/1.png"},
    {id: 123, url: "./app/public/images/2.jpg"}
  ];
  multiEnvironment = true;
  /*前台电话*/
  shopPhoneNumber = '';
  /*外卖电话*/
  takeOutPhone = '';
  /*营业时间*/
  wholeWeek = false;
  vaildTime = [
    {code: 1, name: "周一", checked: false},
    {code: 2, name: "周二", checked: false},
    {code: 3, name: "周三", checked: false},
    {code: 4, name: "周四", checked: false},
    {code: 5, name: "周五", checked: false},
    {code: 6, name: "周六", checked: false},
    {code: 7, name: "周日", checked: false}
  ];
  operateDate = [];
  allDay = false;
  operateStartTime = '';
  operateEndTime = '';
  /*装修档次*/
  fitmentLevelStatus = '';
  fitmentLevelList = [
    {code: 1, name: "精装修"},
    {code: 2, name: "普通装修"},
    {code: 3, name: "简单装修"},
    {code: 4, name: "支付宝"},
    {code: 5, name: "wifi"},
    {code: 6, name: "微信"},
    {code: 7, name: "停车位"},
    {code: 8, name: "可刷卡"},
  ];
  /*提供服务*/
  serviceProvided = [];
  serviceList = [
    {code: 1, name: "可刷卡", checked: false},
    {code: 2, name: "摆件", checked: false},
    {code: 3, name: "外卖", checked: false},
    {code: 4, name: "支付宝", checked: false},
    {code: 5, name: "wifi", checked: false},
    {code: 6, name: "微信", checked: false},
    {code: 7, name: "停车位", checked: false},
    {code: 8, name: "可刷卡", checked: false},
  ];
  /*店铺租金*/
  shopRent = '';
  rentMeasure = 1;
  rentMeasureList = [{code: 1, name: "元/月"}, {code: 2, name: "万元/月"}, {code: 3, name: "千元/月"}];
  /*支付方式&&编辑更多支付方式*/
  payWayList = [
    {code: 1, name: "一月一付"},
    {code: 2, name: "两月一付"},
    {code: 3, name: "三月一付"},
    {code: 4, name: "四月一付"},
    {code: 5, name: "五月一付"},
    {code: 6, name: "六月一付"},
    {code: 0, name: "自定义"}
  ];
  payWay = '';
  definedPayWay = '';
  /*递增或递减*/
  rateWay = '';
  definedRateWay = '';
  rateChoice = [
    {code: 1, name: "递增"},
    {code: 2, name: "递减"}
  ];
  /*押金*/
  depositWay = '';
  definedDepositWay = '';
  deposit = [
    {code: 1, name: "一月租金"},
    {code: 2, name: "两月租金"},
    {code: 3, name: "三月租金"},
    {code: 4, name: "四月租金"},
    {code: 5, name: "五月租金"},
    {code: 6, name: "六月租金"},
    {code: 0, name: "自定义"}
  ];
  rentDate = '';           //租期
  rentTime = '';           //租约
  leftContractTime = '';  //剩余合同期
  /*客单价*/
  personProfit = '';  //客单价
  /*日均营业额*/
  dayProfit = '';       //日均营业额

  consumePersonType = '';  //消费人群

  consumeTime = '';    //消费时间

  foodAmount = '';    //堂食量

  takeOutAmount = '';  //外卖量

  memberAmount = ''; //会员数

  memberType = '';  //会员类型
  /*转让状态*/
  transferStatus = ''          //转让状态
  transferStatusList = [
    {code: 1, name: "不转让"},
    {code: 2, name: "转让中"},
    {code: 3, name: "转让成功"},
    {code: 4, name: "租约到期"}
  ];
  /*转让费*/
  transferFee = '';              //转让费

  /*可否空转*/
  emptyTransfer = '';           //可否空转
  emptyTransferList = [
    {code: 1, name: "可空转"},
    {code: 2, name: "不可空转"}
  ];

  emptyTransferFee = '';          //空转转让费
  transferStaff = '';           //转让内容
  transferReason = '';            //转让原因

  /*店铺证件*/
  certifications = [
    {id: 1, name: "营业执照"},
    {id: 2, name: "店铺图片"},
    {id: 3, name: "身份证件"}
  ];
  /*店铺证件弹出框*/
  selectedCertification = 4;
  certificationType = '';           //证件类型
  certificationsTypeList = [
    {id: 1, name: "营业执照"},
    {id: 2, name: "店铺图片"},
    {id: 3, name: "身份证件"},
    {id: 4, name: "其他"}
  ];
  headIsMulti = false;            //是否多张
  backIsMulti = false;
  otherIsMulti = true;
  headImage = [];            //正面图片
  backImage = [];            //反面图片
  otherImages = [];            //其他图片

  certificationNumber = '';     //证件名称
  themeName = '';               //主题名称
  address = '';                 //地址
  permissionScope = '';         //许可范围
  otherContent = '';            //其他内容

  /*店铺老板 && 个人信息弹出框*/
  shopBoss = {
    name: '',
    phoneList: [],
    realName: '',
    sex: '',
    birthdayDate: '',
    contactAddress: '',
    email: '',
    qq: '',
    wx: '',
    personInfoDetail: ''
  };

  phoneList = [""];
  name = '';                       //名称
  realName = ''                   //真实名字
  /*性别*/
  sexType = [
    {code: 1, name: "男"},
    {code: 2, name: "女"},
    {code: 3, name: "其他"}
  ];
  sexSelected = '';            //性别
  /*出生日期*/
  birthdayDate = '';

  contactAddress = '';            //联系地址

  email = '';                     //电子邮件
  qq = '';                        //qq
  wx = '';                        //微信
  personInfoDetail = '';          //详细描述

  /*合伙人*/
  partner = [
    {
      name: "里欧1",
      phone: '18977765655',
      phoneList: [],
      realName: '',
      sex: '',
      birthdayDate: '',
      contactAddress: '',
      email: '',
      qq: '',
      wx: '',
      personInfoDetail: ''
    },
    {
      name: "里欧2",
      phone: '18977765655',
      phoneList: [],
      realName: '',
      sex: '',
      birthdayDate: '',
      contactAddress: '',
      email: '',
      qq: '',
      wx: '',
      personInfoDetail: ''
    },
  ];

  addPartner() {
    var obj = {
      name: "",
      phone: '',
      phoneList: [],
      realName: '',
      sex: '',
      birthdayDate: '',
      contactAddress: '',
      email: '',
      qq: '',
      wx: '',
      personInfoDetail: ''
    };
    this.partner.push(obj);
  }

  /*店铺员工*/
  entryTimePlaceHolder = '入职时间';
  leaveTimePlaceHolder = '离职时间';
  employee = [{
    position: '', entryDate: '', workContent: '', leaveDate: ''
  }];

  /*所在位置*/
  city = '';           //城市
  district = '';       //区域
  cityList = [];
  districtList = [];
  addressDetail = '';

  longitude = '';                       //经度
  latitude = '';                       //纬度

  /*位置描述*/
  positionDescription = '';       //位置描述
  positionDescriptionList = [];

  /*是否临街*/
  isNearStreet = '';                //是否临街
  positionList = [];

  /*上级物业*/
  superFacility = '';                //上级物业
  superFacilityList = [];
  shopCityName = '';                 //商城名称

  buildingArea = '';                //建筑面积
  roomArea = '';                     //开间
  doorWidth = '';                    //门宽
  floor = '';                         //所处楼层
  validArea = '';                    //使用面积
  depth = '';                        //进深
  floorHeight = '';                   //层高
  floorAmount = '';                  //总层数


  /*适合经营*/
  fitIndustry = [                   //适合经营
    {code: 1, name: "餐馆1"},
    {code: 2, name: "娱乐1"},
    {code: 3, name: "养生1"},
    {code: 4, name: "美妆1"}
  ];
  /*推荐经营的行业*/
  recommendableIndustry = [             //推荐经营
    {code: 1, name: "餐馆2"},
    {code: 2, name: "娱乐2"},
    {code: 3, name: "养生2"},
    {code: 4, name: "美妆2"}
  ];

  /*不推荐经营的行业*/
  unRecommendableIndustry = [               //不推荐经营
    {code: 1, name: "餐馆3"},
    {code: 2, name: "娱乐3"},
    {code: 3, name: "养生3"},
    {code: 4, name: "美妆3"}
  ];

  /*物业配套*/
  facilities = [];                                   //物业配套
  facilitiesList = [
    {code: 1, name: "可明火", checked: false},
    {code: 2, name: "380V电压", checked: false},
    {code: 3, name: "电梯", checked: false},
    {code: 4, name: "暖气", checked: false},
    {code: 5, name: "上水", checked: false},
    {code: 6, name: "排烟", checked: false},
    {code: 7, name: "中央空调", checked: false},
    {code: 8, name: "天然气", checked: false},
    {code: 9, name: "外边去", checked: false}
  ];
  /*费用*/
  waterFee = '';                //水费
  facilityFee = '';             ////物业
  gasFee = '';                   //燃气
  elecFee = '';                  //电费
  rent = '';                      //租金
  warmFee = '';                    //暖气

  /*建筑形状*/
  buildingShape = '';
  buildingShapeList = [];

  /*产权类型*/
  propertyRightType = '';
  propertyRightTypeList = [];

  /*拆迁风险*/
  destroyedRatio = '';
  destroyedRatioList = [];
  destroyedRatioDetail = '';

  /*房东*/
  houseOwner = {};


  updateShopName() {
    console.log("ooo", this.subShopName);
    this.shopName = this.subShopName == '' ? this.brandName : this.brandName + "(" + this.subShopName + ")";
    console.log("shopName:", this.shopName);
  }

  getStartTime(date) {
    this.startOpenDate = date;
    console.log("startOpenDate:", this.startOpenDate);
  }

  getEndTime(date) {
    this.endOpenDate = date;
  }

  addImages(oldImages, newInamges) {
    oldImages = newInamges;
  }

  selectAllWeek() {
    this.wholeWeek === false ? this.vaildTime.map((item, index) => {
      item.checked = true;
    }) : this.vaildTime.map((item, index) => {
      item.checked = false;
    });
  }

  selectThisDay(item) {
    if (item.checked === true) {
      this.operateDate.push(item);
    } else {
      this.operateDate.forEach((value, index) => {
        value.code = item.code ? this.operateDate.splice(index, 1) : "";
      });
    }
  }

  selectAllDay() {
    if (this.allDay === false) {
      this.operateStartTime = "00:00";
      this.operateEndTime = "24:00";
    } else {
      this.operateStartTime = "";
      this.operateEndTime = "";
    }
  }

  selectThisService(item) {
    if (item.checked === false) {
      this.serviceProvided.push(item);
    } else {
      this.serviceProvided.forEach((value, index) => {
        value.code.toString() === item.code.toString() ? this.serviceProvided.splice(index, 1) : '';
      });
    }
  }

  selectThisPayWay(item) {
    console.log("payWay:", item.code, this.payWayList);
    this.payWay = item.code == 0 ? this.definedPayWay : item.name;
  }

  selectThisRate(item) {
    this.rateWay = item.name;
  }

  selectThisDepositWay(item) {
    this.depositWay = item.code == 0 ? this.definedDepositWay : item.name;
  }

  getRentDate(date) {
    this.rentDate = date;
  }

  selectTransferStatus(item) {
    this.transferStatus = item;
  }

  selectEmptyTransfer(item) {
    this.emptyTransfer = item;
  }

  deleteCertification(item) {
    this.certifications.forEach((value, index) => {
      value.id == item.id ? this.certifications.splice(index, 1) : '';
    });
  }

  addPhoneNumbers() {
    this.phoneList.push("");          //增加输入框个数
  }

  selectSexStatus(item) {
    this.sexSelected = item;
  }

  getbirthTime(date) {
    this.birthdayDate = date;
  }

  addEmployee() {
    var obj = {
      position: '',
      entryDate: '',
      workContent: '',
      leaveDate: '',
      phoneList: [],
      realName: '',
      sex: '',
      birthdayDate: '',
      contactAddress: '',
      email: '',
      qq: '',
      wx: '',
      personInfoDetail: ''
    };
    this.employee.push(obj);
  }

  cityChange(code) {

  }

  districtChange(code) {

  }

  /*适合经营*/
  /*打开行业列表弹出框的时候确定默认选择列表(三个按钮打开同一个行业列表弹出框)*/
  industrySelectedList = [];  //用来记录适合经营，推荐经营和不宜经营点击的是哪一个
  openModel(content, selectedList) {
    this.industrySelectedList = selectedList;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  selectThisIndustry(item) {
    this.industrySelectedList.forEach((v, i) => {
      if (v.code.toString() == item.code.toString()) {
        return;
      } else if (i == (this.industrySelectedList.length - 1) && v.code.toString() != item.code.toString()) {
        this.industrySelectedList.push(item);
      }
    })
    console.log("default:", this.industrySelectedList, this.fitIndustry);
  }

  deleteSelectedIndustry(dataList, item) {
    dataList.forEach((value, index) => {
      value.code == item.code ? dataList.splice(index, 1) : '';
    });
  }

  selectThisFacility(item) {
    this.facilities.forEach((v, i) => {
      console.log("123", item.code, v.code, v.code.toString() === item.code.toString());
      v.code.toString() === item.code.toString() ? this.facilities.splice(i, 1) : i == this.facilities.length ? this.facilities.push(item) : '';
    })
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////
  //开始处理弹出框的值
  ////////////////////////////////////////////////////////////////////////////////////////////////
  /*图片弹出框*/
  tempshopImages = [{id: 1, url: "http://www.baidu.com"}, {id: 2, url: "http://www.baidu.com"}];       //此处复制方式和shopImages一样；
  tempenvironment = [{id: 3, url: "http://www.baidu.com"}];
  jsonShopImages = {tempshopImages: this.tempshopImages, tempenvironment: this.tempenvironment};


  /*店铺租金弹出框*/
  tempshopRent = '';
  temprentMeasure = 1;
  temprateWay = '';
  tempdefinedRateWay = '';
  tempdepositWay = '';
  tempdefinedDepositWay = '';
  temprentDate = '';
  temprentTime = '';
  templeftContractTime = '';
  tempRentContent = {
    tempshopRent: this.tempshopRent,
    temprentMeasure: this.temprentMeasure,
    temprateWay: this.temprateWay,
    tempdefinedRateWay: this.tempdefinedRateWay,
    tempdepositWay: this.tempdepositWay,
    tempdefinedDepositWay: this.tempdefinedDepositWay,
    temprentDate: this.temprentDate,
    temprentTime: this.temprentTime,
    templeftContractTime: this.templeftContractTime
  }


  /*店铺营业状况弹出框*/
  temppersonProfit = '';
  tempdayProfit = '';
  tempconsumePersonType = '';
  tempconsumeTime = '';
  tempfoodAmount = '';
  temptakeOutAmount = '';
  tempmemberAmount = '';
  tempmemberType = '';

  tempOperateStatus = {
    temppersonProfit: this.temppersonProfit,
    tempdayProfit: this.tempdayProfit,
    tempconsumePersonType: this.tempconsumePersonType,
    tempconsumeTime: this.tempconsumeTime,
    tempfoodAmount: this.tempfoodAmount,
    temptakeOutAmount: this.temptakeOutAmount,
    tempmemberAmount: this.tempmemberAmount,
    tempmemberType: this.tempmemberType
  }

  /*转让信息弹出框*/
  temptransferStatus = '';
  temptransferFee = '';
  tempemptyTransfer = '';
  tempemptyTransferFee = '';
  temptransferStaff = '';
  temptransferReason = '';
  tempTransferContent = {
    temptransferStatus: this.temptransferStatus,
    temptransferFee: this.temptransferFee,
    tempemptyTransfer: this.tempemptyTransfer,
    tempemptyTransferFee: this.tempemptyTransferFee,
    temptransferStaff: this.temptransferStaff,
    temptransferReason: this.temptransferReason
  }

  /*行业列表弹出框*/



  ////////////////////////////////////////////////////////////////////////////////////////////////
  //公共函数
  closeResult: string;

  open(content) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.sureBtnFunction(content, result);
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

  sureBtnFunction(content, result) {
    var modalName=Object.keys(content._def.references)[0];
    if (modalName == 'shopImageContent') {
      this.shopImages = this.tempshopImages;
      this.environment = this.tempenvironment;
    }
    if (modalName == 'rentContent') {
      this.shopRent = this.tempshopRent;
      this.rentMeasure = this.temprentMeasure;
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
      this.emptyTransfer = this.tempemptyTransfer,
      this.emptyTransferFee = this.tempemptyTransferFee,
      this.transferStaff = this.temptransferStaff,
      this.transferReason = this.temptransferReason
    }
    if (modalName == 'industryContent') {

    }
    if (modalName == 'certificationEdit') {

    }
    if (modalName == 'personInfo') {

    }

  }

  release(){
    console.log("rentMeasure:",this.rentMeasure);
  }


}
