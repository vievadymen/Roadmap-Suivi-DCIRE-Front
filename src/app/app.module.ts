
import { AuthService } from '../services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SuiviActiviteComponent } from './suivi-activite/suivi-activite.component';
import { ActiviteREXComponent } from './activite-rex/activite-rex.component';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FormSuiviActiviteComponent } from './form-suivi-activite/form-suivi-activite.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDividerModule } from "@angular/material/divider";
import { RoadmapComponent } from './roadmap/roadmap.component';
import { ParametresComponent } from './parametres/parametres.component';
import { StructuresSideBarComponent } from './structures-side-bar/structures-side-bar.component';
import { ProfilsSettingsComponent } from './profils-settings/profils-settings.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationComponent } from './notification/notification.component';
import { DashboardComponent } from './dashboard/dashboard.component';








FullCalendarModule.registerPlugins([ 
  interactionPlugin,
  dayGridPlugin
]);



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConnexionComponent,
    HomeComponent,
    FooterComponent,
    SuiviActiviteComponent,
    ActiviteREXComponent,
    FormSuiviActiviteComponent,
    RoadmapComponent,
    ParametresComponent,
    StructuresSideBarComponent,
    ProfilsSettingsComponent,
    SettingsComponent,
    NotificationComponent,
    DashboardComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    HttpClientModule,
    NoopAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    ReactiveFormsModule
  

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
