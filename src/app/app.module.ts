import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule , JsonpModule } from '@angular/http';
import { BaiduMapModule } from 'angular2-baidu-map';


import { AppComponent } from './app.component';
import { DatePickerComponent } from './component/date-picker/date-picker.component';
import { UploadFilesComponent } from './component/upload-files/upload-files.component';

import { HttpRequestService } from './service/request/http-request.service';
import { BaiduMapComponent } from './component/baidu-map/baidu-map.component';



@NgModule({
  declarations: [
    AppComponent,
    DatePickerComponent,
    UploadFilesComponent,
    BaiduMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgbModule.forRoot(),
    BaiduMapModule.forRoot({ak:'fN66w00hfey6hwEyhFcYFRvvwe4a0pOG'})
  ],
  providers: [
    {provide:'request',useClass:HttpRequestService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
