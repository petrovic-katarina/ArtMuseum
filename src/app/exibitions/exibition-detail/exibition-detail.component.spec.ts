import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibitionDetailComponent } from './exibition-detail.component';

describe('ExibitionDetailComponent', () => {
  let component: ExibitionDetailComponent;
  let fixture: ComponentFixture<ExibitionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExibitionDetailComponent]
    });
    fixture = TestBed.createComponent(ExibitionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
