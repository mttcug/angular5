import {Component,OnInit, Input,Output,EventEmitter,OnDestroy,ElementRef,OnChanges,SimpleChanges} from '@angular/core';


import {loader} from './loader';

declare const BMap: any;

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css']
})
export class GeolocationComponent implements OnInit {

  @Input() address: string;
  @Input() apiKey: string = 'sIq3pmhG5n4xVuKQ8eKr1BiV0hsLP2ek';
  @Input() center: any;
  @Input() zoom = 15;

  @Output() getLocation: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    loader(this.apiKey, this.initMap.bind(this));
  }


  data = {
    point: '',
    address: ''
  };


  initMap() {
    var that = this;
    const container = this.elementRef.nativeElement.querySelector('.baidu-geomap-container');
    const map = new BMap.Map(container);

    //添加比列尺
    map.addControl(new BMap.ScaleControl({offset: new BMap.Size(100, 20)}));

    //地址解析
    var myGeo = new BMap.Geocoder();
    myGeo.getPoint(this.address, function (point) {
      if (point) {
        map.centerAndZoom(point, that.zoom);
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
  }

}
