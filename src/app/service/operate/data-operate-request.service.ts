import {Injectable, Inject} from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataOperateRequestService {

  constructor(@Inject('http') private http) { }


}
