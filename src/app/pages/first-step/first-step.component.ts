import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Airport, FlightType } from 'src/app/shared/enums/enums';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit {
  Airport = Airport;
  FlightType = FlightType;
  parent;
  constructor(
    private router:Router,
    private activedRoute:ActivatedRoute,
    public apiService:ApiService
  ) {
    setTimeout(() => {
      this.parent.step = this.activedRoute.snapshot.data.step
    })
  }

  form:any;


  changeType(value) {
    if(value == FlightType.ToAirPort) {
      this.formGroup.controls['trip_number'].setValidators(null);
      this.formGroup.controls['trip_number'].updateValueAndValidity();

      this.formGroup.controls['room_number'].setValidators(Validators.required);
      this.formGroup.controls['room_number'].updateValueAndValidity();
      this.form.updateValueAndValidity();
    } else {
      this.formGroup.controls['trip_number'].setValidators(Validators.required);
      this.formGroup.controls['trip_number'].updateValueAndValidity();

      this.formGroup.controls['room_number'].setValidators(null);
      this.formGroup.controls['room_number'].updateValueAndValidity();
      
      this.form.updateValueAndValidity();
    }
  }

  formGroup:FormGroup;
  ngOnInit(): void {
    this.formGroup = this.form.controls.first;

    console.log(this.formGroup)
  }
  
  save() {
    console.log(this.form);
    if(this.formGroup.valid) {
      this.router.navigate(['/2'])
    }
  }
}