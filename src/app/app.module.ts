import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule , JsonpModule } from '@angular/http';
import { BaiduMapModule } from 'angular2-baidu-map';
import { FileUploadModule } from 'ng2-file-upload';


import { AppComponent } from './app.component';
import { DatePickerComponent } from './component/common/date-picker/date-picker.component';
import { UploadFilesComponent } from './component/common/upload-files/upload-files.component';
import { BaiduMapComponent } from './component/common/baidu-map/baidu-map.component';
import { DataCollectionComponent } from './component/data-collection/data-collection.component';
import { HeaderComponent } from  './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { DataIndexComponent } from './component/data-index/data-index.component';
import { ShopHallComponent } from './component/shop-hall/shop-hall.component';
import { WorkManageComponent } from './component/work-manage/work-manage.component';
import { PeripheralDataComponent } from './component/peripheral-data/peripheral-data.component';
import { RejectedPageComponent } from './component/rejected-page/rejected-page.component';
import { GeolocationComponent } from './component/common/geolocation/geolocation.component';

import { HttpRequestService } from './service/http-model/http-request.service';
import { DataService } from './service/data-request/data.service';
import { ConfigService } from './service/config/config.service';
import { DataOperateRequestService } from './service/operate-request/data-operate-request.service';

import { routing } from './app.routes';
import { AngularEchartsModule } from 'ngx-echarts';
import { LocationPipe } from './pipe/location/location.pipe';
import { RentUnitPipe } from './pipe/rent-unit/rent-unit.pipe';
import { IndustryPipe } from './pipe/industry/industry.pipe';




@NgModule({
  declarations: [
    AppComponent,
    DatePickerComponent,
    UploadFilesComponent,
    BaiduMapComponent,
    DataCollectionComponent,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    DataIndexComponent,
    ShopHallComponent,
    WorkManageComponent,
    PeripheralDataComponent,
    RejectedPageComponent,
    LocationPipe,
    RentUnitPipe,
    IndustryPipe,
    GeolocationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing,
    AngularEchartsModule,
    NgbModule.forRoot(),
    FileUploadModule,
    BaiduMapModule.forRoot({ak: 'fN66w00hfey6hwEyhFcYFRvvwe4a0pOG'})
  ],
  providers: [
    {provide : 'http', useClass : HttpRequestService},
    {provide : 'data' , useClass : DataService},
    {provide : 'config' , useClass : ConfigService},
    {provide : 'operate' , useClass : DataOperateRequestService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
