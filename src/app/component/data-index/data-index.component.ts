import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-index',
  templateUrl: './data-index.component.html',
  styleUrls: ['./data-index.component.css']
})
export class DataIndexComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigateRelease() {
    this.router.navigate(['dataCollection','undefined']);  //多参数this.router.navigate(["comment",{id:this.blog.id,title:this.blog.title}],{relativeTo:this.aRoute})
  }

}
