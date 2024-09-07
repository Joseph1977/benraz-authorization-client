import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../shared/notification/notification.service';

@Component({
    selector: 'app-claim',
    templateUrl: './claim.component.html',
})
export class ClaimComponent {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
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

    private validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            formGroup.get(field).markAsTouched({ onlySelf: true });
        });
    }
}
