import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DogbyzoneComponent } from './components/dogbyzone/dogbyzone.component';
import { ChatPreviewComponent } from './components/chat/chat-preview/chat-preview.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'zone/:zoneId', component: DogbyzoneComponent },
  { path: 'chat', component: ChatPreviewComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
