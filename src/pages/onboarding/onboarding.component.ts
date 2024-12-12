import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingService } from '../../services/onboarding.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css'],
})
export class OnboardingComponent {
  onboardingForm: FormGroup;
  currentStep: number = 0;
  steps: string[] = [
    'Informations utilisateur',
    'Informations sur l\'entreprise',
    'Informations supplémentaires',
  ];
  successMessage: string = '';
  errorMessage: string = '';
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private onboardingService: OnboardingService
  ) {
    this.onboardingForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      position: ['', Validators.required],
      company_name: ['', Validators.required],
      company_number: ['', Validators.required],
      legal_form: ['', Validators.required],
      office_address: ['', Validators.required],
      website: ['', Validators.pattern('^(https?:\\/\\/)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}.*$')],
      nace_code: ['', Validators.required],
      revenue: [null, [Validators.required, Validators.min(0)]],
      franchise: [null, Validators.required], // Boolean field
      nb_workers: [null, [Validators.required, Validators.min(0)]],
      dispute: [null, Validators.required], // Boolean field
      honor_engagement: [null, Validators.required], // Boolean field
      grant_application: [null, Validators.required], // Boolean field
      is_owner: [null, Validators.required], // Boolean field
      offers_services: [null, Validators.required], // Boolean field
      sells_products: [null, Validators.required], // Boolean field
      grant_application_partner: [''],
      something_else: [''],
      comment: [''],
    });
  }

  isCurrentStepValid(): boolean {
    const controls = Object.keys(this.onboardingForm.controls);
    const currentStepControls = controls.slice(
      this.currentStep * 5,
      (this.currentStep + 1) * 5
    );
    return currentStepControls.every((key) => this.onboardingForm.get(key)?.valid);
  }

  nextStep(): void {
    if (this.isCurrentStepValid()) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  submit(): void {
    if (this.onboardingForm.valid) {
      // Debug pour confirmer les valeurs soumises

      this.onboardingService.submitOnboardingRequest(this.onboardingForm.value).subscribe(
        (response) => {
          this.successMessage = 'Votre demande a été soumise avec succès.';
          this.submitted = true;
        },
        (error) => {
          console.error('Error submitting onboarding request:', error);
          this.errorMessage = "Une erreur s'est produite lors de la soumission. Veuillez réessayer.";
        }
      );
    } else {
    }
  }
}
