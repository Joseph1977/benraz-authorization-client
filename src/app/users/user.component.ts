import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormArray, UntypedFormControl, AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Policies } from '../shared/shared.model';
import { NotificationService } from '../shared/notification/notification.service';
import { ConfirmationService } from '../shared/confirmation/confimation.service';
import { Role } from '../roles-claims/roles.model';
import { Claim } from '../roles-claims/claims.model';
import { UsersService } from './users.service';
import { RolesService } from '../roles-claims/roles.service';
import { ClaimsService } from '../roles-claims/claims.service';
import { User, UserStatusCode, UserClaim } from './users.model';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public policies = Policies;

    public get isLoading() {
        return this.isUserLoading ||
            this.isRolesLoading || this.isClaimsLoading ||
            this.isUserRolesLoading || this.isUserClaimsLoading;
    }

    private isUserLoading = false;
    private isRolesLoading = false;
    private isClaimsLoading = false;
    private isUserRolesLoading = false;
    private isUserClaimsLoading = false;

    public userId: string;
    public user: User;
    public form: UntypedFormGroup;
    public rolesFormArray: UntypedFormArray;
    public claimsFormArray: UntypedFormArray;
    public isEmailVisible: boolean;
    public roles: Role[] = [];
    public userRoles: Role[] = [];
    public claims: Claim[] = [];
    public userClaims: Claim[] = [];

    private retrievedUserRoles: string[] = [];
    private retrievedUserClaims: UserClaim[] = [];

    public get isSsoOnly(): boolean {
        return this.form.get('isSsoOnly').value;
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: UntypedFormBuilder,
        private usersService: UsersService,
        private rolesService: RolesService,
        private claimsService: ClaimsService,
        private notificationService: NotificationService,
        private confirmationService: ConfirmationService) {
        this.form = this.fb.group({
            fullName: ['', Validators.required],
            email: [''],
            emailConfirmed: [''],
            phoneNumber: [''],
            phoneNumberConfirmed: [''],
            isSsoOnly: [''],
            password: [''],
            repeatPassword: [''],
            statusCode: ['']
        });
        this.rolesFormArray = this.fb.array([]);
        this.claimsFormArray = this.fb.array([]);
    }

    ngOnInit() {
        this.reloadRoles();
        this.reloadClaims();

        this.userId = this.route.snapshot.params.id;
        if (this.userId) {
            this.reloadUser();
        } else {
            this.isEmailVisible = true;

            this.updateValidators();
            this.resetForm();
        }
    }

    create() {
        if (this.userId) {
            return;
        }

        this.updateValidators();
        this.validateAllFormFields(this.form);

        if (!this.isSsoOnly && this.form.get('password').value !== this.form.get('repeatPassword').value) {
            this.form.get('repeatPassword').setErrors({ passwords: 'Passwords do not match' });
        }

        if (!this.form.valid) {
            this.notificationService.formValidationError();
            return;
        }

        const user = this.form.value as User;
        if (this.isSsoOnly) {
            user.password = null;
        }

        user.roles = this.userRoles.map(x => x.name);
        user.claims = this.userClaims.map(x => ({ type: x.type, value: x.value }));

        this.isUserLoading = true;
        this.usersService
            .create(user)
            .subscribe(
                x => this.navigateBack(),
                error => this.notificationService.error(error))
            .add(() => this.isUserLoading = false);
    }

    save() {
        if (!this.userId) {
            return;
        }

        this.updateValidators();
        this.validateAllFormFields(this.form);
        if (!this.form.valid) {
            this.notificationService.formValidationError();
            return;
        }

        const roles = this.userRoles.map(x => x.name);
        const claims = this.userClaims.map(x => ({ type: x.type, value: x.value }));

        this.isUserLoading = true;
        of(null)
            .pipe(
                switchMap(() => this.usersService.changeRoles(this.userId, roles)),
                switchMap(() => this.usersService.changeClaims(this.userId, claims)))
            .subscribe(
                x => this.navigateBack(),
                error => this.notificationService.error(error))
            .add(() => this.isUserLoading = false);
    }

    delete() {
        this.confirmationService
            .confirm('Are you sure you want to delete this user?')
            .subscribe(isConfirmed => isConfirmed && this.deleteUser());
    }

    resetPassword() {
        this.confirmationService
            .confirm('Are you sure you want to reset user\'s password?')
            .subscribe(isConfirmed => isConfirmed && this.resetUserPassword());
    }

    cancel() {
        this.navigateBack();
    }

    get showActivate() {
        return this.user && this.user.statusCode !== UserStatusCode.Active;
    }

    get canActivate() {
        return this.user && this.user.statusCode === UserStatusCode.PaymentServiceSuspended;
    }

    activate() {
        if (!this.canActivate) {
            return;
        }

        this.isUserLoading = true;
        this.usersService
            .suspendPayments(this.userId, false)
            .subscribe(
                x => this.reloadUser(),
                error => this.notificationService.error(error))
            .add(() => this.isUserLoading = false);
    }

    get showSuspendPayments() {
        return this.user &&
            this.user.statusCode !== UserStatusCode.PaymentServiceSuspended &&
            this.user.statusCode !== UserStatusCode.Blocked;
    }

    get canSuspendPayments() {
        return this.user && this.user.statusCode === UserStatusCode.Active;
    }

    suspendPayments() {
        if (!this.canSuspendPayments) {
            return;
        }

        this.isUserLoading = true;
        this.usersService
            .suspendPayments(this.userId, true)
            .subscribe(
                x => this.reloadUser(),
                error => this.notificationService.error(error))
            .add(() => this.isUserLoading = false);
    }

    get showBlock() {
        return this.user && this.user.statusCode !== UserStatusCode.Blocked;
    }

    get canBlock() {
        return this.user && this.user.statusCode === UserStatusCode.PaymentServiceSuspended;
    }

    block() {
        if (!this.canBlock) {
            return;
        }

        this.isUserLoading = true;
        this.usersService
            .block(this.userId, true)
            .subscribe(
                x => this.reloadUser(),
                error => this.notificationService.error(error))
            .add(() => this.isUserLoading = false);

    }

    get showUnblock() {
        return this.user &&
            this.user.statusCode !== UserStatusCode.Active &&
            this.user.statusCode !== UserStatusCode.PaymentServiceSuspended;
    }

    get canUnblock() {
        return this.user && this.user.statusCode === UserStatusCode.Blocked;
    }

    unblock() {
        if (!this.canUnblock) {
            return;
        }

        this.isUserLoading = true;
        this.usersService
            .block(this.userId, false)
            .subscribe(
                x => this.reloadUser(),
                error => this.notificationService.error(error))
            .add(() => this.isUserLoading = false);
    }

    unlock() {
        this.isUserLoading = true;
        this.usersService
            .unlock(this.userId)
            .subscribe(
                x => this.reloadUser(),
                error => this.notificationService.error(error))
            .add(() => this.isUserLoading = false);
    }

    private deleteUser() {
        if (!this.userId) {
            return;
        }

        this.isUserLoading = true;
        this.usersService
            .delete(this.userId)
            .subscribe(
                x => this.navigateBack(),
                error => this.notificationService.error(error))
            .add(() => this.isUserLoading = false);
    }

    private resetUserPassword() {
        if (!this.userId) {
            return;
        }

        this.isUserLoading = true;
        this.usersService
            .resetPassword(this.userId)
            .subscribe(
                () => this.notificationService.success('Password has been successfully reset'),
                error => this.notificationService.error(error))
            .add(() => this.isUserLoading = false);
    }

    private reloadUser() {
        if (!this.userId) {
            return;
        }

        this.isUserLoading = true;
        this.usersService
            .getOne(this.userId)
            .subscribe(
                x => {
                    this.user = x;
                    this.resetForm(x);
                },
                error => this.notificationService.error(error))
            .add(() => this.isUserLoading = false);

        this.isUserRolesLoading = true;
        this.usersService
            .getRoles(this.userId)
            .subscribe(
                x => {
                    this.retrievedUserRoles = x;
                    this.updateUserRoles();
                },
                error => this.notificationService.error(error))
            .add(() => this.isUserRolesLoading = false);

        this.isUserClaimsLoading = true;
        this.usersService
            .getClaims(this.userId)
            .subscribe(
                x => {
                    this.retrievedUserClaims = x;
                    this.updateUserClaims();
                },
                error => this.notificationService.error(error))
            .add(() => this.isUserClaimsLoading = false);
    }

    private reloadRoles() {
        this.isRolesLoading = true;
        this.rolesService
            .getAll()
            .subscribe(x => {
                this.roles = x;
                this.updateUserRoles();
            })
            .add(() => this.isRolesLoading = false);
    }

    private reloadClaims() {
        this.isClaimsLoading = true;
        this.claimsService
            .getAll()
            .subscribe(x => {
                this.claims = x;
                this.updateUserClaims();
            })
            .add(() => this.isClaimsLoading = false);
    }

    private updateUserRoles() {
        this.userRoles = this.roles.filter(
            role => this.retrievedUserRoles.some(userRole => userRole === role.name));
    }

    private updateUserClaims() {
        this.userClaims = this.claims.filter(
            claim => this.retrievedUserClaims.some(userClaim => userClaim.value === claim.value));
    }

    private resetForm(user?: User) {
        this.form.reset(user);
    }

    private updateValidators() {
        const emailControl = this.form.get('email');
        emailControl.clearValidators();
        if (this.isEmailVisible) {
            emailControl.setValidators([Validators.required, Validators.email]);
        }

        this.form.get('password').clearValidators();
        this.form.get('repeatPassword').clearValidators();
        if (!this.userId && !this.isSsoOnly) {
            this.form.get('password').setValidators([Validators.required, Validators.minLength(6)]);
            this.form.get('repeatPassword').setValidators(Validators.required);
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
        this.router.navigate(['/users']);
    }
}
