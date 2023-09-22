import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOneTransaltorComponent } from './show-one-transaltor.component';

describe('ShowOneTransaltorComponent', () => {
  let component: ShowOneTransaltorComponent;
  let fixture: ComponentFixture<ShowOneTransaltorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowOneTransaltorComponent]
    });
    fixture = TestBed.createComponent(ShowOneTransaltorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
