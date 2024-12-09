import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnboardingService } from '../../services/onboarding.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css'],
})
export class OnboardingComponent {
  onboardingForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  templates = ['ALL', 'OWNED FACILITY', 'WORKERS', 'PRODUITS', 'FACILITY'];

  constructor(private fb: FormBuilder, private onboardingService: OnboardingService) {
    this.onboardingForm = this.fb.group({
      company_name: ['', [Validators.required, Validators.maxLength(255)]],
      company_number: ['', [Validators.required, Validators.maxLength(50)]],
      legal_form: ['', [Validators.required, Validators.maxLength(100)]],
      office_address: ['', [Validators.required]],
      website: ['', [Validators.pattern('www\\.[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+')]],
      nace_code: ['', [Validators.required, Validators.maxLength(20)]],
      business_activity: ['', [Validators.required]],
      nb_workers: ['', [Validators.required, Validators.min(1)]],
      revenue: ['', [Validators.required, Validators.min(0)]],
      labels: ['', [Validators.required], Validators.maxLength(255)],
      template: ['', [Validators.required]],
    });
  }

  get f() {
    return this.onboardingForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.onboardingForm.invalid) {
      this.errorMessage = "Veuillez corriger les erreurs dans le formulaire.";
      return;
    }

    this.onboardingService.submitOnboardingRequest(this.onboardingForm.value).subscribe(
      (response: any) => {
        this.successMessage = "Demande d'inscription soumise avec succès.";
        this.errorMessage = '';
        console.log('Réponse de l’API :', response);

        this.onboardingForm.reset();
        this.submitted = false;
      },
      (error: any) => {
        this.successMessage = '';
        this.errorMessage = "Une erreur s'est produite. Veuillez réessayer.";
        console.error('Erreur API :', error);
      }
    );
  }
}