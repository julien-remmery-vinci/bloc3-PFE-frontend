import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/types/User';
import { Form } from 'src/types/Form';
import { Company } from 'src/types/Company';
import { CompanyService } from 'src/services/company.service';
import { UserService } from 'src/services/user.service';
import { ScoreService } from 'src/services/score.service';
import { FormService } from 'src/services/form.service';


@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent {
  form: any;
  score: any;
  user:any;
  company:any;
  searchTerm: string = ''; // Search bar input
  filterTerm: string = ''; // Dropdown filter
  progressMap: { [key: string]: number } = {}; // Map to store progress by company ID
  

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private authService: AuthService,
    private router: Router,
    private scoreService : ScoreService,
    private formService: FormService
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
    this.companyService.getForms(this.company.company_id!).subscribe((forms) => {
      this.form= forms.forms[0]!;
      this.fillScoreMap(this.form.form_id);
    });
  }

  fillScoreMap(id:number):void{
    this.scoreService.getScoreFromFormId(id).subscribe((score)=>{
      this.score = score;
    });
  }

  navigateTo(form: Form): void {
    this.router.navigate([`/forms/${form.type.toLowerCase()}/validate`], {
      state: { form },
    });
  }
}
