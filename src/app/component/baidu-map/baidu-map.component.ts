import { Component, OnInit , Input, Output, EventEmitter ,OnDestroy ,ElementRef } from '@angular/core';

import { ControlAnchor, MapOptions, NavigationControlOptions, NavigationControlType, Point ,MarkerOptions } from 'angular2-baidu-map';

import { loader } from './loader';
import { BAIDU_MAP_STYLE } from './map';

declare const BMap: any;

@Component({
  selector: 'app-baidu-map',
  templateUrl: './baidu-map.component.html',
  styleUrls: ['./baidu-map.component.css']
})
export class BaiduMapComponent implements OnInit {


/*  options: MapOptions;
  point: Point;
  navOptions: NavigationControlOptions;
    public markers: Array<{ point: Point; options?: MarkerOptions }>;
  @Input() info={'city':'','district':'','address':'','lng':'','lat':''};
  @Output() addressData=new EventEmitter();
  */

  @Input() apiKey: string='sIq3pmhG5n4xVuKQ8eKr1BiV0hsLP2ek';
  @Input() center: any;
  @Input() zoom = 7;

  mapObj: any;
  styleJson: any;
  polylineArrPoints;





  constructor(private elementRef: ElementRef) {




 /*   require(['http://api.map.baidu.com/getscript?v=2.0&ak=sIq3pmhG5n4xVuKQ8eKr1BiV0hsLP2ek'], function () {

    })*/
/*
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
    };*/
  }

/*  mapClick(e:any){
    console.log("地图：",e);
    this.markers[0].point.lat=e.point.lat;
    this.markers[0].point.lng=e.point.lng;
    this.addressData.emit(e.point.lat);
  }*/

  ngOnInit() {

    this.styleJson = BAIDU_MAP_STYLE;
    this.center = {
      lat: 116.404,
      lng: 39.915,
    };
    this.zoom = 11;
    this.polylineArrPoints = polylineArrPoints;
    loader(this.apiKey, this.initMap.bind(this));
  }

  initMap() {
    const container = this.elementRef.nativeElement.querySelector('.baidu-map-container');
    const map = new BMap.Map(container);
    const point = new BMap.Point(this.center.lng, this.center.lat);
    // const marker = new BMap.Marker(point);
    // marker.addEventListener('click', () => {
    //   const opts = {
    //     width: 200,
    //     height: 120,
    //     title: 'baidu map'
    //   };
    //   const msg = 'this is a marker.';
    //   const infoWindow = new BMap.InfoWindow(msg, opts);
    //   map.openInfoWindow(infoWindow, point);
    // });
    map.centerAndZoom(point, this.zoom);
    map.enableScrollWheelZoom(true);
    map.setMapStyle({
      styleJson: this.styleJson,
    });
    this.mapObj = map;
    this.addPolyline(map, this.polylineArrPoints);
  }

  addPolyline(map, polylinePoints) {
    const pointsArr = this.converToBmapPoint(polylinePoints);
    const polyline = new BMap.Polyline(pointsArr, {
      strokeColor: 'blue',
      strokeWeight: 6,
      strokeOpacity: 0.5,
    });
    const midPoint = polylinePoints[Math.ceil(polylinePoints.length / 2)];
    const point = new BMap.Point(midPoint.lng, midPoint.lat);
    polyline.addEventListener('click', () => {
      const opts = {
        width: 200,
        height: 120,
        title: 'baidu map',
      };
      const msg = 'this is a polyline.';
      const infoWindow = new BMap.InfoWindow(msg, opts);
      map.openInfoWindow(infoWindow, point);
    });
    map.addOverlay(polyline);
  }

  ngOnDestroy() {
    if (this.mapObj) {
      console.log('destroyed', this.mapObj);
      this.mapObj.clearOverlays();
    }
  }

  converToBmapPoint(rawPoints) {
    const bMapPoint = [];
    rawPoints.forEach(element => {
      const point = new BMap.Point(element.lng, element.lat);
      bMapPoint.push(point);
    });
    return bMapPoint;
  }
}

const polylineArrPoints = [
  { lat: 37.12, lng: 119.49 },
  { lat: 37.1, lng: 119.5 },
  { lat: 37.1, lng: 119.48 },
  { lat: 37.08, lng: 119.48 },
  { lat: 37.07, lng: 119.47 },
  { lat: 37.05, lng: 119.47 },
  { lat: 37.0, lng: 119.47 },
  { lat: 36.93, lng: 119.42 }
];

