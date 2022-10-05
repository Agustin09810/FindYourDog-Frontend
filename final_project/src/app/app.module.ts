import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ZoneComponent } from './components/zone/zone.component';

import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { GridComponent } from './components/grid/grid.component';
import { NavbarInfComponent } from './components/navbar-inf/navbar-inf.component';
import { UploadbuttonComponent } from './components/navbar-inf/uploadbutton/uploadbutton.component';
import { NavbarSupComponent } from './components/navbar-sup/navbar-sup.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoginInputComponent } from './components/login/login-input/login-input.component';
import { LoginButtonComponent } from './components/login/login-button/login-button.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/chat/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    ZoneComponent,
    GridComponent,
    NavbarInfComponent,
    UploadbuttonComponent,
    NavbarSupComponent,
    HomeComponent,
    LoginComponent,
    LoginInputComponent,
    LoginButtonComponent,
    ChatComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
