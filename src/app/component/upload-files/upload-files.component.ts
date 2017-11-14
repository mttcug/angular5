import {Component, OnInit, Input, Output, EventEmitter, Inject} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  constructor(@Inject('request') private http, @Inject('config') private configService) {
  }

  ngOnInit() {
  }

  @Input() images = [];       //数据库中已有的图片

  @Input() multiImages = true;     //上传多张还是单张图片问题,默认为多张

  @Output() uploadImages: EventEmitter<any> = new EventEmitter<any>();


  uploader: FileUploader = new FileUploader({
    url: this.configService.getConf.uploadApi,
    method: "POST",
    itemAlias: "uploadedfile"
  });


  selectedFileOnChanged() {
    // 这里是文件选择完成后的操作处理
  }


  Upload(files) {
    var params = {
      files: files
    };
    /*    return this.http.request("upload", params).then(result => {
          return new Promise((res, rej) => {
            (result.message == "上传成功") ? res(result.data) : rej(result);
          });
        });*/
    return this.uploadService.upload(params).then(result => {
      console.log("图片上传：", result);
      return new Promise((res, rej) => {
        (result.message == "上传成功") ? res(result.data) : rej(result);
      });
    });
  }

  /*添加新图片*/
  addImages(files) {
    var fileArr = [];
    Array.from(files).forEach((v, i) => {
      fileArr.push(v);
    })
    console.log("files:", fileArr);
    this.Upload(fileArr).then(res => {
      this.images.concat(res);
    });
    this.uploadImages.emit(this.images);
  }


  /*删除图片（注：新图片需要上传和就图片格式是不一样的需要单独存储）*/
  deleteNewImage(item) {
    this.images.forEach((v, i) => {
      item.url.toString().trim() == v.url.toString().trim() ? this.images.splice(i, 1) : '';
    })

    this.uploadImages.emit(this.images);
  }

}
