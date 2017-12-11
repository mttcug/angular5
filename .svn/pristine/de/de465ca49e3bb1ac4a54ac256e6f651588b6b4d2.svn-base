import {Component,OnInit, Input,Output,EventEmitter,OnDestroy,ElementRef,OnChanges,SimpleChanges} from '@angular/core';


/*import {loader} from './loader';*/

declare const BMap: any;

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css']
})
export class GeolocationComponent implements OnInit {

  @Input() apiKey: string = 'sIq3pmhG5n4xVuKQ8eKr1BiV0hsLP2ek';

  @Output() getLocation: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.loader(this.apiKey, this.geoLocation.bind(this));
  }


  geoLocation() {

    var that=this;

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
      that.getLocation.emit(r);
    },{enableHighAccuracy: true});
  }

  loader(ak: string, callback: Function) {
    const MAP_URL = `https://api.map.baidu.com/api?v=2.0&ak=${ak}&callback=baidumapinit&s=1`;

    const baiduMap: MapObjct = window['baiduMap'];
    if (baiduMap && baiduMap.status === MapStatus.LOADING) {
      return baiduMap.callbacks.push(callback);
    }

    if (baiduMap && baiduMap.status === MapStatus.LOADED) {
      return callback();
    }

    window['baiduMap'] = {status: MapStatus.LOADING, callbacks: []};
    window['baidumapinit'] = function () {
      window['baiduMap'].status = MapStatus.LOADED;
      callback();
      window['baiduMap'].callbacks.forEach((cb: Function) => cb());
      window['baiduMap'].callbacks = [];
    };

    const createTag = function () {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = MAP_URL;
      document.body.appendChild(script);
    };
    createTag();
  }
}

export enum MapStatus {
  LOADING,
  LOADED,
}

export interface MapObjct {
  status: MapStatus;
  callbacks: Function[];
}
