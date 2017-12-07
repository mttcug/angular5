import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {dateComparator} from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  @Input() date:any = new Date().getFullYear().toString()+'-'+(new Date().getMonth()+1).toString()+'-'+new Date().getDate().toString();

  @Input() placeholder='yyyy-mm-dd';

  @Input() minDate=new Date(1990, 5, 10);

  @Input() maxDate=new Date();

  @Input() bsConfig = {containerClass:'theme-blue'};

  @Output() dateChange:EventEmitter<any>=new EventEmitter();

  dateFormDate;

  constructor() {}



  ngOnInit() {
    this.dateFormDate = new Date(this.date);
  }


  fireDateChange(date){

    var temp=new Date(date);

    var data:any=temp.getFullYear().toString()+'-'+(temp.getMonth()+1).toString()+'-'+temp.getDate().toString();

    this.dateChange.emit(data);
  }

}
