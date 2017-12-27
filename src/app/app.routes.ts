import {Routes, RouterModule} from '@angular/router';
import {DataIndexComponent} from './component/data-index/data-index.component';
import {DataCollectionComponent} from './component/data-collection/data-collection.component';
import {ShopHallComponent} from './component/shop-hall/shop-hall.component';
import {WorkManageComponent} from './component/work-manage/work-manage.component';
import { PeripheralAnalysisComponent } from './component/peripheral-analysis/peripheral-analysis.component';
import { CollectCompleteComponent } from './component/collect-complete/collect-complete.component';
import { ErrorPageComponent } from './component/error-page/error-page.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/:sessionId/:origin/dataIndex',
    pathMatch: 'full'
  },
  {
    path: '/:sessionId/:origin/dataIndex',
    component: DataIndexComponent
  },
  {
    path: '/:sessionId/:origin/dataIndex/dataCollection',      //重首页跳转到发布页面的时候
    redirectTo: '/:sessionId/:origin/dataCollection',
    pathMatch: 'full'
  },
  {
    path: 'shopHall/dataCollection',      //店铺大厅跳转到发布页面的时候
    redirectTo: '/:sessionId/:origin/dataCollection',
    pathMatch: 'full'
  },
  {
    path: '/:sessionId/:origin/dataCollection',               //传参方法使用queryParams并不是添加在路径后面
    component: DataCollectionComponent
  },
  {
    path: '/:sessionId/:origin/shopHall',
    component: ShopHallComponent
  },
  {
    path: '/:sessionId/:origin/workManage',
    component: WorkManageComponent
  },
  {
    path: 'shopHall/peripheralAnalysis/:id',
    component: PeripheralAnalysisComponent
  },
  {
    path: '/:sessionId/:origin/glancePostedInfoItem',                                //发布完成页面
    component: CollectCompleteComponent
  },
  {
    path: '**',                                //发布完成页面
    component: ErrorPageComponent
  }
]
export const appRoutes = RouterModule.forRoot(routes);
