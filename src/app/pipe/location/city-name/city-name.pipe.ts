import {Pipe, PipeTransform, Inject} from '@angular/core';
import {  Http, Response, RequestOptions, Headers } from  '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Pipe({
  name: 'cityName',
  pure: true
})
export class CityNamePipe implements PipeTransform {



  constructor(@Inject('http') private http) {



  }


  transform(value: any, args?: any): any {

      let data=JSON.parse(sessionStorage.getItem("district"));
      let item=data.find(item=>item.id.toString()==value.toString());
      return item ? item.name : '';

  }

}
