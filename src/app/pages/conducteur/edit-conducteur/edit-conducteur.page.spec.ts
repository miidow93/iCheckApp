import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConducteurPage } from './edit-conducteur.page';

describe('EditConducteurPage', () => {
  let component: EditConducteurPage;
  let fixture: ComponentFixture<EditConducteurPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditConducteurPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConducteurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
