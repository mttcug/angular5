import {Injectable, Inject} from '@angular/core';

@Injectable()
export class CurrentPageService {

  keyIndex = '';

  constructor(@Inject('config') private conf) {
    this.keyIndex = this.conf.getConf().keyIndex;
  }

  getCurPage() {
    let newUrl = window.location.href.replace(/[\?\#]/g, '/');     //去掉带问号和#参数的情况
    return newUrl.split("/")[this.keyIndex] ? newUrl.split("/")[this.keyIndex] : '';
  }
}
