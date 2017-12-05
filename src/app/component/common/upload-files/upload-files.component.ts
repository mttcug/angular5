import {Component, OnInit, Input, Output, EventEmitter, Inject} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {error} from "util";

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {


  constructor(private http: Http, @Inject('config') private configService) {
  }


  ngOnInit() {
  }

  @Input() images = [];       //数据库中已有的图片

  @Input() multiImages = true;     //上传多张还是单张图片问题,默认为多张

  @Output() addImages: EventEmitter<any> = new EventEmitter<any>();


  //上传功能
  Upload(files) {
    var params = {
      files: files
    };
    return this.http.post(this.configService.getConf().uploadApi, files).toPromise().then(result => {
      return new Promise((res, rej) => {
        res(JSON.parse((<any>result)._body).result);
      });
    });
  }


  // 添加新图片
  imagesChanges(files): any {
    var fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append(i.toString(), files[i]);
    }
    this.Upload(fd).then(res => {
      Array.from(<any>res).forEach((v, i) => {
        this.images.push(v);
      });
      this.addImages.emit(this.images);
    });
  }


  // 删除图片（注：新图片需要上传和就图片格式是不一样的需要单独存储）
  deleteNewImage(item) {
    this.images.forEach((v, i) => {
      item.url.toString().trim() == v.url.toString().trim() ? this.images.splice(i, 1) : '';
    })
    this.addImages.emit(this.images);
  }

}
