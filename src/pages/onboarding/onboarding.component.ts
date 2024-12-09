import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private onboardingService: OnboardingService) {
    this.onboardingForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(100)]],
      last_name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      company_name: ['', [Validators.required, Validators.maxLength(255)]],
      company_number: ['', [Validators.required, Validators.maxLength(50)]],
      legal_form: ['', [Validators.required, Validators.maxLength(100)]],
      office_address: ['', [Validators.required]],
      website: ['', [Validators.pattern('^(https?:\\/\\/)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}.*$')]],
      nace_code: ['', [Validators.required, Validators.maxLength(20)]],
      business_activity: ['', [Validators.required]],
      nb_workers: ['', [Validators.required, Validators.min(1)]],
      revenue: ['', [Validators.required, Validators.min(0)]],
      labels: this.fb.array([], this.validateLabels), 
      is_owner: [null, [Validators.required]], 
      offers_services: [null, [Validators.required]], 
      sells_products: [null, [Validators.required]], 
    });
  }

  get f() {
    return this.onboardingForm.controls;
  }

  get labelsArray(): FormArray {
    return this.onboardingForm.get('labels') as FormArray;
  }

  validateLabels(control: AbstractControl): ValidationErrors | null {
    const labels = control.value;
    return labels && labels.length > 0 ? null : { required: true };
  }

  addLabel(label: string) {
    if (label) {
      this.labelsArray.push(this.fb.control(label));
    }
  }

  removeLabel(index: number) {
    this.labelsArray.removeAt(index);
  }

  onSubmit() {
    this.submitted = true;
  
    if (this.onboardingForm.invalid) {
      this.errorMessage = "Veuillez corriger les erreurs dans le formulaire.";
      return;
    }
  
    const formValues = this.onboardingForm.value;
  
    this.onboardingService.submitOnboardingRequest(formValues).subscribe(
      (response: any) => {
        this.successMessage = "Demande d'inscription soumise avec succès.";
        this.errorMessage = '';
        this.onboardingForm.reset();
        this.submitted = false;
      },
      (error: any) => {
        this.successMessage = '';
        this.errorMessage = "Une erreur s'est produite. Veuillez réessayer.";
      }
    );
  }  
}