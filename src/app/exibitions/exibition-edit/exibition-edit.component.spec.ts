import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibitionEditComponent } from './exibition-edit.component';

describe('ExibitionEditComponent', () => {
  let component: ExibitionEditComponent;
  let fixture: ComponentFixture<ExibitionEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExibitionEditComponent]
    });
    fixture = TestBed.createComponent(ExibitionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
