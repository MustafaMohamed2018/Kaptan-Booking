import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { FirstStepComponent } from './first-step/first-step.component';
import { SecondStepComponent } from './second-step/second-step.component';
import { PassengersComponent } from './second-step/passengers/passengers.component';

const routes: Routes = [
  {
    path:'',
    component:IntroComponent,
    children:[
      {
        path:'1',
        component:FirstStepComponent
      },
      {
        path:'2',
        component:SecondStepComponent
      },
      {
        path:'add-passenger',
        component:PassengersComponent
      },
      {
        path:'',
        redirectTo:'1',
        pathMatch:'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
