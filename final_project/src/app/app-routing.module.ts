import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DogbyzoneComponent } from './components/dogbyzone/dogbyzone.component';
import { ChatPreviewComponent } from './components/chat/chat-preview/chat-preview.component';
import { LoginComponent } from './components/login/login.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { AddEditPostComponent } from './components/add-edit-post/add-edit-post.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'zone/:zoneId', component: DogbyzoneComponent },
  { path: 'chat', component: ChatPreviewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'zone/:zoneId/:post-view-Id', component: PostViewComponent },
  { path: 'addpost/:step', component: AddEditPostComponent },

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
