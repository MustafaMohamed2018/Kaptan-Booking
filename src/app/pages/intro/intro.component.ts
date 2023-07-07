import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
 

  form:FormGroup;
  
  ngOnInit(): void {
    this.form = new FormGroup({
      first: new FormGroup({
        type:new FormControl(null, Validators.required),
        airport:new FormControl(null, Validators.required),
        tripNumber:new FormControl(null, Validators.required),
        deliveryLocation:new FormControl(null, Validators.required),
      }),
      second:new FormGroup({
        date:new FormControl(null, Validators.required),
        time:new FormControl(null, Validators.required),
        passengers:new FormControl(null, Validators.required)
      })
    })
  }
  

  activateRoute(ev) {
    console.log(ev);
    console.log(ev.form)
    ev.form = this.form;
  }
}
