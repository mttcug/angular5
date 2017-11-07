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

  getStartTime(date) {
    this.startOpenDate = date;
    console.log("startOpenDate:", this.startOpenDate);
  }

  /*经营状态*/
  operateStatusList = [
    {code: 1, name: "营业中"}, {code: 2, name: "未营业"}, {code: 3, name: "已停业"}
  ];
  operateStatus = 1;

  /*停业日期*/
  endOpenDate = '';

  getEndTime(date) {
    this.endOpenDate = date;
  }


  /*店铺图片*/

  closeResult: string;

  open(content) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log("弹出框结果：",result);
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

  /*门面*/
  shopImages = [];
  multiShops = true;
  /*环境*/
  images = [
    {id: "123", url: "./app/public/images/1.png"},
    {id: "123", url: "./app/public/images/2.jpg"}
  ];
  multiEnvironment = true;

  addImages(newInamges) {
    console.log("newInamges:", newInamges);
  }

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

  selectedWeek = [];

  selectAllWeek() {
    this.wholeWeek === false ? this.vaildTime.map((item, index) => {
      item.checked = true;
    }) : this.vaildTime.map((item, index) => {
      item.checked = false;
    });
  }

  selectThisDay(item) {
    if (item.checked === true) {
      this.selectedWeek.push(item);
    } else {
      this.selectedWeek.forEach((value, index) => {
        value.code = item.code ? this.selectedWeek.splice(index, 1) : "";
      });
    }
  }

  allDay = false;
  startTime = '';
  endTime = '';

  selectAllDay() {
    if (this.allDay === false) {
      this.startTime = "00:00";
      this.endTime = "24:00";
    } else {
      this.startTime = "";
      this.endTime = "";
    }
  }








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
  serviceSelected = [];
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

  selectThisService(item) {
    if (item.checked === false) {
      this.serviceSelected.push(item);
    } else {
      this.serviceSelected.forEach((value, index) => {
        value.code.toString() === item.code.toString() ? this.serviceSelected.splice(index, 1) : '';
      });
    }
  }

  /*店铺租金*/
  rent = '';
  rentMeasure = 1;
  rentMeasureList = [{code:1,name:"元/月"},{code:2,name:"万元/月"},{code:3,name:"千元/月"}];


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
  definedPayWay=''

  selectThisPayWay(item) {
    console.log("payWay:", item.code, this.payWayList);
    this.payWay = item.code == 0 ? this.definedPayWay :  item.name;
  }
  rateWay = '';
  definedRateWay = '';
  rateChoice= [
    {code: 1, name: "递增"},
    {code: 2, name: "两月租金"}
  ];

  selectThisRate(item){
    this.rateWay = item.name;
  }

  depositWay = '';
  definedDepositWay = '';
  deposit= [
    {code: 1, name: "一月租金"},
    {code: 2, name: "两月租金"},
    {code: 3, name: "三月租金"},
    {code: 4, name: "四月租金"},
    {code: 5, name: "五月租金"},
    {code: 6, name: "六月租金"},
    {code: 0, name: "自定义"}
  ];
  selectThisDepositWay(item){
    this.depositWay = item.code == 0 ? this.definedDepositWay :  item.name;
  }

  rentDate='';           //租期
  getRentDate(date){
    this.rentDate=date;
  }
  rentTime='';           //租约
  leftContractTime='';  //剩余合同期

  /*客单价*/
  personProfit='';  //客单价

  /*日均营业额*/
  dayProfit='';       //日均营业额

  consumePersonType='';  //消费人群

  consumeTime='';    //消费时间

  foodAmount='';    //堂食量

  takeOutAmount='';  //外卖量

  memberAmount=''; //会员数

  memberType='';  //会员类型



  /*转让状态*/
  transferStatus=''          //转让状态
  transferStatusList = [
    {code: 1, name: "不转让"},
    {code: 2, name: "转让中"},
    {code: 3, name: "转让成功"},
    {code: 4, name: "租约到期"}
  ]

  selectTransferStatus(item) {
    this.transferStatus=item;
    console.log("1");
  }

  /*转让费*/
  transferFee='';              //转让费

  /*可否空转*/
  emptyTransfer='';           //可否空转
  emptyTransferList = [
    {code: 1, name: "可空转"},
    {code: 2, name: "不可空转"}
  ];

  selectEmptyTransfer(item) {
    this.emptyTransfer=item;
    console.log("2");
  }
  emptyTransferFee='';          //空转转让费

  /*店铺证件*/
  certifications = [
    {id: 1, name: "营业执照"},
    {id: 2, name: "店铺图片"},
    {id: 3, name: "身份证件"}
  ];

  deleteCertification(item) {
    this.certifications.forEach((value, index) => {
      value.id == item.id ? this.certifications.splice(index, 1) : '';
    });
  }

  /*店铺证件弹出框*/
  headImage = [];
  backImage = [];
  otherImages = [];

  /*店铺老板*/
  shopOwner = "战三";

  /*合伙人*/
  partner = "里欧";
  partnerPhone = "18977765655";

  /*店铺员工*/
  employees = [{
    position: ''
  }];
  personClass = {
    position: ''
  }

  addEmployee() {
  }


  /*行业列表弹出框*/
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


  /*适合经营*/
  fitIndustryList = [
    {code: 1, name: "餐馆1"},
    {code: 2, name: "娱乐1"},
    {code: 3, name: "养生1"},
    {code: 4, name: "美妆1"}
  ];

  selectThisIndustry(item) {
    this.industrySelectedList.forEach((v, i) => {
      if (v.code.toString() == item.code.toString()) {
        return;
      } else if (i == (this.industrySelectedList.length - 1) && v.code.toString() != item.code.toString()) {
        this.industrySelectedList.push(item);
      }
    })
    console.log("default:", this.industrySelectedList, this.fitIndustryList);
  }

  deleteSelectedIndustry(dataList, item) {
    dataList.forEach((value, index) => {
      value.code == item.code ? dataList.splice(index, 1) : '';
    });
  }

  /*推荐经营的行业*/
  recommendableIndustryList = [
    {code: 1, name: "餐馆2"},
    {code: 2, name: "娱乐2"},
    {code: 3, name: "养生2"},
    {code: 4, name: "美妆2"}
  ];

  /*不推荐经营的行业*/
  unRecommendableIndustryList = [
    {code: 1, name: "餐馆3"},
    {code: 2, name: "娱乐3"},
    {code: 3, name: "养生3"},
    {code: 4, name: "美妆3"}
  ];

  /*物业配套*/
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

  /*个人信息弹出框*/
  phoneList = [""];

  addPhoneNumbers() {
    this.phoneList.push("");          //增加输入框个数
  }

  sexType = [
    {code: 1, name: "男"},
    {code: 2, name: "女"},
    {code: 3, name: "其他"}
  ];
  sexSelected = '';

  selectSexStatus(item) {
    this.sexSelected = item;
    console.log("已选性别：", this.sexSelected);
  }




  /*弹出框问题*/

  /*弹出框--店铺图片*///////////////////////////////////////////////////////////////////////////////




  /*弹出框--更多租金*///////////////////////////////////////////////////////////////////////////
  /*是否递增*/





}
