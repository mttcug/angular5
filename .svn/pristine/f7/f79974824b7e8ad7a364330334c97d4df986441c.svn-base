import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  curPage = '';

  constructor() {
    this.curPage = window.location.href.split("/")[3] ? window.location.href.split("/")[3] : '';
  }

  ngOnInit() {
  }


  colorChange() {
    this.curPage = window.location.href.split("/")[3] ? window.location.href.split("/")[3] : '';
  }

  qqContact(){
    window.open('tencent://message/?uin=252218982&Site=pupuwang.com&Menu=yes', '_blank', 'height=502, width=644,toolbar=no,scrollbars=no,menubar=no,status=no');
  }


}
