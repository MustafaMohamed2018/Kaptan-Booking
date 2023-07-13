import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { Airport, FlightType } from 'src/app/shared/enums/enums';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
 

  constructor(
    private activedRoute:ActivatedRoute,
    public apiService:ApiService
  ) {
  }

  form:FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      first: new FormGroup({
        type:new FormControl(null, Validators.required),
        airport_id:new FormControl(Airport.Istanbul, Validators.required),
        trip_number:new FormControl(null, Validators.required),
        room_number:new FormControl(null),
        delivery_location:new FormControl(null, Validators.required),
      }),
      second:new FormGroup({
        date:new FormControl(null, Validators.required),
        time:new FormControl(null, Validators.required),
        passengers:new FormControl(null, Validators.required),
        car_model_id: new FormControl(null, Validators.required)
      }),
      guest_notes:new FormControl(null),
    });

    this.apiService.listenToChanges(this.form);

    (this.form.controls.first as FormGroup).controls.type.setValue(FlightType.FromAirPort);



    this.apiService.getAssets().subscribe(r => {
      console.log(r['data'])
      this.apiService.assets = r['data'];
      this.apiService.assets['airportsEnum'] = { };
      for(let item of r['data'].airports) {
        this.apiService.assets['airportsEnum'][item.id] = item.name;
        this.apiService.assets['airportsEnum'][item.name] = item.id;
      }
      (this.form.controls.first as FormGroup).controls.airport_id.setValue(r['data'].airports[0].id);
      
      (this.form.controls.first as FormGroup).controls.delivery_location.setValue(r['data'].client);
    })
  }
  

  step = 1;
  activateRoute(ev) {
    ev.parent = this;
    ev.form = this.form;
  }
}
