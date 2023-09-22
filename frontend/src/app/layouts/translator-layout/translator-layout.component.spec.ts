import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatorLayoutComponent } from './translator-layout.component';

describe('TranslatorLayoutComponent', () => {
  let component: TranslatorLayoutComponent;
  let fixture: ComponentFixture<TranslatorLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatorLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
