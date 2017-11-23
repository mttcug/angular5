import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  curPage = '';
  keyIndex=3;//从url中截取路由字段

  constructor() {
    this.curPage = window.location.href.split("/")[this.keyIndex] ? window.location.href.split("/")[this.keyIndex] : '';
  }

  ngOnInit() {}


  //被点击的tab被标记（颜色标记）
  colorChange() {
    this.curPage = window.location.href.split("/")[this.keyIndex] ? window.location.href.split("/")[this.keyIndex] : '';
  }

  //qq联系跳转页面
  qqContact(){
    window.open('tencent://message/?uin=252218982&Site=pupuwang.com&Menu=yes', '_blank', 'height=502, width=644,toolbar=no,scrollbars=no,menubar=no,status=no');
  }


}
