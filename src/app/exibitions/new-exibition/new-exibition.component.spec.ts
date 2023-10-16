import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExibitionComponent } from './new-exibition.component';

describe('NewExibitionComponent', () => {
  let component: NewExibitionComponent;
  let fixture: ComponentFixture<NewExibitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewExibitionComponent]
    });
    fixture = TestBed.createComponent(NewExibitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
