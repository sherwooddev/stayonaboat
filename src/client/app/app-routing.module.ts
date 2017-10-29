import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoatListComponent } from './boat-list/boat-list.component';
import { AddBoatComponent } from './add-boat/add-boat.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'boats',
    pathMatch: 'full'
  },
  {
    path: 'boats',
    component: BoatListComponent
  },
  {
    path: 'new',
    component: AddBoatComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
