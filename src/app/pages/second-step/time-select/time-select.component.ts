import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-time-select',
  templateUrl: './time-select.component.html',
  styleUrls: ['./time-select.component.scss']
})
export class TimeSelectComponent implements OnInit{
  min = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<TimeSelectComponent>,
  ) {
  }


  defaultTime = '00:00 AM';

  form:FormGroup;

  timeChanged(ev) {
    console.log(ev);
  }


  showTime = false;
  ngOnInit(): void {
    console.log(this.data);

    this.data.date.setHours(0);
    this.data.date.setMinutes(0);
    this.data.date.setSeconds(0);

    this.form = new FormGroup({
      time: new FormControl(this.data.time, Validators.required),
      date: new FormControl(this.data.date, Validators.required)
    });
  }


  changeDateTime() {
    this.form.controls['date'].setValue(this.data.date)
    this.form.controls['time'].setValue(this.data.time)
  }

  submit() {
    console.log('submit');
    if(this.form.invalid) return;
    this.dialogRef.close(this.data)
  }
  
  reset() {
    const currentDate = new Date();
    const clock = currentDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });

    this.data.date = currentDate;
    this.data.time = clock;

    this.form.controls['date'].setValue(currentDate);

    this.form.controls['time'].setValue(clock)
  }

}
