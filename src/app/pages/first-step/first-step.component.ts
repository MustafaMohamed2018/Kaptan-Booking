import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit {

  form:any;

  changeType(value) {
    console.log(value);
    if(value == 'up') {
      this.formGroup.controls['tripNumber'].setValidators(null);
      this.formGroup.controls['tripNumber'].updateValueAndValidity();
      this.form.updateValueAndValidity();
    } else {
      this.formGroup.controls['tripNumber'].setValidators(Validators.required);
      this.formGroup.controls['tripNumber'].updateValueAndValidity();
      this.form.updateValueAndValidity();

    }
  }

  formGroup:FormGroup;
  ngOnInit(): void {
    this.formGroup = this.form.controls.first;

    console.log(this.formGroup)
  }
  
  save() {
    console.log(this.form)
  }
}
