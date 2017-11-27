import {Component, OnInit, Inject, Injectable} from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  curPage = '';

  constructor(@Inject('config') private conf,@Inject('CurrentPageService') private CurrentPageService) {
    this.curPage = this.CurrentPageService.getCurPage();
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
