import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationComponent } from './notification/notification.component';
import { ParametresComponent } from './parametres/parametres.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { SuiviActiviteComponent } from './suivi-activite/suivi-activite.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { HomeComponent } from "./home/home.component";
import { SettingsComponent } from "./settings/settings.component";


const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'home', component:  HomeComponent,
  children: [
      {
        path: 'dashboard', component: DashboardComponent,
      },
      {
        path: 'suivi-activite', component: SuiviActiviteComponent, 
      },
      {
        path: 'roadmap', component: RoadmapComponent, 
      },
      {
        path: 'settings', component: SettingsComponent,
      },
      {path: 'notifications', component:NotificationComponent},

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    ],
  },
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
