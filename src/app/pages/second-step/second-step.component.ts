import { Component } from '@angular/core';
import { FormControlDirective, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeSelectComponent } from './time-select/time-select.component';
import { ApiService } from 'src/app/api.service';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss'],
  providers: [FormControlDirective, FormGroupDirective]
})
export class SecondStepComponent {
  parent
  Airport = {};
  
  constructor(
    private router:Router,
    private dialog:MatDialog,
    private activedRoute:ActivatedRoute,
    public  apiService:ApiService
  ) {
    setTimeout(() => {
      this.parent.step = this.activedRoute.snapshot.data.step
    })
  }
  

  form:any;


  formGroup:FormGroup | any;
  firstForm;
  ngOnInit(): void {
    this.Airport = this.apiService.assets['airportsEnum'];

    this.formGroup = this.form.controls.second;

    this.firstForm = this.form.controls.first;

    // combineLatest([
    //   (this.form.controls.first as FormGroup).controls.type.valueChanges,
    //   (this.form.controls.second as FormGroup).controls.passengers.valueChanges
    // ]).pipe(
    //   startWith([
    //     (this.form.controls.first as FormGroup).controls.type.value,
    //     (this.form.controls.second as FormGroup).controls.passengers.value
    //   ]),
    // ).subscribe(r => {
    //   console.log('combineLatest', r);
    //   let params = {
    //     type : r[0],
    //     number_of_customer : r[1]?.length,
    //     airport_id : this.form.controls.first.value.airport_id
    //   };
  
    //   this.apiService.cars = [];
    //   if(params.number_of_customer) this.apiService.getCars(params).subscribe(data => {
    //     this.apiService.cars = data['cars']
    //   })
    // });

    // zip([
    //   (this.form.controls.first as FormGroup).controls.type.valueChanges,
    //   (this.form.controls.second as FormGroup).controls.passengers.valueChanges
    // ]).pipe(
    //   startWith([
    //     (this.form.controls.first as FormGroup).controls.type.value,
    //     (this.form.controls.second as FormGroup).controls.passengers.value
    //   ]),
    // ).subscribe(r => {
    //   console.log('zip', r);
    //   let params = {
    //     type : r[0],
    //     number_of_customer : r[1]?.length,
    //     airport_id : this.form.controls.first.value.airport_id
    //   };
  
    //   this.apiService.cars = [];
    //   if(params.number_of_customer) this.apiService.getCars(params).subscribe(data => {
    //     this.apiService.cars = data['cars']
    //   })
    // });

  }
  
  openToggle(toggle) {
    console.log(toggle)
  }

  selectCar(car) {
    this.formGroup.controls.car_model_id.setValue(car.id);
    this.apiService.selectedCar = car;
  }

  save() {
    console.log(this.form);
    if(this.form.valid) {
      this.router.navigate(['/2'])
    }
  }


  public color: ThemePalette = 'primary';
  minDate = new Date();

  closedDate() {
    this.formGroup.controls.time.setValue(new Date(this.formGroup.controls.date.value).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }))
  }


  openDialog() {
    let date = new Date();
    if(this.formGroup.controls['date'].value) date = new Date(this.formGroup.controls['date'].value);
    else {
      date.setDate(date.getDate() + 1)
    }
    let data = {
      date: date,
      time: this.formGroup.controls['time'].value || new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false })
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