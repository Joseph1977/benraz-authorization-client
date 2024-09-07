import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormArray } from '@angular/forms';

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
        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
            this.validateFormGroup(control);
        } else if (control instanceof FormArray) {
            control.controls.forEach(x => this.validateControl(x));
        }
    }

    private validateFormGroup(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            this.validateControl(formGroup.get(field));
        });
    }
}
