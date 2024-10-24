import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormArray, UntypedFormControl, AbstractControl } from '@angular/forms';
import { Policies } from '../shared/shared.model';
import { NotificationService } from '../shared/notification/notification.service';
import { ConfirmationService } from '../shared/confirmation/confimation.service';
import { Application, SsoProviderCode, ApplicationSsoConnection } from './applications.model';
import { ApplicationsService } from './applications.service';

@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
    styleUrls: ['application.component.scss']
})
export class ApplicationComponent implements OnInit {
    public policies = Policies;

    public isLoading = false;

    public form: UntypedFormGroup;
    public applicationId: string;

    public ssoProviderCodes: SsoProviderCode[];
    public openPanelIndexes: number[] = [];

    public ssoProviderCode = SsoProviderCode;

    public get ssoConnectionsFormArray(): UntypedFormArray {
        return this.form.get('ssoConnections') as UntypedFormArray;
    }

    public get urlsFormArray(): UntypedFormArray {
        return this.form.get('urls') as UntypedFormArray;
    }

    public get availableProviders() {
        const usedProviders = this.ssoConnectionsFormArray.controls.map(x => x.value.ssoProviderCode);
        return this.ssoProviderCodes.filter(x => !usedProviders.some(y => y === x));
    }

    public get isAccessTokenCookieEnabled(): boolean {
        return this.form.get('isAccessTokenCookieEnabled').value;
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: UntypedFormBuilder,
        private applicationsService: ApplicationsService,
        private notificationService: NotificationService,
        private confirmationService: ConfirmationService) {
        this.form = this.createApplicationForm();
        this.ssoProviderCodes = [
            SsoProviderCode.Internal,
            SsoProviderCode.Microsoft,
            SsoProviderCode.Facebook,
            SsoProviderCode.Google
        ];
    }

    ngOnInit() {
        this.route.params.subscribe(x => {
            this.applicationId = x.id;
            if (this.applicationId) {
                this.reloadApplication();
            } else {
                this.resetForm(Application.createDefault());
                this.updateValidators();
            }
        });
    }

    delete() {
        if (!this.applicationId) {
            return;
        }

        this.confirmationService
            .confirm('Are you sure you want to delete this application?')
            .subscribe(isConfirmed => isConfirmed && this.deleteAppliclation());
    }

    save() {
        this.updateValidators();
        this.validateAllFormFields(this.form);
        this.ssoConnectionsFormArray.controls.forEach((x, index) => {
            if (x.invalid) {
                this.openPanel(index);
            }
        });

        if (!this.form.valid) {
            this.notificationService.formValidationError();
            return;
        }

        this.confirmationService
            .confirm('Are you sure you want to save changes?')
            .subscribe(isConfirmed => isConfirmed && this.saveApplication());
    }

    cancel() {
        this.navigateBack();
    }

    changeIsAccessTokenCookieEnabled() {
        if (!this.isAccessTokenCookieEnabled) {
            this.form.get('isAccessTokenFragmentDisabled').setValue(false);
        }
        this.updateValidators();
    }

    addSsoConnection(ssoProviderCode: SsoProviderCode) {
        const form = this.createSsoConnectionForm(ssoProviderCode);
        form.get('ssoProviderCode').setValue(ssoProviderCode);

        this.ssoConnectionsFormArray.push(form);
        this.sortSsoConnectionForms();

        this.openPanel(this.ssoConnectionsFormArray.controls.indexOf(form));
    }

    removeSsoConnection(providerForm) {
        const index = this.ssoConnectionsFormArray.controls.indexOf(providerForm);
        this.ssoConnectionsFormArray.removeAt(index);

        this.closePanel(index);
    }

    openPanel(index: number) {
        if (!this.isPanelOpen(index)) {
            this.openPanelIndexes.push(index);
        }
    }

    closePanel(index: number) {
        if (this.isPanelOpen(index)) {
            this.openPanelIndexes.splice(this.openPanelIndexes.indexOf(index), 1);
        }
    }

    isPanelOpen(index: number): boolean {
        return this.openPanelIndexes.some(x => x === index);
    }

    private reloadApplication() {
        if (!this.applicationId) {
            return;
        }

        this.isLoading = true;
        this.applicationsService
            .getOne(this.applicationId)
            .subscribe(
                x => {
                    this.resetForm(x);
                    this.updateValidators();
                },
                error => this.notificationService.error(error),
                () => this.isLoading = false);
    }

    private deleteAppliclation() {
        this.applicationsService
            .delete(this.applicationId)
            .subscribe(
                x => this.navigateBack(),
                error => this.notificationService.error(error));
    }

    private saveApplication() {
        const application = this.form.value as Application;
        if (!application.isAccessTokenCookieEnabled) {
            application.accessTokenCookieName = null;
            application.isAccessTokenFragmentDisabled = false;
        }

        application.ssoConnections = [];
        for (const ssoConnectionControl of this.ssoConnectionsFormArray.controls) {
            const ssoConnectionForm = ssoConnectionControl as UntypedFormGroup;
            const ssoConnection = ssoConnectionForm.value as ApplicationSsoConnection;

            const clientSecretControl = ssoConnectionForm.get('clientSecret');
            if (clientSecretControl && clientSecretControl.dirty) {
                ssoConnection.newClientSecret = clientSecretControl.value;
            }

            application.ssoConnections.push(ssoConnection);
        }

        if (this.applicationId) {
            this.applicationsService
                .change(this.applicationId, application)
                .subscribe(
                    x => this.navigateBack(),
                    error => this.notificationService.error(error));
        } else {
            application.audience = application.name;
            this.applicationsService
                .create(application)
                .subscribe(
                    x => this.navigateBack(),
                    error => this.notificationService.error(error));
        }
    }

    private resetForm(application: Application) {
        this.form.reset(application);

        for (const ssoConnection of application.ssoConnections) {
            const ssoConnectionForm = this.createSsoConnectionForm(ssoConnection.ssoProviderCode);
            ssoConnectionForm.reset(ssoConnection);

            this.ssoConnectionsFormArray.push(ssoConnectionForm);
        }
        this.sortSsoConnectionForms();

        for (const url of application.urls.sort((x, y) => x.typeCode - y.typeCode)) {
            const urlForm = this.createUrlForm();
            urlForm.reset(url);

            this.urlsFormArray.push(urlForm);
        }
    }

    private createApplicationForm() {
        return this.fb.group({
            id: [''],
            name: ['', Validators.required],
            audience: [''],
            isAccessTokenCookieEnabled: [''],
            accessTokenCookieName: [''],
            isAccessTokenFragmentDisabled: [''],
            ssoConnections: this.fb.array([]),
            urls: this.fb.array([])
        });
    }

    private createSsoConnectionForm(ssoProviderCode: SsoProviderCode) {
        if (ssoProviderCode === SsoProviderCode.Internal) {
            return this.fb.group({
                ssoProviderCode: ['', Validators.required],
                isEnabled: ['']
            });
        }

        return this.fb.group({
            ssoProviderCode: ['', Validators.required],
            authorizationUrl: ['', Validators.required],
            tokenUrl: ['', Validators.required],
            clientId: ['', Validators.required],
            clientSecret: ['', Validators.required],
            scope: ['', Validators.required],
            isEnabled: ['']
        });
    }

    private createUrlForm() {
        return this.fb.group({
            typeCode: ['', Validators.required],
            url: [''],
        });
    }

    private sortSsoConnectionForms() {
        const ssoConnectionForms = [...this.ssoConnectionsFormArray.controls]
            .sort((x, y) => x.value.ssoProviderCode - y.value.ssoProviderCode);

        this.ssoConnectionsFormArray.clear();
        ssoConnectionForms.forEach(x => this.ssoConnectionsFormArray.push(x));
    }

    private updateValidators() {
        this.form.get('accessTokenCookieName').clearValidators();
        if (this.isAccessTokenCookieEnabled) {
            this.form.get('accessTokenCookieName').setValidators([Validators.required]);
        }
    }

    private validateAllFormFields(formGroup: UntypedFormGroup) {
        formGroup.updateValueAndValidity();
        Object.keys(formGroup.controls).forEach(field => {
            this.validateControl(formGroup.get(field));
        });
    }

    private validateControl(control: AbstractControl) {
        if (control instanceof UntypedFormControl) {
            control.updateValueAndValidity();
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof UntypedFormGroup) {
            this.validateAllFormFields(control);
        } else if (control instanceof UntypedFormArray) {
            control.controls.forEach(x => this.validateControl(x));
        }
    }

    private navigateBack() {
        this.router.navigate(['/applications']);
    }
}
