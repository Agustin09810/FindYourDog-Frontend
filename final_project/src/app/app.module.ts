import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ZoneComponent } from './components/zone/zone.component';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { GridComponent } from './components/grid/grid.component';
import { NavbarSupComponent } from './components/navbar-sup/navbar-sup.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoginInputComponent } from './components/login/login-input/login-input.component';
import { LoginButtonComponent } from './components/login/login-button/login-button.component';
import { DogbyzoneComponent } from './components/dogbyzone/dogbyzone.component';
import { DogsGridComponent } from './components/dogbyzone/dogs-grid/dogs-grid.component';
import { PostComponent } from './components/dogbyzone/post/post.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/chat/message/message.component';
import { ChatPreviewComponent } from './components/chat/chat-preview/chat-preview.component';
import { UserPreviewComponent } from './components/user-preview/user-preview.component';
import { PostCarouselComponent } from './components/post-carousel/post-carousel.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AddEditPostComponent } from './components/add-edit-post/add-edit-post.component';
import { ImageUploadComponent } from './components/add-edit-post/image-upload/image-upload.component';
import { UploadButtonComponent } from './components/add-edit-post/image-upload/upload-button/upload-button.component';
import { DogNameComponent} from './components/add-edit-post/dog-name/dog-name.component';
import { DogGenderComponent } from './components/add-edit-post/dog-gender/dog-gender.component';
import { DogBreedComponent } from './components/add-edit-post/dog-breed/dog-breed.component';
import { DogDateZoneComponent } from './components/add-edit-post/dog-date-zone/dog-date-zone.component';
import { DogPhotosComponent } from './components/add-edit-post/dog-photos/dog-photos.component';
import { Page404Component } from './components/page404/page404.component';
import { Page500Component } from './components/page500/page500.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ConfirmedComponent } from './components/sign-up/confirmed/confirmed.component';

import { AuthInterceptor } from './interceptors/auth-interceptor';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    ZoneComponent,
    GridComponent,
    NavbarSupComponent,
    HomeComponent,
    LoginComponent,
    LoginInputComponent,
    LoginButtonComponent,
    DogbyzoneComponent,
    DogsGridComponent,
    ChatComponent,
    MessageComponent,
    ChatPreviewComponent,
    UserPreviewComponent,
    PostCarouselComponent,
    PostComponent,
    PostViewComponent,
    MyPostsComponent,
    SettingsComponent,
    AddEditPostComponent,
    ImageUploadComponent,
    UploadButtonComponent,
    DogNameComponent,
    DogGenderComponent,
    DogBreedComponent,
    DogDateZoneComponent,
    DogPhotosComponent,
    Page404Component,
    Page500Component,
    SpinnerComponent,
    SignUpComponent,
    ConfirmedComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
