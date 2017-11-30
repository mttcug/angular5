import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transferStatus'
})
export class TransferStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let data = JSON.parse(sessionStorage.getItem("transferStatus"));
    let item = data.find(item => item.value.toString() == value.toString());
    return item ? item.value_description : '';
  }

}
