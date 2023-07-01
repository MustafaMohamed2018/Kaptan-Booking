import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

      })
    })
  }

}
