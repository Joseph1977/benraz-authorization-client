import { Component, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../shared/notification/notification.service';

@Component({
    selector: 'app-claim',
    templateUrl: './claim.component.html',
encapsulation: ViewEncapsulation.None
})
export class ClaimComponent {
    form: UntypedFormGroup;

    constructor(
        private fb: UntypedFormBuilder,
        private notificationService: NotificationService,
        private dialogRef: MatDialogRef<ClaimComponent>) {
        this.form = this.fb.group({
            type: ['claim', Validators.required],
            value: ['', Validators.required]
        });
    }

    save() {
        this.validateAllFormFields(this.form);
        if (!this.form.valid) {
            this.notificationService.formValidationError();
            return;
        }

        this.dialogRef.close(this.form.value);
    }

    private validateAllFormFields(formGroup: UntypedFormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            formGroup.get(field).markAsTouched({ onlySelf: true });
        });
    }
}
