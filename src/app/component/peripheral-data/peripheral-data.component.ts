import { Component, OnInit , Inject} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-peripheral-data',
  templateUrl: './peripheral-data.component.html',
  styleUrls: ['./peripheral-data.component.css']
})
export class PeripheralDataComponent implements OnInit {

  constructor(private modalService: NgbModal, @Inject('data') private data) { }
  public radarOption: any;
  public populationOption:any;
  public barChartOption:any;


  ngOnInit() {
    var data1 = [];
    var data2 = [];
    var data3 = [];

    for (var i = 0; i < 70; i++) {
      data1.push([Math.random() * 5, Math.random() * 360]);
      data2.push([Math.random() * 5, Math.random() * 360]);
      data3.push([Math.random() * 10, Math.random() * 360]);
    }

    this.radarOption = {

      title: {
        text: '',
        left: 'center'
      },
      legend: {
        data: ['scatter', 'scatter2', 'scatter3'],
        top: 10
      },
      polar: {

      },
      angleAxis: {
        type: 'value'
      },
      radiusAxis: {
        axisAngle: 0
      },
      dataZoom: [
        {
          type: 'slider',
          radiusAxisIndex: 0,
          bottom: 0,
          start: 20,
          end: 80
        },
        {
          type: 'inside',
          radiusAxisIndex: 0,
          start: 20,
          end: 80
        }
      ],
      series: [{
        coordinateSystem: 'polar',
        // FIXME
        // 现在必须得设置这个，能不能polar和catesian一样，要不然很多特殊处理。
        angleAxisIndex: 0,
        radiusAxisIndex: 0,
        name: 'scatter',
        type: 'scatter',
        symbolSize: 10,
        data: data1
      }, {
        coordinateSystem: 'polar',
        angleAxisIndex: 0,
        radiusAxisIndex: 0,
        name: 'scatter2',
        type: 'scatter',
        symbolSize: 10,
        data: data2
      }, {
        coordinateSystem: 'polar',
        angleAxisIndex: 0,
        radiusAxisIndex: 0,
        name: 'scatter3',
        type: 'scatter',
        symbolSize: 10,
        data: data3
      }]
    }

    this.populationOption={
      title : {
        text: '',
        subtext: '',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: []
      },
      series : [
        {
          name: '',
          type: 'pie',
          radius : '60%',
          center: ['50%', '50%'],
          data:[
            {value:335, name:'居住'},
            {value:310, name:'工作'},
            {value:234, name:'上学'},
            {value:135, name:'流动'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

    this.barChartOption={
      color: ['#3398DB'],
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'直接访问',
          type:'bar',
          barWidth: '60%',
          data:[10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
  }


  closeResult: string;

  openConnectInfoModal(content) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      /*result == '1' ? this.currentCity = this.tempCurrentCity : '';*/
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}


