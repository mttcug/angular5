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

  @Output() dateChange:EventEmitter<any>=new EventEmitter();

  fireDateChange(date){
    this.dateChange.emit(date);
  }




}
