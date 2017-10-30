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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BoatListComponent,
    BoatComponent,
    AddBoatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
