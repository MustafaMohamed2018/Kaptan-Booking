import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeSelectComponent } from '../second-step/time-select/time-select.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.scss']
})
export class ThirdStepComponent {
  parent;
  form;

  constructor(
    private activedRoute:ActivatedRoute,
    private router:Router,
    private dialog:MatDialog,
  ) {
    setTimeout(() => {
      this.parent.step = this.activedRoute.snapshot.data.step
    })
  }

  formGroup:FormGroup;
  firstForm;
  ngOnInit(): void {
    this.formGroup = this.form.controls.second;

    console.log(this.formGroup)
  }
  
  save() {
    console.log(this.form);
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
