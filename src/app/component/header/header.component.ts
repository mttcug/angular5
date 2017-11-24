import {Component, OnInit, Inject,ChangeDetectorRef} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  allDistricts = [];
  cityList = [];


  constructor(private modalService: NgbModal, @Inject('data') private data,private cd: ChangeDetectorRef) {

    console.log("headerComponent");
    //获取城市列表
    let district = sessionStorage.getItem("district");
    if (district) {
      JSON.parse(district).forEach((v, i) => {
        this.allDistricts.push(v);
        v.id.toString().substr(-6) == '000000' ? this.cityList.push(v) : '';
      });
    } else {
      this.data.getDistrictData().then(res => {
        var result = res ? res : [];
        result.forEach((v, i) => {
          this.allDistricts.push(v);
          v.id.toString().substr(-6) == '000000' ? this.cityList.push(v) : '';
        });
      });
    }

  }


  ngOnInit() {//暂时不用百度地图定位，暂时默认为深圳
    var item= this.allDistricts.find(item => item.name == '深圳市');
    sessionStorage.setItem("curCity", JSON.stringify(item));
    this.selectedColorChange(this.currentCity);
  }


  currentCity: string = sessionStorage.getItem("curCity") ? JSON.parse(sessionStorage.getItem("curCity")).name : '';


  //通过定位获取当前城市并缓存 对应不上配置城市默认深圳
  getCurrentCity(e) {
   /* var aim = this.allDistricts.find(item => item.name == e.address.city);
    aim ? '' : aim = this.allDistricts.find(item => item.name == '深圳市');
    sessionStorage.setItem("curCity", JSON.stringify(aim));
    this.currentCity == '' ? this.currentCity=aim.name : '';
    this.cd.markForCheck();
    console.log("aim.name:",aim.name);
    this.selectedColorChange(this.currentCity);*/
  }




  //切换城市弹出框内城市列表点击事件
  cityItemClick(item) {
    this.currentCity = item.name;
    sessionStorage.setItem("curCity", JSON.stringify(item));
    this.selectedColorChange(item.name);
    window.location.href=window.location.href;
  }


  //切换城市弹出框标记被选中的城市
  selectedColorChange(selectedCity) {
    this.cityList.forEach((v, i) => {
      v.selected = v.name.toString() == selectedCity.toString() ? true : false;
    })
  }


  closeResult: string;

  //点击切换城市按钮弹出城市列表弹出框
  openCityListModal(content) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.cityItemClick(result);
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
