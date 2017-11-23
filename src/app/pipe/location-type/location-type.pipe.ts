import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'locationType'
})
export class LocationTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let data=JSON.parse(sessionStorage.getItem("nearStreet"));
    console.log("是否临街：",data);
    let item=data.find(item=>item.vaule.toString()==value.toString());
    return item ? item.value_description : '';
  }

}
