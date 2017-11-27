import {Injectable, Inject} from '@angular/core';

@Injectable()
export class CurrentPageService {

  keyIndex = '';

  constructor(@Inject('config') private conf) {
    this.keyIndex = this.conf.getConf().keyIndex;
  }

  getCurPage() {
    return window.location.href.split("/")[this.keyIndex] ? window.location.href.split("/")[this.keyIndex] : '';
  }

}
