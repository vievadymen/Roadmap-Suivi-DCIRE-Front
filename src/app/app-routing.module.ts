import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationComponent } from './notification/notification.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { SuiviActiviteComponent } from './suivi-activite/suivi-activite.component';
import { ExtractRoadmapComponent } from './extract-roadmap/extract-roadmap.component';
import { ExtractActiviteComponent } from './extract-activite/extract-activite.component';
import { AddActiviteComponent } from './add-activite/add-activite.component';
import { ListActiviteComponent } from './list-activite/list-activite.component';
import { NgModule, LOCALE_ID,Component } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { SuiviComponent } from "./suivi/suivi.component";
import { SettingsComponent } from "./settings/settings.component";
import { AuthGuard } from './_guards/auth.guard';
import { HomeUserComponent } from './home-user/home-user.component';
import { Role } from './models/role';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddProfilComponent } from './add-profil/add-profil.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { BrowserModule } from '@angular/platform-browser';


registerLocaleData(localeFr);



const routes: Routes = [
  {path: 'connexion', component: ConnexionComponent },
  {path: 'suivi', component: SuiviComponent,  canActivate: [AuthGuard],
    children: [
      {path: 'accueil-user', component: HomeUserComponent,canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
      {
        path: 'accueil', component: DashboardComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]},
      },
      {
        path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]},
        children: [
          {path: 'list-users', component:ListUsersComponent,} ,
          {path: 'add-profil', component:AddProfilComponent,} ,
        ]
      },
      {
        path:'activite', component:SuiviActiviteComponent, canActivate: [AuthGuard],
        children: [
          {path: 'add-activite', component: AddActiviteComponent, canActivate: [AuthGuard]},
          {path: 'list-activite', component: ListActiviteComponent, canActivate: [AuthGuard]},
          { path: '', redirectTo: 'list-activite', pathMatch: 'full' },
        ]
      },
      {
        path: 'roadmap', component:RoadmapComponent, canActivate: [AuthGuard],
      },

         { path: 'extract-activite', component:ExtractActiviteComponent,  },
  
         {path: 'extract-roadmap', component:ExtractRoadmapComponent },

      { path: '', redirectTo: 'accueil', pathMatch: 'full' },
      {
        path: 'notifications', component:NotificationComponent
      },
    ]
    },
  {
    path: 'settings', component: SettingsComponent,
  },
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
];

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  imports: [RouterModule.forRoot(routes),
            BrowserModule,
            FullCalendarModule // register FullCalendar with you app
  ],
  exports: [RouterModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'},
  ]
})
export class AppRoutingModule {
  
 }
