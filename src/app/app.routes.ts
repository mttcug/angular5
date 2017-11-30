import {Routes, RouterModule} from '@angular/router';
import {DataIndexComponent} from './component/data-index/data-index.component';
import {DataCollectionComponent} from './component/data-collection/data-collection.component';
import {ShopHallComponent} from './component/shop-hall/shop-hall.component';
import {WorkManageComponent} from './component/work-manage/work-manage.component';
import {PeripheralDataComponent} from './component/peripheral-data/peripheral-data.component';
import {RejectedPageComponent} from './component/rejected-page/rejected-page.component';
import { CollectCompleteComponent } from './component/collect-complete/collect-complete.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dataIndex',
    pathMatch: 'full'
  },
  {
    path: 'dataIndex',
    component: DataIndexComponent
  },
  {
    path: 'dataIndex/dataCollection',      //重首页跳转到发布页面的时候
    redirectTo: '/dataCollection',
    pathMatch: 'full'
  },
  {
    path: 'shopHall/dataCollection',      //店铺大厅跳转到发布页面的时候
    redirectTo: '/dataCollection',
    pathMatch: 'full'
  },
  {
    path: 'dataCollection',
    component: DataCollectionComponent
  },
  {
    path: 'shopHall',
    component: ShopHallComponent
  },
  {
    path: 'workManage',
    component: WorkManageComponent
  },
  {
    path: 'reject',
    component: RejectedPageComponent
  },
  {
    path: 'shopHall/peripheralData/:id',
    component: PeripheralDataComponent
  },
  {
    path: 'glancePostedInfoItem',
    component: CollectCompleteComponent
  }
]
export const appRoutes = RouterModule.forRoot(routes);
