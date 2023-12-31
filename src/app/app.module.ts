import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxValidateCoreModule } from '@ngx-validate/core';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorComponent } from './shared/error.component';
import { AppRouteReuseStrategy } from './router-custome-strategy';
import { RouteReuseStrategy } from '@angular/router';
import { HttpConfigInterceptor } from './shared/http.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
      defaultLanguage: ( localStorage.getItem('lang') == 'null' || !localStorage.getItem('lang')) ? 'en' : localStorage.getItem('lang') 
    }),
    NgxValidateCoreModule.forRoot({
      blueprints: {
        required:'Errors.required',
        min: "لا يجب أن تقل قيمة هذا الحقل عن {{ min }}",
        max: "لا يجب أن تزيد قيمة هذا الحقل عن {{ max }}",
        minDate:'لا يجب أن يقل تاريخ البدء عن {{ minDate }}',
        maxDate:'لا يجب أن يزيد تاريخ الإنتهاء {{ maxDate }}',
        lessThanStart: 'تاريخ هذا الحقل لا يجب أن يكون قبل تاريخ البدء',
        matchError:'Errors.Match',
        minlength:'Errors.minLength',
        maxlength:'Errors.maxLength',
        email:'Errors.email',
        checkError:'Errors.check',
        cantBeNegative:'Errors.cantBeNegative',
        notValidInteger:'Errors.notValidInteger',
        NoZeros:'قيمة غير صالحة',
        validatePhoneNumber:'Errors.validatePhoneNumber'
      },
      errorTemplate: ErrorComponent,
      targetSelector: '.form-group',
    }),
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: AppRouteReuseStrategy},
    {
      provide : HTTP_INTERCEPTORS , useClass: HttpConfigInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
