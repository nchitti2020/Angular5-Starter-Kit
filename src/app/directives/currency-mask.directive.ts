import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { NgControl } from '@angular/forms';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[formControlName][currencyMask]',
    exportAs: 'currencyMask'
})
export class CurrencyMaskDirective implements OnInit {
    private readonly NumberDigits: string = '0123456789 .,';
    private readonly MaxInputLength: number = 12;

    private element: HTMLInputElement;
    private prevViewVal: string;
    private prevCursorPos: number;
    private currCursorPos: number;
    private suppressValueChanges = false;

    constructor(
        private elementRef: ElementRef,
        private control: NgControl,
        private currency: CurrencyPipe,
        private decimal: DecimalPipe
    ) { }

    ngOnInit(): void {
        this.element = this.elementRef.nativeElement;

        if (this.element.value.trim() !== '') {
            this.formatDisplay(false);
        }
    }

    @HostListener('input') onInput(): void {
        const val: string = this.element.value;
        this.handleInput(val);
    }

    @HostListener('keyup') onKeyUp(): void {
        this.moveCursorAfter$();
    }

    @HostListener('click') onClick(): void {
        this.moveCursorAfter$();
    }

    @HostListener('focus') onFocus(): void {
        this.moveCursorAfter$();
    }

    @HostListener('blur') onBlur(): void {
        this.suppressValueChanges = true;
        this.formatDisplay();
    }

    public format(): void {
        setTimeout(() => {
            this.formatDisplay();
        }, 100);
    }

    private formatDisplay(toSet: boolean = true): void {
        const val: string = this.element.value;

        if (val.trim() === '$') {
            this.control.reset('');
            this.control.valueAccessor.writeValue('');
        }

        if (val.trim() !== '') {
            const floatString: string = this.toFloatString(val);
            const formatedString: string = this.currency.transform(floatString, 'USD', true, '.2-2');
            this.control.reset(floatString);
            this.control.valueAccessor.writeValue(formatedString);
            this.prevViewVal = formatedString;
        }

        this.setDirty(toSet);
        this.setTouched(toSet);
    }

    /**
     * The methods calls other helper methods to do:
     * 1. Mask inputs
     * 2. Set model and view data
     * 3. Set current cursor position
     * @param val
     */
    private handleInput(val: string): void {
        this.currCursorPos = this.element.selectionStart;

        if (val.includes('$')) {
            val = val.replace('$', '');
        }

        if (!this.validateInput(val) || this.getIntegerDigitCount(val) > this.MaxInputLength) {
            this.control.reset(this.toFloatString(this.prevViewVal));
            this.control.valueAccessor.writeValue(this.prevViewVal);
            this.setCursorPos(this.prevCursorPos);
        } else {
            this.control.reset(this.toFloatString(val));
            this.control.valueAccessor.writeValue(`$${val}`);
            this.setCursorPos(this.isSingleNumberDigit(val) ? 2 : this.currCursorPos);
            this.prevViewVal = `$${val}`;
        }

        this.prevCursorPos = this.element.selectionStart;
    }

    /**
     * Set cursor to right position
     * @param pos
     */
    private setCursorPos(pos: number): void {
        this.element.selectionStart = pos;
        this.element.selectionEnd = pos;
    }

    /**
     * If cursor goes before $ sign, move it after the $ sign.
     */
    private moveCursorAfter$(): void {
        if (this.element.selectionStart === 0) {
            this.element.selectionStart = 1;
            this.element.selectionEnd = 1;
        }

        this.prevCursorPos = this.element.selectionStart;
    }

    /**
     * To check if an input is valid or not.
     * @param val
     */
    private validateInput(val: string): boolean {
        let hasDot = false;

        for (const c of val) {
            if (hasDot && c === '.') {
                return false;
            }

            if (c === '.') {
                hasDot = true;
            }

            if (!this.NumberDigits.includes(c)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Convert a formated currency string to a float number.
     * @param val
     */
    private toFloatString(val: string): string {
        if (!val) {
            return '';
        }

        const rectfiedString: string = val.replace('$', '').replace(/,/g, '').replace(/ /g, '');
        return String(Math.round(Number(rectfiedString) * 100) / 100);
    }

    /**
     * Count the digits of a number string.
     * @param val
     */
    private getIntegerDigitCount(val: string): number {
        const rectfiedString: string = val.replace('$', '').replace(/,/g, '').replace(/ /g, '');

        const index: number = rectfiedString.indexOf('.');
        if (index < 0) {
            return rectfiedString.length;
        } else {
            return index;
        }
    }

    /**
     * Check if a char is a number digit or not.
     * @param val
     */
    private isSingleNumberDigit(val: string): boolean {
        return this.NumberDigits.includes(val) && val.length === 1;
    }

    /**
     * Set the control as dirty.
     */
    private setDirty(isDirty: boolean = true): void {
        if (isDirty) {
            this.control.control.markAsDirty({ onlySelf: true });
        }
    }

    /**
     * Set the control as touched.
     */
    private setTouched(isTouched: boolean = true): void {
        if (isTouched) {
            this.control.control.markAsTouched({ onlySelf: true });
        }
    }
}
