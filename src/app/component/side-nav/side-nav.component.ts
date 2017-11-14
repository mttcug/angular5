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


  colorChange(tabName) {
    this.curPage = window.location.href.split("/")[3] ? window.location.href.split("/")[3] : '';
    this.curPage = tabName;
  }

}
