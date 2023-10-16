import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibitionsComponent } from './exibitions.component';

describe('ExibitionsComponent', () => {
  let component: ExibitionsComponent;
  let fixture: ComponentFixture<ExibitionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExibitionsComponent]
    });
    fixture = TestBed.createComponent(ExibitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
