import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout'; // NEED for flex

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecurityService } from './services/security.service';
import { SecurityListComponent } from './components/security-list/security-list.component';
import { SecurityCardComponent } from './components/security-list/security-card/security-card.component';
import { SecurityDetailsComponent } from './components/security-list/security-details/security-details.component';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    SecurityListComponent,
    SecurityCardComponent,
    SecurityDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [ SecurityService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
