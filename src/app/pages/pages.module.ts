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


@NgModule({
  declarations: [
    IntroComponent,
    FirstStepComponent,
    SecondStepComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatRadioModule,
    MatButtonToggleModule,
    SharedModule,
    NgxMatTimepickerModule,
  ]
})
export class PagesModule { }
