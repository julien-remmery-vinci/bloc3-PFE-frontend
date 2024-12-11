import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Form } from 'src/types/Form';
import {FormService} from "../../services/form.service";
import {ThemeService} from "../../app/theme/theme.service";

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit{
  forms: any[] = [];

  constructor(private router: Router, private formService:FormService, protected themeService:ThemeService
  ) {}

  ngOnInit() {
    this.getForms().subscribe(forms => {
      this.forms = forms;
    });
  }

  getForms(): Observable<Form[]> {
    return this.formService.getUserForms()
  }

  // TODO : SUPPRIMER
  exempleClick() {
    this.router.navigate([`/forms/esg/complete`], { state: { form: null } });
  }

  onFormClick(form: Form): void {
    this.router.navigate([`/forms/${form.type.toLowerCase()}/complete`], { state: { form } });
  }
}