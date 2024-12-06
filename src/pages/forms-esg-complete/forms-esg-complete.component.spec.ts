import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsEsgCompleteComponent } from './forms-esg-complete.component';

describe('FormsCompleteComponent', () => {
  let component: FormsEsgCompleteComponent;
  let fixture: ComponentFixture<FormsEsgCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsEsgCompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsEsgCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
