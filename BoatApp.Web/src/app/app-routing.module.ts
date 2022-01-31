import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoatListComponent } from './boat-list/boat-list.component';
import { BoatDetailComponent } from './boat-detail/boat-detail.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGardService } from './Services/auth-gard.service';
import { Roles } from './Models/Role';

const routes: Routes = [
  { path: '', component: BoatListComponent, canActivate: [AuthGardService], data : {Roles :[Roles.Admin, Roles.Reader]} },
  { path: 'boat/:id', component: BoatDetailComponent, canActivate: [AuthGardService], data : {Roles :[Roles.Admin, Roles.Reader]} },
  { path: 'boat', component: BoatDetailComponent, canActivate: [AuthGardService], data : {Roles :[Roles.Admin, Roles.Reader]} },
  { path: 'login', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
