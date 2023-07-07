import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
// import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent {
  passengersForm:FormGroup;

  passengersList = [];

  CountryISOReversed = {};
  constructor() {
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


  addPassenger(data = {}) {
    // let passengers = this.passengersForm.controls.passengers as FormArray;
    this.passengersForm = null;

    
    // setTimeout(() => {
      this.passengersForm = new FormGroup({
        name:new FormControl(null, Validators.required),
        gender: new FormControl(1, Validators.required),
      });

  
      let phonev = {"number":"+201024267254","internationalNumber":"+20 102 426 7254","nationalNumber":"0102 426 7254","e164Number":"+201024267254","countryCode":"EG","dialCode":"+20"}
      if(!this.passengersList.length) {
        this.passengersForm.addControl('email',  new FormControl(null, [Validators.required, Validators.email]) );
        this.passengersForm.addControl('phone',  new FormControl(phonev, [Validators.required]) );
      }
      
      this.passengersForm.patchValue(data);
    // })

    
  }

  delete(i) {
    this.passengersList.splice(i,1);
  }

  submit (f) {
    console.log(this.passengersForm);

    if(this.passengersForm.valid) {
      let value = {...this.passengersForm.value};
      if(value.phone) {
        value.phone.countryName = this.CountryISOReversed[value.phone.countryCode.toLowerCase()]
      }
      this.passengersList.push(value);

      console.log(this.passengersList);

      f.resetForm();
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
  
}
