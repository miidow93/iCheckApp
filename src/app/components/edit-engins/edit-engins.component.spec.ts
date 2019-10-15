import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEnginsComponent } from './edit-engins.component';

describe('EditEnginsComponent', () => {
  let component: EditEnginsComponent;
  let fixture: ComponentFixture<EditEnginsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEnginsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEnginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
