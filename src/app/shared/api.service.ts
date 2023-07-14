import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription, combineLatest, finalize, skip, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://kaptanvip.com/dev/api/v1/c/request/'
  api;
  domainName;

  hasOpenedPassneger = false;

  constructor(
    private httpClient:HttpClient
  ) {

    // let urlSplit = window.location.href.split('/');
    // let requestIndex = urlSplit.indexOf('request');
    // if(requestIndex >= 0) {
    //   this.domainName = urlSplit[urlSplit.indexOf('request') + 1] + '/'
    // } else this.domainName = 'doubletreesirkeci/'

    this.api += this.domainName

    console.log('constructor');
    console.log(window.location.href)
  }

  assets;
  getAssets() {
   return this.httpClient.get(this.baseUrl, {params:{slug:this.domainName}});
  }

  cars;
  selectedCar
  getCars(params) {
    return this.httpClient.post(this.api +'car/list', params)
  }
  
  
  
  saveOrder(params) {
    return this.httpClient.post( this.api + 'booking', params)
  }


  isGettingCars = false;
  listenRequ:Subscription;
  carsSubscription:Subscription;
  listenToChanges(form:FormGroup) {
    if(this.listenRequ) this.listenRequ.unsubscribe();
    
    this.listenRequ = combineLatest([
      (form.controls.first as FormGroup).controls.type.valueChanges,
      (form.controls.second as FormGroup).controls.passengers.valueChanges
    ]).pipe(
      startWith([
        null,null
        // (form.controls.first as FormGroup).controls.type.value,
        // (form.controls.second as FormGroup).controls.passengers.value
      ]),
      // skip(1)
    ).subscribe(r => {
      console.log('combineLatest', r);
      let params = {
        type : r[0],
        number_of_customer : r[1]?.length,
        airport_id : form.controls.first.value.airport_id
      };
  
      this.cars = [];
      this.selectedCar = null;
      (form.controls.second as FormGroup).controls.car_model_id.setValue(null);

      if(params.number_of_customer) {
        this.isGettingCars = true;
        if(this.carsSubscription) this.carsSubscription.unsubscribe();
        this.carsSubscription = this.getCars(params)
        .pipe(
          finalize(() => this.isGettingCars = false)
        )
        .subscribe(res => {
          this.cars = res['data']['cars']
          console.log(this.cars);
        })
      }
    });
  }
}
