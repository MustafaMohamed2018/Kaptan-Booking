import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TimeSelectComponent } from './time-select/time-select.component';

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent {
  constructor(
    private router:Router,
    private dialog:MatDialog
  ) {
  }
  

  form:any;


  formGroup:FormGroup;
  firstForm;
  ngOnInit(): void {
    this.formGroup = this.form.controls.second;
    this.firstForm = this.form.controls.first;

    console.log(this.formGroup)
  }
  
  save() {
    console.log(this.form);
    if(this.form.valid) {
      this.router.navigate(['/2'])
    }
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
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: `, result);
      if(result) this.formGroup.setValue(result);
    });
  }
  


}