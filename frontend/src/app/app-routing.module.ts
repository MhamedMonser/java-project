import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { TranslatorFormComponent } from './translator-form/translator-form.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './auth.guard';
import { TranslatorProfileUpdateComponent } from './tarnslator-profile-update/tarnslator-profile-update.component';
import { SearchComponent } from './search/search.component';
import { TranslatorsListComponent } from './translators-list/translators-list.component';
import { ShowOneTransaltorComponent } from './show-one-transaltor/show-one-transaltor.component';
// import { VideoComponent } from './video-compnent/video-compnent.component';
// import {  VideoListComponent } from './video-list/video-list.component';



import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { TranslatorLayoutComponent } from './layouts/translator-layout/translator-layout.component';
import { MeetingComponent } from './meeting/meeting.component';
import { VideoComponent } from './video-compnent/video-compnent.component';
import { VideoListComponent } from './video-list/video-list.component';
import { AdminLayoutComponent } from './admin-dash/admin-layout/admin-layout.component';




const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'createTranslator',
    component: TranslatorFormComponent,
    canActivate: [AuthGuard], // Apply the guard to this route
  }, 
  {path: 'translators/edit/:id', component: TranslatorProfileUpdateComponent,},
  { path: 'home' , component : HomeComponent},
  { path: 'nav' , component : NavbarComponent},
  { path: 'search' , component : SearchComponent},
  { path: 'translator-list' , component : TranslatorsListComponent},
  { path: 'translator-info/:id' , component : ShowOneTransaltorComponent},
  // { path: 'video' , component : VideoComponent},
  // { path: 'videoList' , component : VideoListComponent},
  { path: '' , component : HomeComponent},
  { path: 'meeting' , component : MeetingComponent},
  { path: 'videos/:id' , component : VideoComponent},
  { path: 'videoList' , component : VideoListComponent},
    //admin dashboard
    {
      path: 'admin',
      redirectTo: 'admin-dashboard',
      pathMatch: 'full',
    }, {
      path: '',
      component: AdminLayoutComponent,
      children: [
          {
        path: '',
        loadChildren: () => import('./admin-dash/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
    }]},
  {
    path: 'user-dash',
    redirectTo: 'user-dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: TranslatorLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/translator-layout/translator-layout.module').then(x => x.TranslatorLayoutModule)
  }]},
  {
    path: '**',
    redirectTo: ''
  }
    //admin dashboard
 

];


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
