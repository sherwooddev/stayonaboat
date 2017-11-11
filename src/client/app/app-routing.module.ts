import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoatListComponent } from './boat-list/boat-list.component';
import { AddBoatComponent } from './add-boat/add-boat.component';
import { UpdateBoatComponent } from './update-boat/update-boat.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'boats',
    pathMatch: 'full'
  },
  {
    path: 'boats',
    component: BoatListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: AddBoatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update/:id',
    component: UpdateBoatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'boats'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
