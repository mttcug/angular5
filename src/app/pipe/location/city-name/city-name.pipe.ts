import { Pipe, PipeTransform  ,Inject} from '@angular/core';

@Pipe({
  name: 'cityName'
})
export class CityNamePipe implements PipeTransform {

  allDistricts=[];

  constructor(@Inject('data') private data) {}

  transform(value: any, args?: any): any {

    this.data.getDistrictData().then(res => {
      var result = res ? res : [];
      result.forEach((v, i) => {
        this.allDistricts.push(v);
      });

      var aim=this.allDistricts.find(item=>item.id.toString()==value.toString());

      return aim ? aim.name : '';

    });







  }

}
