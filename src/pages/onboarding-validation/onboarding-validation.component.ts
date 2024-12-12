import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingService } from '../../services/onboarding.service';
import {Onboarding} from "../../types/onboarding";
import Swal from 'sweetalert2'


@Component({
  selector: 'app-onboarding-validation',
  templateUrl: './onboarding-validation.component.html',
  styleUrls: ['./onboarding-validation.component.css'],
})

export class OnboardingValidationComponent {

  successMessage: string = '';
  submitted: boolean = false;
  onboarding : Onboarding ;
  Toast = Swal.mixin({
    toast: true,
    position: 'center',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1350,
    timerProgressBar: true,
  })
  constructor(
      private router: Router,
      private onboardingService: OnboardingService)
  {
    const navigation = this.router.getCurrentNavigation();
    this.onboarding = navigation?.extras?.state?.['onboarding'];
  }

  submit(): void {
    if(this.onboarding && this.onboarding.onboarding_id){
      this.onboardingService.validateOnboardingRequest(this.onboarding.onboarding_id).subscribe()
    }
    this.Toast.fire({
      icon: 'success',
      title: 'L\'Onboarding a été validé avec succès !',
      position : 'center',
      color : 'white',
      background : "#013238"
    })
    this.router.navigate([`/dashboard`]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  refuse(): void {
    if(this.onboarding && this.onboarding.onboarding_id){
      this.onboardingService.refuseOnboardingRequest(this.onboarding.onboarding_id).subscribe();
    }
    this.Toast.fire({
      icon: 'error',
      title: 'L\'Onboarding a été refusé !',
      position : 'center',
      color : 'white',
      background : "#013238"
    })
    this.router.navigate([`/dashboard`]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
