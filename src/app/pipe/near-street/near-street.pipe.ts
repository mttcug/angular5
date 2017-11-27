import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'nearStreet'
})
export class NearStreetPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let data = JSON.parse(sessionStorage.getItem("nearStreet"));
    let item = data.find(item => item.value.toString() == value.toString());
    return item ? item.value_description : '';
  }

}
