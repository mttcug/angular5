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
    //初始化城市列表弹出框选中的标为红色


  }


  currentCity = '深圳';

  getCurrentCity(e) {
    this.currentCity = e.address.city;
    console.log("e:",this.currentCity);
  }


  tempCurrentCity: string;

  cityItemClick(item) {
    this.tempCurrentCity = item.name;
    this.selectedColorChange(item.name);
  }


  selectedColorChange(selectedCity) {
    this.cityList.forEach((v, i) => {
      v.selected = v.name.toString() == selectedCity.toString() ? true : false;
    })
  }


  closeResult: string;

  openCityListModal(content) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      result == '1' ? this.currentCity = this.tempCurrentCity : '';
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
