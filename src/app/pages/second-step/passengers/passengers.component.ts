import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
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
  constructor(
    private router:Router
  ) {
    // this.passengersForm = new FormGroup({
    //   // name:new FormControl(null, Validators.required),
    //   // gender: new FormControl(1, Validators.required),
    //   // phone : new FormControl(null, Validators.required),
    //   // email : new FormControl(null, [Validators.required, Validators.email]),
    //   passengers:new FormArray([], Validators.required)
    // })

    this.addPassenger();
    for(let key in CountryISO) {
      this.CountryISOReversed[CountryISO[key]] = key
    }
  }

  ngOnInit(): void {
    this.passengersList = this.form.controls.second.controls.passengers.value || [];
  }


  addPassenger(data = {}) {
    this.passengersForm = null;
    this.passengersForm = new FormGroup({
      name:new FormControl(null, Validators.required),
      gender: new FormControl(1, Validators.required),
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
      name:new FormControl(null, Validators.required),
      gender: new FormControl(1, Validators.required),
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

      console.log(this.passengersList);

      // f.resetForm();
      this.addPassenger();
      // f.resetForm();
    }
  }






  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.Turkey, CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});

	changePreferredCountries() {
		this.preferredCountries =  [CountryISO.Turkey, CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	}
  




  save() {
    console.log(this.form);

    this.form.controls.second.controls.passengers.setValue(this.passengersList);
    this.router.navigate(['/2'])
  }
}
