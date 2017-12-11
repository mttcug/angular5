import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'locationType'
})
export class LocationTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let data:any = JSON.parse(sessionStorage.getItem("locationType"));

    let item = data && value ? data.find(v => v.value == value.toString()) : '';

    return item ? item.value_description : '';
  }
}
