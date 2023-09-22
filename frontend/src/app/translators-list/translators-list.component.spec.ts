import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatorsListComponent } from './translators-list.component';

describe('TranslatorsListComponent', () => {
  let component: TranslatorsListComponent;
  let fixture: ComponentFixture<TranslatorsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TranslatorsListComponent]
    });
    fixture = TestBed.createComponent(TranslatorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
