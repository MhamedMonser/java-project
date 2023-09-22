import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarnslatorProfileUpdateComponent } from './tarnslator-profile-update.component';

describe('TarnslatorProfileUpdateComponent', () => {
  let component: TarnslatorProfileUpdateComponent;
  let fixture: ComponentFixture<TarnslatorProfileUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarnslatorProfileUpdateComponent]
    });
    fixture = TestBed.createComponent(TarnslatorProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
