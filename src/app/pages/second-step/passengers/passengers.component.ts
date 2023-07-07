import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent {
  form:FormGroup;
  constructor() {
    this.form = new FormGroup({
      name:new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      phone : new FormControl(null, Validators.required),
      email : new FormControl(null, [Validators.required, Validators.email]),
    })
  }

  submit () {
    console.log(this.form)
  }
}
