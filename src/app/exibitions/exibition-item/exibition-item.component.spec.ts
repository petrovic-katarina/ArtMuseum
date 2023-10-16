import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibitionItemComponent } from './exibition-item.component';

describe('ExibitionItemComponent', () => {
  let component: ExibitionItemComponent;
  let fixture: ComponentFixture<ExibitionItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExibitionItemComponent]
    });
    fixture = TestBed.createComponent(ExibitionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
