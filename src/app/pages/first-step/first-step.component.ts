import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Airport, FlightType } from 'src/app/shared/enums/enums';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit {
  Airport = Airport;
  FlightType = FlightType;
  parent;
  constructor(
    private router:Router,
    private activedRoute:ActivatedRoute,
    public apiService:ApiService
  ) {
    setTimeout(() => {
      this.parent.step = this.activedRoute.snapshot.data.step
    })
  }

  form:any;


  changeType(value) {
    console.log(value);
    if(value == FlightType.ToAirPort) {
      this.formGroup.controls['trip_number'].setValidators(null);
      this.formGroup.controls['trip_number'].updateValueAndValidity();

      this.formGroup.controls['room_number'].setValidators(Validators.required);
      this.formGroup.controls['room_number'].updateValueAndValidity();
      this.form.updateValueAndValidity();
    } else {
      this.formGroup.controls['trip_number'].setValidators(Validators.required);
      this.formGroup.controls['trip_number'].updateValueAndValidity();

      this.formGroup.controls['room_number'].setValidators(null);
      this.formGroup.controls['room_number'].updateValueAndValidity();
      
      this.form.updateValueAndValidity();
    }
  }

  formGroup:FormGroup;
  ngOnInit(): void {
    this.formGroup = this.form.controls.first;

    console.log(this.formGroup)
  }
  
  save() {
    console.log(this.form);
    if(this.formGroup.valid) {
      this.router.navigate(['/2'])
    }
  }
}


/*
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      (mousedown)="startDragging($event)"
      (touchstart)="startDragging($event)"
    >
      <!-- Clock face -->
      <circle cx="50" cy="50" r="45" fill="#f2f2f2" />
      
      <!-- Hour hand -->
      <line
        [attr.x1]="clockCenterX"
        [attr.y1]="clockCenterY"
        [attr.x2]="hourHandX"
        [attr.y2]="hourHandY"
        stroke="#333"
        stroke-width="4"
      />
      
      <!-- Minute hand -->
      <line
        [attr.x1]="clockCenterX"
        [attr.y1]="clockCenterY"
        [attr.x2]="minuteHandX"
        [attr.y2]="minuteHandY"
        stroke="#666"
        stroke-width="2"
      />

      <!-- Clock center point -->
      <circle cx="50" cy="50" r="2" fill="#333" />

      <!-- Digital time input -->
      <input [(ngModel)]="selectedTime" type="text" (change)="updateHands()" />

    </svg>
  `,
  styles: [
    `
      svg {
        width: 200px;
        height: 200px;
      }
      
      input {
        margin-top: 10px;
        width: 100px;
        padding: 5px;
      }
    `
  ]
})
export class TimePickerComponent {
  @Input() selectedTime: string = '12:00'; // Initial time in HH:MM format

  private clockRadius: number = 45;
  private clockCenterX: number = 50;
  private clockCenterY: number = 50;

  // Hour hand coordinates
  get hourHandX(): number {
    const hour = this.getSelectedHour();
    return (
      this.clockCenterX + (this.clockRadius * 0.5) * Math.sin(hourToRadians(hour))
    );
  }

  get hourHandY(): number {
    const hour = this.getSelectedHour();
    return (
      this.clockCenterY - (this.clockRadius * 0.5) * Math.cos(hourToRadians(hour))
    );
  }

  // Minute hand coordinates
  get minuteHandX(): number {
    const minute = this.getSelectedMinute();
    return (
      this.clockCenterX + (this.clockRadius * 0.8) * Math.sin(minuteToRadians(minute))
    );
  }

  get minuteHandY(): number {
    const minute = this.getSelectedMinute();
    return (
      this.clockCenterY - (this.clockRadius * 0.8) * Math.cos(minuteToRadians(minute))
    );
  }

  // Convert selected time to hour and minute values
  private getSelectedHour(): number {
    const [hour] = this.selectedTime.split(':');
    return parseInt(hour, 10);
  }

  private getSelectedMinute(): number {
    const [, minute] = this.selectedTime.split(':');
    return parseInt(minute, 10);
  }

  // Update selected time based on hand positions
  updateHands(): void {
    const hour = Math.round(radiansToHour(Math.atan2(this.hourHandX - this.clockCenterX, -this.hourHandY + this.clockCenterY)));
    const minute = Math.round(radiansToMinute(Math.atan2(this.minuteHandX - this.clockCenterX, -this.minuteHandY + this.clockCenterY)));

    this.selectedTime = `${padZero(hour)}:${padZero(minute)}`;
  }

  // Drag handlers for rotating clock hands
  startDragging(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    const isTouchEvent = event.type.startsWith('touch');
    const moveEvent = isTouchEvent ? 'touchmove' : 'mousemove';
    const endEvent = isTouchEvent ? 'touchend' : 'mouseup';

    const clockElement = document.querySelector('svg');

    if (clockElement) {
      clockElement.addEventListener(moveEvent, dragClockHandler);
      clockElement.addEventListener(endEvent, stopDragging);
    }

    function dragClockHandler(e: MouseEvent | TouchEvent): void {
      const rect = clockElement.getBoundingClientRect();
      const clientX = isTouchEvent ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = isTouchEvent ? (e as TouchEvent).touches[0].clientY :
*/