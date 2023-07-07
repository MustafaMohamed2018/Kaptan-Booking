import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Airport, FlightType } from 'src/app/shared/enums/enums';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
 

  constructor(
    private activedRoute:ActivatedRoute
  ) {
    setTimeout(() => {
      console.log(this.activedRoute.snapshot)
    }, 10)
  }

  form:FormGroup;
  
  ngOnInit(): void {
    this.form = new FormGroup({
      first: new FormGroup({
        type:new FormControl(FlightType.FromAirPort, Validators.required),
        airport:new FormControl(Airport.Istanbul, Validators.required),
        tripNumber:new FormControl(null, Validators.required),
        deliveryLocation:new FormControl(null, Validators.required),
      }),
      second:new FormGroup({
        date:new FormControl(null, Validators.required),
        time:new FormControl(null, Validators.required),
        passengers:new FormControl(null, Validators.required),
        car: new FormControl(null, Validators.required)
      }),
      notes:new FormControl(null),
    });

    this.activedRoute.data.subscribe(r => {
      console.log(r)
    })
  }
  

  step = 1;
  activateRoute(ev) {
    ev.parent = this;
    ev.form = this.form;
  }
}
