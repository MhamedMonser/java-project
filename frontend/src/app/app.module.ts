import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatorFormComponent } from './translator-form/translator-form.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TranslatorProfileUpdateComponent } from './tarnslator-profile-update/tarnslator-profile-update.component';
import { SearchComponent } from './search/search.component';
import { ScheduleModule, RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';
import { TranslatorsListComponent } from './translators-list/translators-list.component';
import { ShowOneTransaltorComponent } from './show-one-transaltor/show-one-transaltor.component';

// import { VideoListComponent } from './video-list/video-list.component';
// import { VideoComponent } from './video-compnent/video-compnent.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { NavbarModule } from './layouts/shared/navbar/navbar.module';
import { SidebarModule } from './layouts/sidebar/sidebar.module';

import { TranslatorLayoutComponent } from './layouts/translator-layout/translator-layout.component';
import { MeetingComponent } from './meeting/meeting.component';
import { VideoComponent } from './video-compnent/video-compnent.component';
import { VideoListComponent } from './video-list/video-list.component';
import { AdminLayoutComponent } from './admin-dash/admin-layout/admin-layout.component';
import { Sidebar2Module } from "./admin-dash/sidebar/sidebar2.module";
import { Navbar2Module } from './admin-dash/shared/navbar2/navbar2.module';

// import { CommonModule } from '@angular/common';






@NgModule({
    declarations: [
        AppComponent,
        RegistrationComponent,
        LoginComponent,
        TranslatorFormComponent,
        HomeComponent,
        NavbarComponent,
        TranslatorProfileUpdateComponent,
        SearchComponent,
        TranslatorsListComponent,
        ShowOneTransaltorComponent,
        AdminLayoutComponent,
        TranslatorLayoutComponent,
        MeetingComponent,
        VideoComponent,
        VideoListComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        ScheduleModule,
        RecurrenceEditorModule,
        // CommonModule, 
        BrowserAnimationsModule,
        RouterModule,
        NavbarModule,
        SidebarModule,
        Sidebar2Module,
        Navbar2Module
    ]
})
export class AppModule { }
