import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-sucess',
  templateUrl: './order-sucess.component.html',
  styleUrls: ['./order-sucess.component.scss']
})
export class OrderSucessComponent {
  constructor(
    private router:Router
  ){
  }
  route() {
    this.router.navigate(['/'], {replaceUrl:true})
  }
}
