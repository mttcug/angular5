import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('cityListModal') cityListModal: ModalDirective;


  allDistricts = [];
  cityList = [];

  currentCity: string ='';


  constructor( @Inject('data') private data,@Inject('config') private conf,@Inject('CurrentPageService') private CurrentPageService,@Inject('CurrentCityService') private CurrentCityService) {

    //获取城市列表
    let district = sessionStorage.getItem("district");
    if (district && district!='undefined') {
      JSON.parse(district).forEach((v, i) => {
        this.allDistricts.push(v);
        v.id.toString().substr(-6) == '000000' ? this.cityList.push(v) : '';
      });
    } else {
      this.data.getDistrictData()
        .map((res: Response) => res.json())
        .subscribe(res => {

        var result = res ? res.result : [];
        result.forEach((v, i) => {
          this.allDistricts.push(v);
          v.id.toString().substr(-6) == '000000' ? this.cityList.push(v) : '';
        });
      },error=>{console.log("district error:",error)}
    );
    }
  }


  ngOnInit() {//暂时不用百度地图定位，暂时默认为深圳
    this.currentCity=this.CurrentCityService.getCurCity().name;
    this.selectedColorChange(this.currentCity);
  }


  //通过定位获取当前城市并缓存 对应不上配置城市默认深圳
  getCurrentCity(e) {}


  //切换城市弹出框内城市列表点击事件
  cityItemClick(item):void {
    this.currentCity = item.name;
    this.CurrentCityService.setCurCity(item);
    this.selectedColorChange(item.name);
    this.cityListModal.hide();                               //等待模态框消失后刷新
    setTimeout(()=>{
      window.location.reload();                              //所有页面缓存的城市都需要刷新
    },500);
  }


  //切换城市弹出框标记被选中的城市
  selectedColorChange(selectedCity): void {
    this.cityList.forEach((v, i) => {
      v.selected = v.name.toString() == selectedCity ? true : false;
    });
  }


}
