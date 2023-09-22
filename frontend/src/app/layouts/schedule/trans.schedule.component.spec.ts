import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransscheduleComponent } from './trans.schedule.component';

describe('TransscheduleComponent', () => {
  let component: TransscheduleComponent;
  let fixture: ComponentFixture<TransscheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransscheduleComponent]
    });
    fixture = TestBed.createComponent(TransscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
