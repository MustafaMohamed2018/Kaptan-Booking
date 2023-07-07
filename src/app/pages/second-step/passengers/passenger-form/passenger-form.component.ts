import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { Gender } from 'src/app/shared/enums/enums';

@Component({
  selector: 'app-passenger-form',
  templateUrl: './passenger-form.component.html',
  styleUrls: ['./passenger-form.component.scss']
})
export class PassengerFormComponent {
  @Input('passengerForm') passengerForm;
  @Input('passengersList') passengersList = [];
  @Input('inEdit') inEdit = false;

  @Output('btnClicked') btnClicked = new EventEmitter();
  Gender = Gender;
  

  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.Turkey, CountryISO.UnitedStates, CountryISO.UnitedKingdom];


  submit(f) {
    console.log(this.passengerForm)
    if(this.passengerForm.valid) this.btnClicked.emit(true)
  }
  
}
