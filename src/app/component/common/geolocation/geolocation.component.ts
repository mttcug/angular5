import {Component,OnInit, Input,Output,EventEmitter,OnDestroy,ElementRef,OnChanges,SimpleChanges} from '@angular/core';


import {loader} from './loader';

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
    loader(this.apiKey, this.geoLocation.bind(this));
  }


  geoLocation() {

    var that=this;

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
      that.getLocation.emit(r);
    },{enableHighAccuracy: true});
  }

}
