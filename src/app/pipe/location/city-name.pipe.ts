import { Pipe, PipeTransform  } from '@angular/core';

@Pipe({
  name: 'cityName'
})
export class CityNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    return null;
  }

}
