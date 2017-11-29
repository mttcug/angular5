import {Component, OnInit, Inject, Injectable} from '@angular/core';
import {ActivatedRoute, Params ,Router, NavigationEnd} from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  curPage = '';

  constructor(@Inject('config') private conf, private router: Router,@Inject('CurrentPageService') private CurrentPageService,  private activatedRoute :ActivatedRoute) {

    this.curPage = this.CurrentPageService.getCurPage();

    //监听路由变化
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .subscribe((event) => {
        console.log('路由变化:');
        this.colorChange();
      });
  }

  ngOnInit() {}




  //被点击的tab被标记（颜色标记）
  colorChange() {
    this.curPage = this.CurrentPageService.getCurPage();
  }

  //qq联系跳转页面
  qqContact(){
    window.open('tencent://message/?uin=252218982&Site=pupuwang.com&Menu=yes', '_blank', 'height=502, width=644,toolbar=no,scrollbars=no,menubar=no,status=no');
  }


}
