import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/services/company.service';
import { OnboardingService } from 'src/services/onboarding.service';
import { ScoreService } from 'src/services/score.service';
import { Company } from 'src/types/Company';
import { Form } from 'src/types/Form';
import { Onboarding } from 'src/types/onboarding';
import { Score } from 'src/types/Score';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  companies: Company[] = [];
  pendingOnboardings : Onboarding[]= [];
  rejectedOnboardings : Onboarding[] = [];
  searchTerm: string = ''; // Search bar input
  filterTerm: string = ''; // Dropdown filter
  progressMap: { [key: string]: number } = {}; // Map to store progress by company ID
  formsMap: { [key: string]: Form } = {};
  scoresMap: {[key:number]: Score} = {};

  isDropdownVisible: boolean = false; // Dropdown visibility

  constructor(private companyService: CompanyService, private router: Router, private onboardingService : OnboardingService, private scoreService : ScoreService) {}

  ngOnInit(): void {
    this.onboardingService.getPendingOnboardingForms().subscribe((onboardings)=>{
      this.pendingOnboardings = onboardings;
    })
    this.onboardingService.getRejectedOnboardingForms().subscribe((onboardings)=>{
      this.rejectedOnboardings = onboardings;
    })
    this.companyService.getCompanies().subscribe((data) => {
      this.companies = data;
      this.companies.forEach((company) => {
        this.companyService
          .getFormStatus(company.company_id!)
          .subscribe((status) => {
            this.progressMap[company.company_id!] = Math.round(status ?? 0);
          });
        this.companyService.getForms(company.company_id!).subscribe((forms) => {
          this.formsMap[company.company_id!] = forms.forms[0]!;
          this.fillScoreMap(forms.forms[0].form_id!);
        });
        
      });
    });
  }
  getScoreTotal(formId: number): number {
    const score = this.scoresMap[formId];
    return score ? Math.round(score.total) : 0;
  }
  // Toggle dropdown visibility
  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  // Get the form associated with a company ID
  getFormFromMap(id: number): Form {
    return this.formsMap[id];
  }

  fillScoreMap(id:number):void{
    this.scoreService.getScoreFromFormId(id).subscribe((score)=>{
      this.scoresMap[id] = score;
    });
  }

  // Navigate to form
  navigateTo(form: Form): void {
    this.router.navigate([`/forms/${form.type.toLowerCase()}/validate`], {
      state: { form },
    });
  }
  navigateToScoreDetail(score: Score): void {
    this.router.navigate([`/forms/score`], {
      state: { score },
    });
  }

  goToOnboarding(onboarding:Onboarding): void {
    this.router.navigate([`/onboarding/validate`],{
    state:{onboarding},
    });
  }

  // Unified filter logic for companies
  filteredCompanies(): Company[] {
    return this.companies.filter((company) => {
      const matchesSearch = company.company_name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      const matchesFilter =
        this.filterTerm === '' ||
        (this.filterTerm === 'small' && (company.nb_workers || 0) < 50) ||
        (this.filterTerm === 'medium' &&
          (company.nb_workers || 0) >= 50 &&
          (company.nb_workers || 0) <= 250) ||
        (this.filterTerm === 'large' && (company.nb_workers || 0) > 250);

      return matchesSearch && matchesFilter;
    });
  }

  // Get filtered companies by status
  filterCompaniesByStatus(status: string): Company[] {
    return this.filteredCompanies().filter(
      (company) => this.getFormFromMap(company.company_id!)?.status === status
    );
  }

  // Filtered companies for 'PENDING' status
  getPendingCompanies(): Company[] {
    return this.filterCompaniesByStatus('SUBMITTED');
  }

  // Filtered companies for 'VALIDATED' status
  getValidatedCompanies(): Company[] {
    return this.filterCompaniesByStatus('VALIDATED');
  }

  protected readonly Math = Math;
}
