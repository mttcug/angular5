import {Component, Inject} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private modalService: NgbModal, @Inject('data') private data) {

  }

  getWindowHeight() {
    return window.innerHeight;
  }

  getSideNavHeight() {
    return this.getWindowHeight() - 100;
  }


}
