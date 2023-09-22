import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../lbd/lbd-chart/lbd.module';

import { adminLayoutRoutes } from './admin-layout.routing';

import { Home2Component } from '../home/home.component';
import { User2Component } from '../user/user.component';
import { Tables2Component } from '../tables/tables.component';
import { RecurrenceEditorModule, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { VidComponent } from '../videoList/user.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(adminLayoutRoutes),
    FormsModule,
    LbdModule,
    ScheduleModule, 
    RecurrenceEditorModule,
    ReactiveFormsModule
  ],
  declarations: [
    Home2Component,
    User2Component,
    Tables2Component,
    VidComponent
  ]
})

export class AdminLayoutModule {}
