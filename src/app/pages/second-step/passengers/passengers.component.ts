import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { Gender } from 'src/app/shared/enums/enums';
// import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit {
  form;

  passengersForm:FormGroup;

  passengersList = [];

  CountryISOReversed = {};
  parent
  constructor(
    private router:Router,
    private activedRoute:ActivatedRoute
  ) {
    setTimeout(() => {
      this.parent.step = this.activedRoute.snapshot.data.step
    })

    this.addPassenger();
    for(let key in CountryISO) {
      this.CountryISOReversed[CountryISO[key]] = key
    }
  }

  ngOnInit(): void {
    this.passengersList = this.form.controls.second.controls.passengers.value || [];
  }

  Gender = Gender;

  addPassenger(data = {}) {
    this.passengersForm = null;
    this.passengersForm = new FormGroup({
      full_name:new FormControl(null, Validators.required),
      gender: new FormControl(Gender.Male, Validators.required),
    });


    if(!this.passengersList.length) {
      this.passengersForm.addControl('email',  new FormControl(null, [Validators.required, Validators.email]) );
      this.passengersForm.addControl('phone',  new FormControl(null, [Validators.required]) );
    }
    
    this.passengersForm.patchValue(data);
  }

  editForm:FormGroup;
  activeEditIndex = null;
  editPassenger(index) {
    this.editForm = null;
    this.activeEditIndex = index;
    let value = this.passengersList[index];

    this.editForm = new FormGroup({
      full_name:new FormControl(null, Validators.required),
      gender: new FormControl(Gender.Male, Validators.required),
    });

    if(index === 0) {
      this.editForm.addControl('email',  new FormControl(null, [Validators.required, Validators.email]) );
      this.editForm.addControl('phone',  new FormControl(null, [Validators.required]) );
    }

    this.editForm.patchValue(value);
  }


  updatePassenger(action) {
    if(action) {
      if(this.editForm.valid) {
        let value = {...this.editForm.value};
        if(value.phone) {
          value.phone.countryName = this.CountryISOReversed[value.phone.countryCode.toLowerCase()]
        }
        this.passengersList[this.activeEditIndex] = value;
  
        this.form.controls.second.controls.passengers.setValue(this.passengersList);

        this.activeEditIndex = null;
        this.editForm = null;
      }
    }
    else this.activeEditIndex = null;
  }


  delete(i) {
    this.passengersList.splice(i,1);
  }

  submit (v) {
    console.log(this.passengersForm);

    if(this.passengersForm.valid) {
      let value = {...this.passengersForm.value};
      if(value.phone) {
        value.phone.countryName = this.CountryISOReversed[value.phone.countryCode.toLowerCase()]
      }
      this.passengersList.push(value);

      this.form.controls.second.controls.passengers.setValue(this.passengersList);

      console.log(this.passengersList);

      // f.resetForm();
      this.addPassenger();
      // f.resetForm();
    }
  }



  save() {
    console.log(this.form);

    this.form.controls.second.controls.passengers.setValue(this.passengersList);
    this.router.navigate(['/2'])
  }
}
