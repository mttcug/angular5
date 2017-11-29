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

import { JsonrpcRequestModelService } from './service/jsonrpc/jsonrpc-request-model.service';
import { DataService } from './service/data/data.service';
import { ConfigService } from './service/config/config.service';
import { DataOperateRequestService } from './service/operate/data-operate-request.service';
import { CurrentPageService } from './service/current-page/current-page.service';
import { CurrentCityService } from './service/current-city/current-city.service';
import { DataCollectionService } from './service/data-collection/data-collection.service';
import { ShopHallService } from './service/shop-hall/shop-hall.service';
import { PeripheralDataService } from './service/peripheral-data/peripheral-data.service';
import { HomePageService } from './service/home-page/home-page.service';


import { appRoutes } from './app.routes';
import { AngularEchartsModule } from 'ngx-echarts';
import { RentUnitPipe } from './pipe/rent-unit/rent-unit.pipe';
import { IndustryPipe } from './pipe/industry/industry.pipe';
import { NearStreetPipe } from './pipe/near-street/near-street.pipe';
import { LocationTypePipe } from './pipe/location-type/location-type.pipe';
import { SuperFacilityPipe } from './pipe/super-facility/super-facility.pipe';
import { DistrictPipe } from './pipe/district/district.pipe';
import { ToolDirective } from './directive/tool.directive';




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
    RentUnitPipe,
    IndustryPipe,
    GeolocationComponent,
    NearStreetPipe,
    LocationTypePipe,
    SuperFacilityPipe,
    DistrictPipe,
    ToolDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    appRoutes,
    AngularEchartsModule,
    NgbModule.forRoot(),
    FileUploadModule,
    BaiduMapModule.forRoot({ak: 'fN66w00hfey6hwEyhFcYFRvvwe4a0pOG'})
  ],
  providers: [
    {provide : 'http', useClass : JsonrpcRequestModelService},
    {provide : 'data' , useClass : DataService},
    {provide : 'config' , useClass : ConfigService},
    {provide : 'operate' , useClass : DataOperateRequestService},
    {provide : 'CurrentPageService' , useClass : CurrentPageService},
    {provide : 'CurrentCityService' , useClass : CurrentCityService},
    {provide : 'DataCollectionService' , useClass : DataCollectionService},
    {provide : 'ShopHallService' , useClass : ShopHallService},
    {provide : 'PeripheralDataService' , useClass : PeripheralDataService},
    {provide : 'HomePageService' , useClass : HomePageService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
