import { TokenInterceptorService } from './services/token-interceptor.service';
import { TokenStorageService } from './services/token-storage.service';
import { EvenementService } from './services/evenement.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './_guards/auth.guard';
import { AuthService } from './services/auth.service';


//import { AuthService } from '../services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SuiviActiviteComponent } from './suivi-activite/suivi-activite.component';
import { FullCalendarModule } from '@fullcalendar/angular'; 
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
import { EditUserComponent } from './user/admin/edit-user/edit-user/edit-user.component';
import { ListUserComponent } from './user/admin/list-user/list-user/list-user.component';
import { JwtModule } from '@auth0/angular-jwt';
import { SuiviComponent } from './suivi/suivi.component';
import { DetailsActiviteComponent } from './details-activite/details-activite.component';
import { HomeUserComponent } from './home-user/home-user.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { ExtractActiviteComponent } from './extract-activite/extract-activite.component';
import { ExtractRoadmapComponent } from './extract-roadmap/extract-roadmap.component';
import { AddActiviteComponent } from './add-activite/add-activite.component';
import { ListActiviteComponent } from './list-activite/list-activite.component';
import { AddProfilComponent } from './add-profil/add-profil.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddStructureComponent } from './add-structure/add-structure.component';
import { ListStructuresComponent } from './list-structures/list-structures.component';

export function momentAdapterFactory() {
  return adapterFactory(moment);
};








export function tokenGetter() {
  return localStorage.getItem("access_token");
}


@NgModule({
  declarations: [
    AppComponent,
   // HeaderComponent,
    ConnexionComponent,
    HomeComponent,
    FooterComponent,
    SuiviActiviteComponent,
    FormSuiviActiviteComponent,
    RoadmapComponent,
    ParametresComponent,
    StructuresSideBarComponent,
    ProfilsSettingsComponent,
    SettingsComponent,
    NotificationComponent,
    DashboardComponent,
    EditUserComponent,
    ListUserComponent,
    HeaderComponent,
    SuiviComponent,
    DetailsActiviteComponent,
    HomeUserComponent,
    ExtractActiviteComponent,
    ExtractRoadmapComponent,
    AddActiviteComponent,
    ListActiviteComponent,
    AddProfilComponent,
    ListUsersComponent,
    AddStructureComponent,
    ListStructuresComponent,
    
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
    MatDividerModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://127.0.0.1:8000"],
        disallowedRoutes: [""],
      },
    }),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
  ],

  providers: [AuthService, AuthGuard, UserService, EvenementService, TokenStorageService,BsModalRef,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }