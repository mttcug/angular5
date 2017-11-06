import { Component, OnInit } from '@angular/core';

import { ControlAnchor, MapOptions, NavigationControlOptions, NavigationControlType, Point } from 'angular2-baidu-map';


@Component({
  selector: 'app-baidu-map',
  templateUrl: './baidu-map.component.html',
  styleUrls: ['./baidu-map.component.css']
})
export class BaiduMapComponent implements OnInit {


  options: MapOptions;
  point: Point;
  navOptions: NavigationControlOptions;

  constructor() {
    this.options = {
      centerAndZoom: {
        lat: 39.920116,
        lng: 116.403703,
        zoom: 16
      },
      enableKeyboard: true
    };

    this.point = {
      lat: 39.920109,
      lng: 116.403705
    };

    this.navOptions = {
      anchor: ControlAnchor.BMAP_ANCHOR_TOP_RIGHT,
      type: NavigationControlType.BMAP_NAVIGATION_CONTROL_PAN
    };
  }

  ngOnInit() {
  }

}
