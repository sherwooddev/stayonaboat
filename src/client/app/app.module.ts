import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { BoatListComponent } from './boat-list/boat-list.component';
import { BoatComponent } from './boat/boat.component';
import { AddBoatComponent } from './add-boat/add-boat.component';
import { ApiService } from './shared/api.service';
import { AuthService } from './shared/auth.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { UpdateBoatComponent } from './update-boat/update-boat.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BoatListComponent,
    BoatComponent,
    AddBoatComponent,
    LoginComponent,
    UpdateBoatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ApiService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
