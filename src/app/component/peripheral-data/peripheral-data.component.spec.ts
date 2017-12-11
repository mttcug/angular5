import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeripheralDataComponent } from './peripheral-data.component';

describe('PeripheralDataComponent', () => {
  let component: PeripheralDataComponent;
  let fixture: ComponentFixture<PeripheralDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeripheralDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeripheralDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
