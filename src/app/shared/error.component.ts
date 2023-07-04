import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from "@angular/core";
import { ValidationErrorComponent } from "@ngx-validate/core";

@Component({
  selector:'app-error',
  template: `
    <span class="invalid-feedback font-weight-bold" *ngFor="let error of errors; trackBy: trackByFn">
      <!-- <mat-icon>
        error
      </mat-icon> -->
      {{ error.message  | translate:error.params}}
    </span>
  `,
  styles:[`
  
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ErrorComponent extends ValidationErrorComponent {

}
