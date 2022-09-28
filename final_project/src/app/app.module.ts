import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarInfComponent } from './components/navbar-inf/navbar-inf.component';
import { UploadbuttonComponent } from './components/navbar-inf/uploadbutton/uploadbutton.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarInfComponent,
    UploadbuttonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
