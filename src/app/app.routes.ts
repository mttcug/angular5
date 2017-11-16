import {Routes, RouterModule} from '@angular/router';
import { DataIndexComponent } from './component/data-index/data-index.component';
import {DataCollectionComponent} from './component/data-collection/data-collection.component';
import { ShopHallComponent } from './component/shop-hall/shop-hall.component';
import { WorkManageComponent } from './component/work-manage/work-manage.component';


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
  }
]
export const routing = RouterModule.forRoot(routes);
