import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {Component, EventEmitter, HostBinding, Input, OnInit, Output, TemplateRef} from "@angular/core";
import {CdkOverlayOrigin, ConnectedPosition, Overlay, OverlayRef} from "@angular/cdk/overlay";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ThemePalette} from "@angular/material/core";
//
import {NgxMatTimepickerConfig} from "../../models/ngx-mat-timepicker-config.interface";
import {NgxMatTimepickerFormatType} from "../../models/ngx-mat-timepicker-format.type";
import {NgxMatTimepickerAdapter} from "../../services/ngx-mat-timepicker-adapter";
import {NgxMatTimepickerEventService} from "../../services/ngx-mat-timepicker-event.service";
import {NgxMatTimepickerDirective} from "../../directives/ngx-mat-timepicker.directive";
import {NgxMatTimepickerRef} from "../../models/ngx-mat-timepicker-ref.interface";
import {NgxMatTimepickerDialogComponent} from "../ngx-mat-timepicker-dialog/ngx-mat-timepicker-dialog.component";
import {NGX_MAT_TIMEPICKER_CONFIG} from "../../tokens/ngx-mat-timepicker-config.token";
//
import {DateTime} from "ts-luxon";
import {BehaviorSubject} from "rxjs";
import { NgxMatTimepickerLocaleService } from "src/ngx-mat-timepicker/services/ngx-mat-timepicker-locale.service";

let config: NgxMatTimepickerConfig;

@Component({
    selector: "ngx-mat-clock-timepicker",
    template: `
		<!-- <ng-template
				cdkConnectedOverlay
				[cdkConnectedOverlayPositions]="overlayPositions"
				[cdkConnectedOverlayHasBackdrop]="!0"
				cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
				(backdropClick)="close()"
				[cdkConnectedOverlayOrigin]="overlayOrigin"
				[cdkConnectedOverlayOpen]="showPicker">
			<ngx-mat-timepicker-standalone>

            </ngx-mat-timepicker-standalone>
            
		</ng-template> -->
        <ngx-mat-timepicker-dialog *ngIf="config"  ></ngx-mat-timepicker-dialog>
        `,
    providers: [
        {
            provide: NGX_MAT_TIMEPICKER_CONFIG, useFactory() {
                return config;
            }
        }
    ]
})
export class NgxMatClockTimepickerComponent implements NgxMatTimepickerRef, OnInit {

    static nextId: number = 0;

    @Input()
    set appendToInput(newValue: boolean | string | void) {
        this._appendToInput = coerceBooleanProperty(newValue);
    }

    @Input()
    set color(newValue: ThemePalette) {
        this._color = newValue;
    }

    get color(): ThemePalette {
        return this._color;
    }

    get disabled(): boolean {
        return this._timepickerInput && this._timepickerInput.disabled;
    }

    @Input()
    set enableKeyboardInput(newValue: boolean | string | void) {
        this._enableKeyboardInput = coerceBooleanProperty(newValue);
    }

    get enableKeyboardInput(): boolean {
        return this._enableKeyboardInput;
    }

    get format(): NgxMatTimepickerFormatType {
        return this._timepickerInput ? this._timepickerInput.format : this._format;
    }

    @Input()
    set format(value: NgxMatTimepickerFormatType) {
        this._format = NgxMatTimepickerAdapter.isTwentyFour(value) ? 24 : 12;
    }

    get inputElement(): HTMLElement {
        return this._timepickerInput && this._timepickerInput.element;
    }

    get maxTime(): DateTime {
        return this._timepickerInput ? (this._timepickerInput.max as DateTime) : this.max;
    }

    get minTime(): DateTime {
        return this._timepickerInput ? (this._timepickerInput.min as DateTime) : this.min;
    }

    get minutesGap(): number {
        return this._minutesGap;
    }

    @Input()
    set minutesGap(gap: number) {
        if (gap == null) {
            return;
        }
        gap = Math.floor(gap);
        this._minutesGap = gap <= 59 ? gap : 1;
    }

    get overlayOrigin(): CdkOverlayOrigin {
        return this._timepickerInput ? this._timepickerInput.cdkOverlayOrigin : void 0;
    }

    get time(): string {
        return this._timepickerInput && this._timepickerInput.value;
    }

    @Input() cancelBtnTmpl: TemplateRef<Node>;
    @Output() closed = new EventEmitter<void>();
    @Input() confirmBtnTmpl: TemplateRef<Node>;
    @Input() defaultTime: string;
    @Input() disableAnimation: boolean;
    @Input() editableHintTmpl: TemplateRef<Node>;
    @Output() hourSelected = new EventEmitter<number>();
    @Input() hoursOnly = false;
    @HostBinding("id") id: string = `ngx_mat_timepicker_${++NgxMatClockTimepickerComponent.nextId}`;
    @Input() isEsc = !0;
    @Input() max: DateTime;
    @Input() min: DateTime;
    @Output() opened = new EventEmitter<void>();
    overlayPositions: ConnectedPosition[] = [
        {
            originX: "center",
            originY: "bottom",
            overlayX: "center",
            overlayY: "top",
            offsetY: 0
        },
        {
            originX: "center",
            originY: "top",
            overlayX: "center",
            overlayY: "bottom",
            offsetY: 0
        }
    ];
    @Input() preventOverlayClick: boolean;
    showPicker: boolean = !1;
    @Output() timeChanged = new EventEmitter<string>();
    @Input() timepickerClass: string;
    @Output() timeSet = new EventEmitter<string>();
    timeUpdated = new BehaviorSubject<string>(void 0); // used in the dialog, check if a better approach can be used

    private _appendToInput: boolean = !1;
    private _color: ThemePalette = "primary";
    private _dialogRef: MatDialogRef<NgxMatTimepickerDialogComponent, void>;
    private _enableKeyboardInput: boolean = !1;
    private _format: NgxMatTimepickerFormatType = 12;
    private _minutesGap: number;
    private _overlayRef: OverlayRef;
    private _timepickerInput: NgxMatTimepickerDirective;

    constructor(
        private ngxMatTimepickerLocaleService:NgxMatTimepickerLocaleService,
        private _eventService: NgxMatTimepickerEventService,
                private _dialog: MatDialog,
                private _overlay: Overlay) {
    }
    ngOnInit(): void {
        this.open();
    }

    close(): void {
        if (this._appendToInput) {
            this._overlayRef && this._overlayRef.dispose();
        }
        else {
            this._dialogRef && this._dialogRef.close();
        }
        this.inputElement.focus(); // Fix ExpressionHasChangedAfterCheck error on overlay destroy
        this.showPicker = !1;
        this.closed.emit();
    }

    config = {};
    open(): void {
        // Set data to be injected
        this.config = {
            timepickerBaseRef: this,
            time: this.time,
            defaultTime: this.defaultTime,
            maxTime: this.maxTime !== undefined ? this.maxTime : 0,
            minTime: this.minTime !== undefined ? this.minTime : 0,
            format: this.format,
            minutesGap: this.minutesGap,
            disableAnimation: this.disableAnimation,
            cancelBtnTmpl: this.cancelBtnTmpl,
            confirmBtnTmpl: this.confirmBtnTmpl,
            editableHintTmpl: this.editableHintTmpl,
            disabled: this.disabled,
            enableKeyboardInput: this.enableKeyboardInput,
            preventOverlayClick: this.preventOverlayClick,
            appendToInput: this._appendToInput,
            hoursOnly: this.hoursOnly,
            timepickerClass: this.timepickerClass,
            inputElement: this.inputElement,
            color: this.color
        };
        this.ngxMatTimepickerLocaleService.config = this.config;
        if (this._appendToInput) {
            this.showPicker = !0;
        }
        else {
            // this._dialogRef = this._dialog.open(NgxMatTimepickerDialogComponent, {
            //     panelClass: "ngx-mat-timepicker-dialog",
            //     data: {
            //         ...this.config
            //     }
            // });
            // this._dialogRef
            //     .afterClosed()
            //     .subscribe(() => {
            //         this.closed.emit();
            //     });
        }
        this.opened.emit();
    }

    /***
     * Register an input with this timepicker.
     * input - The timepicker input to register with this timepicker
     */
    registerInput(input: NgxMatTimepickerDirective): void {
        if (this._timepickerInput) {
            console.warn("Input for this timepicker was already set", input.element);
            throw Error("A Timepicker can only be associated with a single input.");
        }
        this._timepickerInput = input;
    }

    unregisterInput(): void {
        this._timepickerInput = void 0;
    }

    updateTime(time: string): void {
        this.timeUpdated.next(time);
    }
}
