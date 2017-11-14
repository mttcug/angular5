import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule , JsonpModule } from '@angular/http';
import { BaiduMapModule } from 'angular2-baidu-map';
import { FileUploadModule } from 'ng2-file-upload';


import { AppComponent } from './app.component';
import { DatePickerComponent } from './component/date-picker/date-picker.component';
import { UploadFilesComponent } from './component/upload-files/upload-files.component';
import { BaiduMapComponent } from './component/baidu-map/baidu-map.component';
import { DataCollectionComponent } from './component/data-collection/data-collection.component';
import { HeaderComponent } from  './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { DataIndexComponent } from './component/data-index/data-index.component';

import { HttpRequestService } from './service/request/http-request.service';
import { DataService } from './service/data/data.service';
import { ConfigService } from './service/config/config.service';

import { routing } from './app.routes';





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
    DataIndexComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing,
    NgbModule.forRoot(),
    FileUploadModule,
    BaiduMapModule.forRoot({ak: 'fN66w00hfey6hwEyhFcYFRvvwe4a0pOG'})
  ],
  providers: [
    {provide : 'request', useClass : HttpRequestService},
    {provide : 'data' , useClass : DataService},
    {provide : 'config' , useClass : ConfigService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
