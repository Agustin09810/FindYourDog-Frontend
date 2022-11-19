import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DogbyzoneComponent } from './components/dogbyzone/dogbyzone.component';
import { ChatPreviewComponent } from './components/chat/chat-preview/chat-preview.component';
import { LoginComponent } from './components/login/login.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { ChatComponent } from './components/chat/chat.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AddEditPostComponent } from './components/add-edit-post/add-edit-post.component';
import { Page404Component } from './components/page404/page404.component';
import { Page500Component } from './components/page500/page500.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'zone/:zoneId', component: DogbyzoneComponent },
  { path: 'chats', component: ChatPreviewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'zone/:zoneId/:post-view-Id', component: PostViewComponent },
  { path: 'myposts', component: MyPostsComponent },
  { path: 'chats/:targetUsername/:chatId', component: ChatComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'addpost', component: AddEditPostComponent },
  { path: 'editpost/:postId', component: AddEditPostComponent },
  { path: 'error404', component: Page404Component },
  { path: 'error500', component: Page500Component }

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
