import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { IntroComponent } from './intro/intro.component';
import { FirstStepComponent } from './first-step/first-step.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SharedModule } from '../shared/shared.module';
import { SecondStepComponent } from './second-step/second-step.component';
import { NgxMatTimepickerModule } from 'src/ngx-mat-timepicker/ngx-mat-timepicker.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TimeSelectComponent } from './second-step/time-select/time-select.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    IntroComponent,
    FirstStepComponent,
    SecondStepComponent,
    TimeSelectComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatRadioModule,
    MatButtonToggleModule,
    SharedModule,
    NgxMatTimepickerModule,
    NgxMatTimepickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatListModule,
    MatRippleModule,
    MatDividerModule
  ]
})
export class PagesModule { }
