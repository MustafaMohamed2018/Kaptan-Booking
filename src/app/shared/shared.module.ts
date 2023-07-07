import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    NgxValidateCoreModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
    
  ]
})
export class SharedModule { }
