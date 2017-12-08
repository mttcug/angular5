import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {dateComparator} from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  @Input() date:Date = new Date();

  @Input() placeholder='yyyy-mm-dd';

  @Input() minDate=new Date(1990, 5, 10);

  @Input() maxDate=new Date();

  @Input() bsConfig = {containerClass:'theme-blue'};

  @Output() dateChange:EventEmitter<any>=new EventEmitter();



  constructor() {}



  ngOnInit() {}


  fireDateChange(date){
    this.dateChange.emit(date);
  }

}
