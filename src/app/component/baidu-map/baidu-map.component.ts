import {Component, OnInit, Input, Output, EventEmitter, OnDestroy, ElementRef} from '@angular/core';

import {
  ControlAnchor,
  MapOptions,
  NavigationControlOptions,
  NavigationControlType,
  Point,
  MarkerOptions
} from 'angular2-baidu-map';

import {loader} from './loader';
import {BAIDU_MAP_STYLE} from './map';
/*import any = jasmine.any;*/

declare const BMap: any;

@Component({
  selector: 'app-baidu-map',
  templateUrl: './baidu-map.component.html',
  styleUrls: ['./baidu-map.component.css']
})
export class BaiduMapComponent implements OnInit {

  @Input() address: string ;
  @Input() apiKey: string = 'sIq3pmhG5n4xVuKQ8eKr1BiV0hsLP2ek';
  @Input() center: any;
  @Input() zoom = 11;

  @Output() getLocation: EventEmitter<any> = new EventEmitter();

/*  mapObj: any;
  styleJson: any;*/


  constructor(private elementRef: ElementRef) {
  }


  ngOnInit() {
    /*this.styleJson = BAIDU_MAP_STYLE;*/
    loader(this.apiKey, this.initMap.bind(this));
  }

  data={
    point:'',
    address:''
  };

  initMap() {
    var that = this;
    const container = this.elementRef.nativeElement.querySelector('.baidu-map-container');
    const map = new BMap.Map(container);

    //地址解析
    var myGeo = new BMap.Geocoder();
    myGeo.getPoint(this.address, function (point) {
      console.log("addressMap:",that.address);
      if (point) {
        map.centerAndZoom(point, 16);
        map.addOverlay(new BMap.Marker(point));
      } else {
        alert("您选择地址没有解析到结果!");
      }
    });

    map.enableScrollWheelZoom(true);
    /* map.setMapStyle({
       styleJson: this.styleJson,
     });*/

    map.addEventListener("click", (e) => {
      var pt = e.point;
      that.data.point = pt;
      const marker = new BMap.Marker(new BMap.Point(pt.lng, pt.lat));
      map.clearOverlays();
      map.addOverlay(marker);

      //逆地址解析
      myGeo.getLocation(pt, function (rs) {
        var addComp = rs.addressComponents;
        that.data.address = addComp;
        that.getLocation.emit(that.data);
      });



    });


 /*   this.mapObj = map;*/

  }



/*  ngOnDestroy() {
    if (this.mapObj) {
      console.log('destroyed', this.mapObj);
      this.mapObj.clearOverlays();
    }
  }*/






}



