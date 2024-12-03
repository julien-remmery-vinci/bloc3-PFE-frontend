import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from "./app/app.component";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LoginComponent} from "./pages/login/login.component";
import {FormsComponent} from "./pages/forms/forms.component";
import {BrowserModule} from "@angular/platform-browser";
import {SidebarComponent} from "./assets/sidebar/sidebar.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http"; // Importez le module de routage

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    FormsComponent,
    SidebarComponent

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
