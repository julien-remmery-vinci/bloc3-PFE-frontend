import { Component } from '@angular/core';
import { map, Observable, Subscription,tap } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/types/User';
import { Company } from 'src/types/Company';
import { CompanyService } from 'src/services/company.service';
import { Form } from 'src/types/Form';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  companies: Company[] = [];
  searchTerm: string = ''; // Search bar input
  filterTerm: string = ''; // Dropdown filter
  progressMap: { [key: string]: number } = {}; // Map to store progress by company ID
  formsMap: {[key: string] : Form} = {};
  constructor(
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.companyService.getCompanies().subscribe((data) => {
      this.companies = data;
      this.companies.forEach((company) => {
        this.companyService.getFormStatus(company.company_id!).subscribe((status) => {
          let prog = status??0;       
          prog = Math.round(prog)
          // Ensure 'progress' exists and is a number, fallback to 0 if null or undefined
          this.progressMap[company.company_id!] = prog;
        })
        this.companyService.getForms(company.company_id!).subscribe((forms) => {   
          console.log("LE PREMIER ELEMENT : ", forms)
          let form = forms.forms[0];
          // Ensure 'progress' exists and is a number, fallback to 0 if null or undefined
          this.formsMap[company.company_id!] = form;
        })
      });
      console.log(this.progressMap);
      console.log(this.formsMap);
    });
  }

// Function to filter companies based on search term and filter term
filteredCompanies(): Company[] {
  return this.companies.filter(company => {
    // Apply search filter
    const matchesSearch = company.company_name
      .toLowerCase()
      .includes(this.searchTerm.toLowerCase());

    // Apply size filter
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
isDropdownVisible: boolean = false; // Controls dropdown visibility
  filterTermn: string = ''; // Stores the selected filter

  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  getFormFromMap(id : number): Form {
    console.log("Test", this.formsMap[id]);
    return this.formsMap[id];
  }

   navigateTo(form: Form): void {
    console.log("FORMS" + form)
    this.router.navigate([`/forms/${form.type.toLowerCase()}/complete`],{state : {form}});
  }
}
