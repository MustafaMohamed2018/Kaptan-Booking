import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  get translateService () {
    return this.injector.get(TranslateService);
  }
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private injector: Injector,
    // private translateService:TranslateService
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Blob) {
        } else {
          console.log(error);
          if (error.status == 0)
            this.openSnackBar('Error0', null, 'error');
          else if (error.status == 404)
            this.openSnackBar('Error404', null, 'error');
          else if (error.status == 500) this.openSnackBar('Error500', null, 'error');
          else if(error.status == 422) this.openSnackBar(error.error.message, null, 'error');
          else this.openSnackBar('ErrorUnknown', null, 'error');
        }
        return throwError(error);
      })
    );
  }

  openSnackBar(
    title,
    button = null,
    panelClass = 'success',
    horizontalPosition: MatSnackBarHorizontalPosition = 'right',
    verticalPosition: MatSnackBarVerticalPosition = 'top'
  ) {
    this._snackBar.open(
      this.translateService.instant(title),
      button ? this.translateService.instant(button) : null,
      {
        horizontalPosition,
        verticalPosition,
        panelClass,
        duration: 5000,
      }
    );
  }
}


