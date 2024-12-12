import { Component } from '@angular/core';
import { map, Observable, Subscription,tap } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/types/User';
import { Company } from 'src/types/Company';
import { CompanyService } from 'src/services/company.service';
import { UserService } from 'src/services/user.service';
import { Form } from 'src/types/Form';
import { FormService } from 'src/services/form.service';


@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent {
  user:any;
  company:any;
  searchTerm: string = ''; // Search bar input
  filterTerm: string = ''; // Dropdown filter
  progressMap: { [key: string]: number } = {}; // Map to store progress by company ID
  

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private authService: AuthService,
    private formService: FormService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getCompany().subscribe((data) => {
      this.company = data;
      this.companyService.getFormStatus(this.company.company_id!).subscribe((status) => {
        let prog = status??0;       
        prog = Math.round(prog)
        // Ensure 'progress' exists and is a number, fallback to 0 if null or undefined
        this.progressMap[this.company.company_id!] = prog;
      })
    });
  }

  navigateTo(route: string): void {
    this.formService.getUserForms().subscribe((forms: Form[]) => {
      let form = forms[forms.length - 1];            
      this.router.navigate([route], { state: { form } } );
    });
  }
}
