import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-collect-complete',
  templateUrl: './collect-complete.component.html',
  styleUrls: ['./collect-complete.component.css']
})
export class CollectCompleteComponent implements OnInit {

  constructor( private router: Router, private route: ActivatedRoute, ) { }

  shopInfo;
  ngOnInit() {
    //获取参数并判断时发布还是修改信息，修改则请求相应数据
    this.route.queryParams.subscribe((queryParams: Params) => {
      var params = queryParams.shop_info;
      this.shopInfo=JSON.parse(params);
      console.log("shopInfo:",JSON.parse(params));
    });
  }

}
