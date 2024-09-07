import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolesService } from '../roles-claims/roles.service';
import { ClaimsService } from '../roles-claims/claims.service';
import { ApplicationsService } from './applications.service';
import { Role } from '../roles-claims/roles.model';
import { Claim } from '../roles-claims/claims.model';
import { CreateApplicationToken } from './applications.model';
import { NotificationService } from '../shared/notification/notification.service';
import { ValidationService } from '../shared/validation.service';

@Component({
    selector: 'app-application-token',
    templateUrl: './application-token.component.html',
})
export class ApplicationTokenComponent implements OnInit {
    applicationId: string;

    form: FormGroup;
    public get customFieldsFormArray(): FormArray {
        return this.form.get('customFields') as FormArray;
    }

    roles: Role[] = [];
    tokenRoles: Role[] = [];
    claims: Claim[] = [];
    tokenClaims: Claim[] = [];
    minExpirationTime: Date;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ApplicationTokenComponent>,
        private rolesService: RolesService,
        private claimsService: ClaimsService,
        private applicationsService: ApplicationsService,
        private notificationService: NotificationService,
        private validationService: ValidationService) {

        this.applicationId = data.applicationId;

        this.form = this.createForm();

        this.minExpirationTime = new Date();
        this.minExpirationTime.setDate(new Date().getDate() + 1);
    }

    ngOnInit() {
        this.reloadRoles();
        this.reloadClaims();
    }

    addCustomField() {
        this.customFieldsFormArray.push(this.createCustomFieldForm());
    }

    removeCustomField(customFieldForm) {
        this.customFieldsFormArray.removeAt(this.customFieldsFormArray.controls.indexOf(customFieldForm));
    }

    create() {
        this.validationService.validate(this.form);

        if (!this.form.valid) {
            this.notificationService.formValidationError();
            return;
        }

        const createApplicationToken = this.form.value as CreateApplicationToken;
        createApplicationToken.roles = this.tokenRoles.map(x => x.name);
        createApplicationToken.claims = this.tokenClaims.map(x => ({ type: x.type, value: x.value }));
        createApplicationToken.customFields = this.customFieldsFormArray.controls.map(x => ({ ...x.value }));
        this.applicationsService
            .createToken(this.applicationId, createApplicationToken)
            .subscribe(
                x => {
                    this.dialogRef.close(x);
                },
                error => this.notificationService.error(error)
            )
            .add(() => { });
    }

    private reloadRoles() {
        this.rolesService
            .getAll()
            .subscribe(x => this.roles = x);
    }

    private reloadClaims() {
        this.claimsService
            .getAll()
            .subscribe(x => this.claims = x);
    }

    private createForm() {
        return this.fb.group({
            name: ['', Validators.required],
            expirationTimeUtc: ['', Validators.required],
            customFields: this.fb.array([])
        });
    }

    private createCustomFieldForm() {
        return this.fb.group({
            key: ['', Validators.required],
            value: ['', Validators.required]
        });
    }
}
