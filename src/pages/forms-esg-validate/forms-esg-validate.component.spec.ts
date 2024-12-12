import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsEsgValidateComponent } from './forms-esg-validate.component';

describe('FormsCompleteComponent', () => {
  let component: FormsEsgValidateComponent;
  let fixture: ComponentFixture<FormsEsgValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsEsgValidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsEsgValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
