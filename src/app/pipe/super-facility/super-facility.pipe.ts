import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'superFacility'
})
export class SuperFacilityPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let data=JSON.parse(sessionStorage.getItem("superFacility"));
    let item=data.find(item=>item.value.toString()==value.toString());
    return item ? item.value_description : '';
  }

}
