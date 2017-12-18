import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'certification'
})
export class CertificationPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let data = JSON.parse(sessionStorage.getItem("cetification"));

    let item = data && value ? data.find(item => item.value.toString() == value.toString()) : '';

    return item ? item.value_description : '';
  }

}
