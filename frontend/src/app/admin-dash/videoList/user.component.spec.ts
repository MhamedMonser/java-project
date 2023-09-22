/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VidComponent } from './user.component';

describe('UserComponent', () => {
  let component: VidComponent;
  let fixture: ComponentFixture<VidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
