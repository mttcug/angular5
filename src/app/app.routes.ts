import { Routes,RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { DataCollectionComponent } from './component/data-collection/data-collection.component';




export const routes:Routes=[
  {
    path:'',
    component:AppComponent
  },
  {
    path:'/dataCollection',
    component:DataCollectionComponent
  }
]
export const routing = RouterModule.forRoot(routes);
