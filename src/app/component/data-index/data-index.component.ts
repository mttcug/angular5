import {Component, OnInit, Inject} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-data-index',
  templateUrl: './data-index.component.html',
  styleUrls: ['./data-index.component.css']
})
export class DataIndexComponent implements OnInit {

  shopCount='';
  bossCount='';
  currentCity='';

  constructor(private router: Router, @Inject('HomePageService') private HomePageService,@Inject('CurrentCityService') private CurrentCityService) {

    //获取店铺数据
    this.HomePageService.getShopCount().then(res => {
      this.shopCount=res;
    });

    //获取老板数据
    this.HomePageService.getBossCount().then(res => {
      this.bossCount=res;
    });
  }

  ngOnInit() {
    this.currentCity=this.CurrentCityService.getCurCity().name;
  }


  //跳转到添加信息页面
  navigateRelease() {
    // rest方式     this.router.navigate(['dataCollection', '1']);  //多参数this.router.navigate(["comment",{id:this.blog.id,title:this.blog.title}],{relativeTo:this.aRoute})
    this.router.navigate(['dataCollection'],{queryParams: {id:''}});
  }

}
