import {Component, OnInit, Input, Output, EventEmitter, Inject} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {FileUploader} from 'ng2-file-upload';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {


  /*   uploader: FileUploader;
     response: string;*/

  constructor(private http: Http, @Inject('config') private configService) {

    /*        this.uploader = new FileUploader({
              url: 'http://192.168.1.234:5544/upload',
              method: "POST",
              itemAlias: "uploadfile"
            });*/
  }


  /*  selectedFileOnChanged(event:any) {
      // 打印文件选择名称
      console.log(event.target.value);
     this.uploadFileHandel();
    }*/

  /*  uploadFileHandel() {
      this.uploader.queue[0].onSuccess = function (response, status, headers) {
        if (status == 200) {
          let tempRes = JSON.parse(response);
        }else {
          console.log("fail:",status);
        }
      };
      this.uploader.queue[0].upload();
    }*/

  private headers = new Headers({'Content-Type': 'multipart/form-data'});

  ngOnInit() {
  }

  @Input() images = [];       //数据库中已有的图片

  @Input() multiImages = true;     //上传多张还是单张图片问题,默认为多张

  @Output() uploadImages: EventEmitter<any> = new EventEmitter<any>();


/*  Upload(files) {
    var params = {
      files: files
    };
    return this.http.post('http://192.168.1.234:5544/upload', params, {headers: this.headers}).toPromise().then(result => {
      return new Promise((res, rej) => {
        console.log("result:", result);
        res(result);
      });
    });
  }*/

  /*添加新图片*/
/*
  addImages(files) {
    console.log("files:", files);
    /!*      var that=this;
          console.log("files:",files);
          var con='';
          var reader = new FileReader();
          reader.onload=function () {
            con=this.result;

          }
          reader.readAsDataURL(files[0]);*!/
    this.Upload(files).then(res => {
      this.images.concat(res);
    });
    this.uploadImages.emit(this.images);
  }
*/


  /*删除图片（注：新图片需要上传和就图片格式是不一样的需要单独存储）*/
  deleteNewImage(item) {
    this.images.forEach((v, i) => {
      item.url.toString().trim() == v.url.toString().trim() ? this.images.splice(i, 1) : '';
    })

    this.uploadImages.emit(this.images);
  }

}
