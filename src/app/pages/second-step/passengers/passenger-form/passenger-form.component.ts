import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { Subscription, debounceTime } from 'rxjs';
import { Gender } from 'src/app/shared/enums/enums';

@Component({
  selector: 'app-passenger-form',
  templateUrl: './passenger-form.component.html',
  styleUrls: ['./passenger-form.component.scss']
})
export class PassengerFormComponent implements OnInit, AfterViewInit{
  // @ViewChild('nameInput') nameInput:ElementRef<HTMLInputElement>;

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

  subsciption:Subscription;
  ngOnInit(): void {
    console.log(this);
    if(!this.inEdit) {
      this.subsciption = (this.passengerForm as FormGroup).valueChanges.pipe(debounceTime(2000)).subscribe( r => {
        if(this.passengerForm.valid && this.passengerForm.value.email) {
          this.btnClicked.emit(true)
        }
      })
    }
    
  }
  
  ngAfterViewInit(): void {
    // if(!this.passengersList.length) {
    //   this.nameInput.nativeElement.focus();
    // }
  }

  submit(f) {
    console.log(this.passengerForm)
    if(this.passengerForm.valid) {
      if(this.subsciption) this.subsciption.unsubscribe();
      this.btnClicked.emit(true);
    }
  }
  
}
