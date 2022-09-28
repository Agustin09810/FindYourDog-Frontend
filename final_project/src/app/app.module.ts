import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarInfComponent } from './components/navbar-inf/navbar-inf.component';
import { UploadbuttonComponent } from './components/navbar-inf/uploadbutton/uploadbutton.component';
import { NavbarSupComponent } from './components/navbar-sup/navbar-sup.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarInfComponent,
    UploadbuttonComponent,
    NavbarSupComponent
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
