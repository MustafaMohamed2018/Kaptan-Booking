import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeSelectComponent } from '../second-step/time-select/time-select.component';
import { MatDialog } from '@angular/material/dialog';
import { Airport, FlightType } from 'src/app/shared/enums/enums';
import { ApiService } from 'src/app/api.service';
import { DatePipe } from '@angular/common';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.scss'],
  providers:[DatePipe]
})
export class ThirdStepComponent {
  parent;
  form;
  Airport = Airport;
  
  constructor(
    private activedRoute:ActivatedRoute,
    private router:Router,
    private dialog:MatDialog,
    public  apiService:ApiService,
    private datePipe:DatePipe,
  ) {
    setTimeout(() => {
      this.parent.step = this.activedRoute.snapshot.data.step
    })
  }

  formGroup:FormGroup | any;
  firstForm;
  ngOnInit(): void {
    this.formGroup = this.form.controls.second;
    this.firstForm = this.form.controls.first;

    console.log(this.formGroup)
  }

  public color: ThemePalette = 'primary';
  minDate = new Date();
  closedDate() {
    this.formGroup.controls.time.setValue(new Date(this.formGroup.controls.date.value).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }))
  }


  
  save() {
    console.log(this.form);
    if(this.form.invalid) return;

    let value = {...this.form.value.first, ...this.form.value.second, guest_notes:this.form.value.guest_notes};
    value = JSON.parse(JSON.stringify(value));

    console.log(value);

    value.passengers = value.passengers.map(p => {
      if(p.phone) {
        p.phone_code = p.phone.dialCode;
        p.phone = p.phone.number;
      } else {
        p.phone_code = value.passengers[0].phone_code;
        p.phone = value.passengers[0].phone;
      }

      p.identity_number  = 54545454545;
      return p;
    });


    value.transfer_date_time = this.datePipe.transform(value.date, 'yyyy-M-dd') + ' ' + value.time+':00';
    value.number_of_passengers = value.passengers.length;
    value.price = this.apiService.selectedCar.price;

    this.apiService
    console.log(value);

    this.apiService.saveOrder(value).subscribe( r => {
      console.log(r);
      this.router.navigate(['/order-sucess'], {replaceUrl: true})
    })
    // if(this.form.valid) {
    //   this.router.navigate(['/2'])
    // }
  }
  
  openDialog() {
    let date = new Date();
    if(this.formGroup.controls['date'].value) date = new Date(this.formGroup.controls['date'].value);
    else {
      date.setDate(date.getDate() + 1)
    }
    let data = {
      date: date,
      time: this.formGroup.controls['time'].value || new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }
    const dialogRef = this.dialog.open(TimeSelectComponent, {
      panelClass:'time-dialog',
      data,
      maxWidth:'100%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: `, result);
      if(result) this.formGroup.patchValue(result);
    });
  }


}
