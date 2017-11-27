import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'locationType'
})
export class LocationTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let data:any = JSON.parse(sessionStorage.getItem("locationType"));

    let item = data.find(v => v.value == value.toString());
    console.log("结交：",item);
    return item ? item.value_description : '';
  }
}
