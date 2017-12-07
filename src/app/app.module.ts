import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';                          //将被ngx-bootstap代替
import { PaginationModule } from 'ngx-bootstrap';                              //分页
import { BsDatepickerModule } from 'ngx-bootstrap';                            //日期选择
import { TabsModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import {HttpModule, JsonpModule} from '@angular/http';
import {BaiduMapModule} from 'angular2-baidu-map';                             //未使用，自己写的百度地图
import {FileUploadModule} from 'ng2-file-upload';                              //ngx-bootstrap的一个模块但是本app中未使用，自己写的upload
import {AngularEchartsModule} from 'ngx-echarts';                              //echart图表



import {AppComponent} from './app.component';
import {DatePickerComponent} from './component/common/date-picker/date-picker.component';
import {UploadFilesComponent} from './component/common/upload-files/upload-files.component';
import {BaiduMapComponent} from './component/common/baidu-map/baidu-map.component';
import {DataCollectionComponent} from './component/data-collection/data-collection.component';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {SideNavComponent} from './component/side-nav/side-nav.component';
import {DataIndexComponent} from './component/data-index/data-index.component';
import {ShopHallComponent} from './component/shop-hall/shop-hall.component';
import {WorkManageComponent} from './component/work-manage/work-manage.component';
import { PeripheralAnalysisComponent } from './component/peripheral-analysis/peripheral-analysis.component';import {RejectedPageComponent} from './component/rejected-page/rejected-page.component';
import {GeolocationComponent} from './component/common/geolocation/geolocation.component';
import {CollectCompleteComponent} from './component/collect-complete/collect-complete.component';

import {JsonrpcRequestModelService} from './service/jsonrpc/jsonrpc-request-model.service';
import {DataService} from './service/data/data.service';
import {ConfigService} from './service/config/config.service';
import {DataOperateRequestService} from './service/operate/data-operate-request.service';
import {CurrentPageService} from './service/current-page/current-page.service';
import {CurrentCityService} from './service/current-city/current-city.service';
import {DataCollectionService} from './service/data-collection/data-collection.service';
import {ShopHallService} from './service/shop-hall/shop-hall.service';
import {PeripheralDataService} from './service/peripheral-data/peripheral-data.service';
import {HomePageService} from './service/home-page/home-page.service';


import {appRoutes} from './app.routes';

import {RentUnitPipe} from './pipe/rent-unit/rent-unit.pipe';
import {IndustryPipe} from './pipe/industry/industry.pipe';
import {NearStreetPipe} from './pipe/near-street/near-street.pipe';
import {LocationTypePipe} from './pipe/location-type/location-type.pipe';
import {SuperFacilityPipe} from './pipe/super-facility/super-facility.pipe';
import {DistrictPipe} from './pipe/district/district.pipe';
import {TransferStatusPipe} from './pipe/transfer-status/transfer-status.pipe';


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
    RejectedPageComponent,
    RentUnitPipe,
    IndustryPipe,
    GeolocationComponent,
    NearStreetPipe,
    LocationTypePipe,
    SuperFacilityPipe,
    DistrictPipe,
    CollectCompleteComponent,
    TransferStatusPipe,
    PeripheralAnalysisComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    appRoutes,
    AngularEchartsModule,
    NgbModule.forRoot(),                                                                     //ng-bootstrap,所有就只需要引入这一个米快就可以了
    PaginationModule.forRoot(),                                                              //ngx-bootstrap的分页模块
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),                                                                  //ngx-bootstrap的datePicker模块
    FileUploadModule,
    BaiduMapModule.forRoot({ak: 'fN66w00hfey6hwEyhFcYFRvvwe4a0pOG'})
  ],
  providers: [
    {provide: 'http', useClass: JsonrpcRequestModelService},
    {provide: 'data', useClass: DataService},
    {provide: 'config', useClass: ConfigService},
    {provide: 'operate', useClass: DataOperateRequestService},
    {provide: 'CurrentPageService', useClass: CurrentPageService},
    {provide: 'CurrentCityService', useClass: CurrentCityService},
    {provide: 'DataCollectionService', useClass: DataCollectionService},
    {provide: 'ShopHallService', useClass: ShopHallService},
    {provide: 'PeripheralDataService', useClass: PeripheralDataService},
    {provide: 'HomePageService', useClass: HomePageService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
