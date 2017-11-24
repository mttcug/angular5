import {Component, OnInit, Inject} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  allDistricts = [];
  cityList = [];


  constructor(private modalService: NgbModal, @Inject('data') private data) {
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


  ngOnInit() {
  }


  currentCity: string = JSON.parse(sessionStorage.getItem("curCity")).name;


  //切换城市弹出框内城市列表点击事件
  cityItemClick(item) {
    this.currentCity = item;
    sessionStorage.setItem("curCity", JSON.stringify(this.currentCity));
    this.selectedColorChange(item.name);
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
