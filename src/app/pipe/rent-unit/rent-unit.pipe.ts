import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rentUnit'
})
export class RentUnitPipe implements PipeTransform {

  transform(value: any, args?: any): any {

      let data = JSON.parse(sessionStorage.getItem("rentUnit"));

      let res = data && value ? data.find(item => item.value.toString() == value.toString()) : '';

      return res ? res.value_description : '';
    }
  }

