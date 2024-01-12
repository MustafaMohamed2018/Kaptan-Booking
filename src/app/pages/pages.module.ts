import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { IntroComponent } from './intro/intro.component';
import { FirstStepComponent } from './first-step/first-step.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SharedModule } from '../shared/shared.module';
import { SecondStepComponent } from './second-step/second-step.component';
import { NgxMatClockTimepickerModule } from 'src/ngx-mat-timepicker/ngx-mat-timepicker.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TimeSelectComponent } from './second-step/time-select/time-select.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { PassengersComponent } from './second-step/passengers/passengers.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { PassengerFormComponent } from './second-step/passengers/passenger-form/passenger-form.component';
// import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MatCardModule } from '@angular/material/card';
import { ThirdStepComponent } from './third-step/third-step.component';
// import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { OrderSucessComponent } from './order-sucess/order-sucess.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    IntroComponent,
    FirstStepComponent,
    SecondStepComponent,
    TimeSelectComponent,
    PassengersComponent,
    PassengerFormComponent,
    ThirdStepComponent,
    OrderSucessComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatRadioModule,
    MatButtonToggleModule,
    SharedModule,
    NgxMatClockTimepickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatListModule,
    MatRippleModule,
    MatDividerModule,
    NgxIntlTelInputModule,
    MatCardModule,

    // NgxMatDatetimePickerModule,
    // NgxMatTimepickerModule,
    // NgxMatNativeDateModule,

    MatProgressSpinnerModule,
    MatStepperModule
    // NgxMatIntlTelInputComponent
  ]
})
export class PagesModule { }
