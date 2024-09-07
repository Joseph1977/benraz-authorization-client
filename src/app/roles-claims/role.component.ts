import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Policies } from '../shared/shared.model';
import { NotificationService } from '../shared/notification/notification.service';
import { ConfirmationService } from '../shared/confirmation/confimation.service';
import { Role, RoleClaim } from './roles.model';
import { RolesService } from './roles.service';
import { Claim } from './claims.model';
import { ClaimsService } from './claims.service';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html'
})
export class RoleComponent implements OnInit {
    public policies = Policies;

    public isLoading = false;

    public roleId: string;
    public form: FormGroup;
    public claims: Claim[] = [];
    public roleClaims: RoleClaim[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private rolesService: RolesService,
        private claimsService: ClaimsService,
        private notificationService: NotificationService,
        private confirmationService: ConfirmationService) {
        this.form = this.fb.group({
            id: [''],
            name: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.reloadClaims();

        this.roleId = this.route.snapshot.params.id;
        if (this.roleId) {
            this.reloadRole();
            this.reloadRoleClaims();
        } else {
            this.resetForm();
        }
    }

    save() {
        this.validateAllFormFields(this.form);

        if (!this.form.valid) {
            this.notificationService.formValidationError();
            return;
        }

        this.saveRole();
    }

    cancel() {
        this.navigateBack();
    }

    private reloadRole() {
        if (!this.roleId) {
            return;
        }

        this.isLoading = true;
        this.rolesService
            .getOne(this.roleId)
            .subscribe(
                x => this.resetForm(x),
                error => this.notificationService.error(error),
                () => this.isLoading = false);
    }

    private reloadRoleClaims() {
        this.rolesService
            .getClaims(this.roleId)
            .subscribe(
                x => this.roleClaims = x,
                error => this.notificationService.error(error));
    }

    private reloadClaims() {
        this.claimsService
            .getAll()
            .subscribe(
                x => this.claims = x,
                error => this.notificationService.error(error));
    }

    private saveRole() {
        const role = this.form.value as Role;

        if (this.roleId) {
            of(this.roleId)
                .pipe(
                    switchMap(() => this.rolesService.change(this.roleId, role)),
                    switchMap(() => this.rolesService.changeClaims(this.roleId, this.roleClaims)))
                .subscribe(
                    x => this.navigateBack(),
                    error => this.notificationService.error(error)
                );
        } else {
            of(null)
                .pipe(
                    switchMap(() => this.rolesService.create(role)),
                    switchMap(roleId => this.rolesService.changeClaims(roleId, this.roleClaims)))
                .subscribe(
                    x => this.navigateBack(),
                    error => this.notificationService.error(error)
                );
        }
    }

    private resetForm(role?: Role) {
        this.form.reset(role);
    }

    private validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            this.validateControl(formGroup.get(field));
        });
    }

    private validateControl(control: AbstractControl) {
        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
            this.validateAllFormFields(control);
        } else if (control instanceof FormArray) {
            control.controls.forEach(x => this.validateControl(x));
        }
    }

    private navigateBack() {
        this.router.navigate(['/roles-claims']);
    }
}
