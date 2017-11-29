import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'district'
})
export class DistrictPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let data=JSON.parse(sessionStorage.getItem("district"));
    let item=data.find(item=>item.id.toString()==value.toString());
    return item ? item.name : '';
  }

}
