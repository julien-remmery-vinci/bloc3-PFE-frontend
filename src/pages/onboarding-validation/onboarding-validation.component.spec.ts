import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingValidationComponent } from './onboarding-validation.component';

describe('OnboardingValidationComponent', () => {
  let component: OnboardingValidationComponent;
  let fixture: ComponentFixture<OnboardingValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
