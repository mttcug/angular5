import {Component, Inject} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  allIndustry = [];

  constructor(private modalService: NgbModal, @Inject('data') private data) {

/*    var tempo=[{code:1,name:"1"},{code:2,name:"2"},{code:3,name:"1"},{code:4,name:"1"},{code:5,name:"3"},{code:6,name:"1"}];
    tempo.forEach((v,j)=>{
      console.log("1:",v.code,j);
      v.name=="1" ? tempo.splice(j,1) : '';
      j--;
    })

    for(let i=0;i<tempo.length;i++){
      var v=tempo[i];
      console.log("1:",v.code,i);
      v.name=="1" ? tempo.splice(i,1) : '';
      i--;
    }*/

    //获取行业列表
    this.data.getIndustryData().then(res => {
      this.industries = res;                      //所有数据[[],[]],用于推荐经营，不宜经营。。。
      res.forEach((value, i) => {
        value.forEach((v, j) => {
          j == 0 ? this.bigIndustryList.push(v) : '';
          this.allIndustry.push(v);
        })
      })
    });

    //获取城市列表
    this.data.getDistrictData().then(res => {
      console.log("res:", res);
    });
  }


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
  // 经营行业
  bigIndustry = '';
  smallIndustry = '';
  industries;
  bigIndustryList = [];
  smallIndustryList = [];
  startOpenDate = '';// 开业日期
  operateStatusList = [
    {code: 1, name: "经营中"}, {code: 2, name: "停业"}, {code: 3, name: "装修"}
  ]; // 经营状态
  operateStatus = 1;
  endOpenDate = ''; // 停业日期
  shopImages = [];// 门面
  multiShops = true;
  environment = [
    {id: 123, url: "./app/public/images/1.png"},
    {id: 123, url: "./app/public/images/2.jpg"}
  ]; // 环境
  multiEnvironment = true;
  shopPhoneNumber = '';  // 前台电话
  takeOutPhone = '';  // 外卖电话
  wholeWeek = false;  // 营业时间
  vaildTime = this.data.getWeekData();  //星期列表
  operateDate = [];
  allDay = false;
  operateStartTime = '';
  operateEndTime = '';
  fitmentLevelStatus = '';  // 装修档次
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
  serviceProvided = [];  // 提供服务
  serviceList = this.data.getServiceList();
  shopRent = '';  // 店铺租金
  rentMeasure = 1;
  rentMeasureList = [{code: 1, name: "元/月"}, {code: 2, name: "万元/月"}, {code: 3, name: "千元/月"}];
  payWayList = this.data.getPayWayList()  // 支付方式&&编辑更多支付方式
  payWay = '';
  definedPayWay = '';
  rateWay = '';  // 递增或递减
  definedRateWay = '';
  rateChoice = [
    {code: 1, name: "递增"},
    {code: 2, name: "递减"}
  ];
  depositWay = '';  // 押金
  definedDepositWay = '';
  deposit = this.data.getDepositList();
  rentDate = '';           //租期
  rentTime = '';           //租约
  leftContractTime = '';  //剩余合同期
  personProfit = '';  //客单价
  dayProfit = '';       //日均营业额
  consumePersonType = '';  //消费人群
  consumeTime = '';    //消费时间
  foodAmount = '';    //堂食量
  takeOutAmount = '';  //外卖量
  memberAmount = ''; //会员数
  memberType = '';  //会员类型
  transferStatus = ''          //转让状态
  transferStatusList = [
    {code: 1, name: "不转让"},
    {code: 2, name: "转让中"},
    {code: 3, name: "转让成功"},
    {code: 4, name: "租约到期"}
  ];
  transferFee = '';              //转让费
  isNegotiable = false;
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
    {
      certificationType: 1,
      name: "营业执照",
      headImage: '',
      backImage: '',
      otherImages: [],
      certificationNumber: '',
      themeName: '',
      address: '',
      permissionScope: '',
      otherContent: ''
    },
    {
      certificationType: 2,
      name: "店铺图片",
      headImage: '',
      backImage: '',
      otherImages: [],
      certificationNumber: '',
      themeName: '',
      address: '',
      permissionScope: '',
      otherContent: ''
    },
    {
      certificationType: 3,
      name: "身份证件",
      headImage: '',
      backImage: '',
      otherImages: [],
      certificationNumber: '',
      themeName: '',
      address: '',
      permissionScope: '',
      otherContent: ''
    }
  ];
  /*店铺证件弹出框*/
  selectedCertificationType = 4;
  writeCertificationType = '';           //证件类型
  certificationsTypeList = [
    {id: 1, name: "营业执照"},
    {id: 2, name: "店铺图片"},
    {id: 3, name: "身份证件"},
    {id: 4, name: "其他"}
  ];
  headIsMulti = false;            //是否多张
  backIsMulti = false;
  otherIsMulti = true;
  headImage = '';
  backImage = '';
  headImageA = [];            //正面图片
  backImageA = [];            //反面图片
  otherImages = [];            //其他图片

  certificationNumber = '';     //证件名称
  themeName = '';               //主题名称
  address = '';                 //地址
  permissionScope = '';         //许可范围
  otherContent = '';            //其他内容

  /*店铺老板 && 个人信息弹出框*/
  shopBoss = {
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
  phoneList = [""];
  name = '';                       //名称
  realName = ''                   //真实名字
  /*性别*/
  sexType = [
    {code: 1, name: "男"},
    {code: 2, name: "女"},
    {code: 3, name: "其他"}
  ];
  sex = '';            //性别
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
      phoneList: ['18971154515'],
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
      phoneList: [''],
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


  /*店铺员工*/
  entryTimePlaceHolder = '入职时间';
  leaveTimePlaceHolder = '离职时间';
  isDission = false;
  employee = [{
    position: '', entryDate: '', workContent: '', leaveDate: '', isDission: false,
    name: "里欧1",
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
  facilities = [];             //物业配套
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
  houseOwner = {
    name: "里欧1",
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


  updateShopName() {
    console.log("ooo", this.subShopName);
    this.shopName = this.subShopName == '' ? this.brandName : this.brandName + "(" + this.subShopName + ")";
    console.log("shopName:", this.shopName);
  }

  loadSmallIndustry(code) {
    this.allIndustry.forEach((v, i) => {
      code.toString().trim() === v.code.toString().substr(0, 2).trim() ? this.smallIndustryList.push(v) : '';
    })
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
      personInfoDetail: ''
    };
    this.partner.push(obj);
  }

  addCertificationImages(imageUrl, newInamges) {
    imageUrl = newInamges[0].url;
  }

  selectAllWeek() {
    if (this.wholeWeek === false) {
      this.vaildTime.map((item, index) => {
        item.checked = true;
      });
      this.vaildTime.forEach((v, i) => {
        this.operateDate.push(v)
      });
    } else {
      this.vaildTime.map((item, index) => {
        item.checked = false;
      });
      this.operateDate = [];
    }
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

  payWayCode = '';

  selectThisPayWay(item) {
    this.payWayCode = item.code;
    this.payWay = item.code == 0 ? this.definedPayWay : item.name;
  }

  tempPayWayCode = '';

  selectThisPopUpPayWay(item) {
    this.tempPayWayCode = item.code;
    this.temppayWay = item.code == 0 ? this.tempdefinedPayWay : item.name;
  }

  definedPayChange() {
    if (this.payWayCode.toString() == '0') {
      this.payWay = this.definedPayWay;
    }
  }

  definedPopUpPayChange() {
    if (this.tempPayWayCode.toString() == '0') {
      this.temppayWay = this.tempdefinedPayWay;
    }
  }

  selectThisRate(item) {
    this.rateWay = item.name;
  }

  depositWayCode;

  selectThisDepositWay(item) {
    this.depositWayCode = item.code;
    this.tempdepositWay = item.code == 0 ? this.tempdefinedDepositWay : item.name;
  }

  definedDepositChange() {
    this.tempdepositWay = this.depositWayCode.toString() == '0' ? this.tempdefinedDepositWay : this.tempdepositWay;
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
      value.certificationType == item.id ? this.certifications.splice(index, 1) : '';
    });
  }

  addPhoneNumbers() {
    this.phoneList.push("");          //增加输入框个数
  }

  selectSexStatus(item) {
    this.sex = item;
  }

  getbirthTime(date) {
    this.birthdayDate = date;
  }

  addEmployee() {
    var obj = {
      position: '', entryDate: '', workContent: '', leaveDate: '', isDission: false,
      name: "里欧1",
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
    this.employee.push(obj);
  }

  getEntryDate(date) {

  }

  getLeaveDate(date) {

  }

  cityChange(code) {

  }

  districtChange(code) {

  }

  closeResult: string;
  open(content) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.sureBtnFunction(content, result);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openRentModal(content) {
    this.tempshopRent = this.shopRent;
    this.temprentMeasure = this.rentMeasure;
    this.temppayWay = this.payWay;
    this.tempPayWayCode = this.payWayCode;
    this.tempdefinedPayWay = this.definedPayWay;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.sureBtnFunction(content, result);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  defaultCertification;
  openShopCertificationModal(content, item) {
    this.defaultCertification = item;
    this.selectedCertificationType = item.certificationType;
    this.writeCertificationType = '';           //证件类型

    this.headImageA.push(item.headImage);            //正面图片
    this.backImageA.push(item.backImage);            //反面图片
    this.otherImages = item.otherImages;            //其他图片

    this.certificationNumber = item.certificationNumber;     //证件名称
    this.themeName = item.themeName;               //主题名称
    this.address = item.address;                 //地址
    this.permissionScope = item.permissionScope;         //许可范围
    this.otherContent = item.otherContent;            //其他内容
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.sureBtnFunction(content, result);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  defaultPerson;
  openPersonalInfo(content, item) {
    this.defaultPerson = item;
    this.phoneList = [];
    item.phoneList.forEach((v, i) => {
      this.phoneList.push(v);
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


    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.sureBtnFunction(content, result);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  defaultIndustryList = [];
  tempdefaultIndustryList;
  openIndustryModel(content, selectedList) {
    this.defaultIndustryList = selectedList;

    this.tempdefaultIndustryList=[];
    selectedList.forEach((v, i) => {
      this.tempdefaultIndustryList.push(v)
    });

    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.sureBtnFunction(content, result);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  selectThisIndustry(item) {
    var tempIndexArr=[];
    for (let i = 0; i < this.tempdefaultIndustryList.length; i++) {                //for和forEach 使用return的区别
      var v = this.tempdefaultIndustryList[i];

      if (v.code.toString() != item.code.toString()) {
        //不同的情况分为两种，1,完全不同和部分不同
        if(v.code.toString().length!=item.code.toString().length && v.code.toString().substr(0,2) == item.code.toString().substr(0,2)){
            tempIndexArr.push(i);
        }else if(i == (this.tempdefaultIndustryList.length - 1)){
          this.tempdefaultIndustryList.push(item);
        }
      } else {
          return;
      }

    }
    for(let i=0;i<tempIndexArr.length;i++){
      console.log("个数：",tempIndexArr.length,i);
      var v=tempIndexArr[i];
      this.tempdefaultIndustryList.splice(v,1);
      for(let j=0;j<tempIndexArr.length;j++){
        tempIndexArr[j]=tempIndexArr[j]-1;
      }
    }
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
  temppayWay = '';
  tempdefinedPayWay = '';
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
  tempisNegotiable = false;
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
  tempfitIndustry = [];
  temprecommendableIndustry = [];
  tempunRecommendableIndustry = [];


  ////////////////////////////////////////////////////////////////////////////////////////////////
  //公共函数


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
    var modalName = Object.keys(content._def.references)[0];
    if (modalName == 'shopImageContent') {
      this.shopImages = this.tempshopImages;
      this.environment = this.tempenvironment;
    }
    if (modalName == 'rentContent') {
      this.shopRent = this.tempshopRent;
      this.rentMeasure = this.temprentMeasure;
      this.payWay = this.temppayWay;
      this.payWayCode = this.tempPayWayCode;
      this.definedPayWay = this.tempdefinedPayWay;
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
        this.defaultIndustryList.push(v)
      });
    }
    if (modalName == 'certificationEdit') {
      console.log("certificationEdit:", this.defaultCertification, typeof(this.defaultCertification));
      this.defaultCertification.certificationType = this.selectedCertificationType;         //证件类型
      this.defaultCertification.name = this.certificationsTypeList.find(item => item.id == this.selectedCertificationType).name;
      this.defaultCertification.headImage = this.headImageA[0].url;
      this.defaultCertification.backImage = this.backImageA[0].url;
      this.defaultCertification.otherImages = this.otherImages;

      this.defaultCertification.certificationNumber = this.certificationNumber;
      this.defaultCertification.themeName = this.themeName;
      this.defaultCertification.address = this.address;
      this.defaultCertification.permissionScope = this.permissionScope;
      this.defaultCertification.otherContent = this.otherContent;

    }
    if (modalName == 'personInfo') {
      this.defaultPerson.phoneList = this.phoneList;
      this.defaultPerson.phoneList = this.phoneList;
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

  release() {
    var params = {
      shopName: this.shopName,                           //店名
      brandName: this.brandName,                         //品牌名称
      subShopName: this.subShopName,                      //分店名
      operateType: this.operateType,                      //运营模式
      bigIndustry: this.bigIndustry,
      smallIndustry: this.smallIndustry,
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
      fitIndustry: this.fitIndustry,                        //适合经营
      recommendableIndustry: this.recommendableIndustry,    //推荐经营
      unRecommendableIndustry: this.unRecommendableIndustry, //不宜经营
      facilities: this.facilities,                           //物业配套
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
  }


}
