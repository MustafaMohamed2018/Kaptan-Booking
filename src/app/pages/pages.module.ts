import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { IntroComponent } from './intro/intro.component';
import { FirstStepComponent } from './first-step/first-step.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    IntroComponent,
    FirstStepComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatRadioModule,
    MatButtonToggleModule,
    SharedModule
  ]
})
export class PagesModule { }
