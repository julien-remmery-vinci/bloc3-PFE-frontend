import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from "./app/app.component";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LoginComponent} from "./pages/login/login.component";
import {FormsComponent} from "./pages/forms/forms.component";
import {BrowserModule} from "@angular/platform-browser";
import {SidebarComponent} from "./assets/sidebar/sidebar.component"; // Importez le module de routage

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    FormsComponent,
    SidebarComponent

  ],
  imports: [
    // ... autres modules
    AppRoutingModule, // Ajoutez le module de routage ici
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
