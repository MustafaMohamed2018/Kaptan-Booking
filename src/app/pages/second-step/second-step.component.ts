import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent {
  constructor(
    private router:Router,
    private dialog:MatDialog
  ) {}
  
  form:any;

  changeType(value) {
    console.log(value);
    // if(value == 'up') {
    //   this.formGroup.controls['tripNumber'].setValidators(null);
    //   this.formGroup.controls['tripNumber'].updateValueAndValidity();
    //   this.form.updateValueAndValidity();
    // } else {
    //   this.formGroup.controls['tripNumber'].setValidators(Validators.required);
    //   this.formGroup.controls['tripNumber'].updateValueAndValidity();
    //   this.form.updateValueAndValidity();
    // }
  }

  formGroup:FormGroup;
  ngOnInit(): void {
    this.formGroup = this.form.controls.first;

    console.log(this.formGroup)
  }
  
  save() {
    console.log(this.form);
    if(this.form.valid) {
      this.router.navigate(['/2'])
    }
  }
}
