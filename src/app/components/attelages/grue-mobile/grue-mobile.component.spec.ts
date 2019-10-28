import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrueMobileComponent } from './grue-mobile.component';

describe('GrueMobileComponent', () => {
  let component: GrueMobileComponent;
  let fixture: ComponentFixture<GrueMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrueMobileComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrueMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
