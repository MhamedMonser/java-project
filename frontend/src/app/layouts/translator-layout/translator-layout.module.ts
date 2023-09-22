import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../lbd/lbd-chart/lbd.module';

import { translatorLayoutRoutes } from './translator-layout.routing';

import { HomeComponent } from '../home/home.component';
import { UserComponent } from '../user/user.component';
import { TransscheduleComponent } from '../schedule/trans.schedule.component';
import { RecurrenceEditorModule, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { CounterComponent } from '../counter/counter.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(translatorLayoutRoutes),
    FormsModule,
    LbdModule,
    ScheduleModule, 
    RecurrenceEditorModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    TransscheduleComponent,
    CounterComponent
  ]
})

export class TranslatorLayoutModule {}
