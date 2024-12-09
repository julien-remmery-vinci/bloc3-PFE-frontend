import { Component } from '@angular/core';
import { map, Observable, Subscription,tap } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/types/User';
import { Company } from 'src/types/Company';
import { CompanyService } from 'src/services/company.service';

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
  

  constructor(
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    
    this.companyService.getCompanies().subscribe((data) => {
      this.companies = data;
      this.companyService.getFormStatus(1).subscribe(
        (response) => {
          console.log('API Response:', response);
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
      console.log('Companies:', this.companies);
      this.companies.forEach((company) => {
        if (company.company_id) {
          this.progressMap[company.company_id] = 0; // Default progress value
          this.companyService.getFormStatus(company.company_id).subscribe((status) => {
            // Ensure 'progress' exists and is a number, fallback to 0 if null or undefined
            const progress = status?.progress ?? 0;
            this.progressMap[company.company_id!] = progress;
          }, (error) => {
            console.error(`Failed to fetch progress for company ID: ${company.company_id}`, error);
          });
        }
      });
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
}
