import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'industry'
})
export class IndustryPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let data = JSON.parse(sessionStorage.getItem("industry"));

    var industryName = value ? data.find(item => item.code.toString() == value.toString()) ? data.find(item => item.code.toString() == value.toString()).name : '' : '';

    return industryName;
  }

}
