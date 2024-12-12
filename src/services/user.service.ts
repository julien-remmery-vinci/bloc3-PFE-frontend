import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from 'src/types/Company';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:3000/user'; // Replace with your API endpoint
  private companyUrl = 'http://127.0.0.1:3000/company/user';

  constructor(private http: HttpClient) {}

  getCompany(): Observable<Company> {
    return this.http.get<Company>(this.companyUrl);
  }
}
