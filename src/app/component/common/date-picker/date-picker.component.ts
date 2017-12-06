import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

  @Input() date='';

  @Input() placeholder='yyyy-mm-dd';

  @Input() minDate=new Date(1990, 5, 10);

  @Input() maxDate=new Date();

  @Input() bsValue=new Date();

  @Input() bsConfig ={
    containerClass:'theme-blue'
  };

  @Output() dateChange:EventEmitter<any>=new EventEmitter();

  fireDateChange(date){
    this.dateChange.emit(date);
  }

}
