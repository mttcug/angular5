import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';

import { ControlAnchor, MapOptions, NavigationControlOptions, NavigationControlType, Point ,MarkerOptions } from 'angular2-baidu-map';


@Component({
  selector: 'app-baidu-map',
  templateUrl: './baidu-map.component.html',
  styleUrls: ['./baidu-map.component.css']
})
export class BaiduMapComponent implements OnInit {


  options: MapOptions;
  point: Point;
  navOptions: NavigationControlOptions;
  public markers: Array<{ point: Point; options?: MarkerOptions }>;

  @Input() info={'city':'','district':'','address':'','lng':'','lat':''};

  @Output() addressData=new EventEmitter();

  constructor() {

 /*   require(['http://api.map.baidu.com/getscript?v=2.0&ak=sIq3pmhG5n4xVuKQ8eKr1BiV0hsLP2ek'], function () {

    })*/

    this.options = {
      currentCity:"深圳",
      centerAndZoom: {
        lat: 39.920116,
        lng: 116.403703,
        zoom: 16
      },
      enableKeyboard: true
    };

    this.markers=[
      {
        point: {
        lat: 31.244604,
        lng: 121.51606
      }
      },
      {
        point: {
          lat: 31.246124,
          lng: 121.51232
        }
      }
    ];

    this.point = {
      lat: 39.920109,
      lng: 116.403705
    };

    this.navOptions = {
      anchor: ControlAnchor.BMAP_ANCHOR_TOP_RIGHT,
      type: NavigationControlType.BMAP_NAVIGATION_CONTROL_PAN
    };
  }

  mapClick(e:any){
    console.log("地图：",e);
    this.markers[0].point.lat=e.point.lat;
    this.markers[0].point.lng=e.point.lng;
    this.addressData.emit(e.point.lat);
  }

  ngOnInit() {
  }

}
