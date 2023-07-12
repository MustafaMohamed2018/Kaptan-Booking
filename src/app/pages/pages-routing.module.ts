import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { FirstStepComponent } from './first-step/first-step.component';
import { SecondStepComponent } from './second-step/second-step.component';
import { PassengersComponent } from './second-step/passengers/passengers.component';
import { ThirdStepComponent } from './third-step/third-step.component';

const routes: Routes = [
  {
    path:'',
    component:IntroComponent,
    children:[
      {
        path:'1',
        component:FirstStepComponent,
        data:{
          step:1,
          reuseComponent:true
        }
      },
      {
        path:'2',
        component:SecondStepComponent,
        data:{
          step:2,
          reuseComponent:true
        }
      },
      {
        path:'add-passenger',
        component:PassengersComponent,
        data:{
          step:2,
          reuseComponent:true
        }
      },
      {
        path:'3',
        component: ThirdStepComponent,
        data:{
          step:3,
          reuseComponent:true
        }
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
