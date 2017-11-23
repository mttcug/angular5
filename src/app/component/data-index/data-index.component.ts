import {Component, OnInit, Inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-data-index',
  templateUrl: './data-index.component.html',
  styleUrls: ['./data-index.component.css']
})
export class DataIndexComponent implements OnInit {

  data = [];

  constructor(private router: Router, @Inject('operate') private operate) {
  }

  ngOnInit() {
    //获取数据
    this.operate.getDataCountInfo().then(res => {
      console.log("数据数量结果：",res);
    });
  }


  //跳转到添加信息页面
  navigateRelease() {
    this.router.navigate(['dataCollection', 'undefined']);  //多参数this.router.navigate(["comment",{id:this.blog.id,title:this.blog.title}],{relativeTo:this.aRoute})
  }

}
