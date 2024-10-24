import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, UntypedFormArray } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class ValidationService {

    constructor() {
    }

    validate(control: AbstractControl) {
        this.validateControl(control);
    }

    private validateControl(control: AbstractControl) {
        if (control instanceof UntypedFormControl) {
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof UntypedFormGroup) {
            this.validateFormGroup(control);
        } else if (control instanceof UntypedFormArray) {
            control.controls.forEach(x => this.validateControl(x));
        }
    }

    private validateFormGroup(formGroup: UntypedFormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            this.validateControl(formGroup.get(field));
        });
    }
}
