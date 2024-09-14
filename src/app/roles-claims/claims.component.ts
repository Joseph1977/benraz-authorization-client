import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Policies } from '../shared/shared.model';
import { NotificationService } from '../shared/notification/notification.service';
import { ConfirmationService } from '../shared/confirmation/confimation.service';
import { Claim } from './claims.model';
import { ClaimsService } from './claims.service';
import { MatDialog } from '@angular/material/dialog';
import { ClaimComponent } from './claim.component';

@Component({
    selector: 'app-claims',
    templateUrl: './claims.component.html'
})
export class ClaimsComponent implements OnInit {
    @ViewChild(MatSort, { static: true })
    public sort: MatSort = new MatSort();

    public policies = Policies;

    public columns: string[] = [
        'value',
        'actions'
    ];
    public dataSource = new MatTableDataSource<Claim>();

    public isLoading = false;

    constructor(
        public location: Location,
        private router: Router,
        private dialog: MatDialog,
        private claimsService: ClaimsService,
        private notificationService: NotificationService,
        private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        this.sort.active = 'name';
        this.sort.direction = 'asc';

        this.reloadClaims();
    }

    onSort() {
        this.dataSource.data = this.sortRoles(this.dataSource.data);
    }

    reload() {
        this.reloadClaims();
    }

    add() {
        this.dialog
            .open(ClaimComponent, { width: '300px' })
            .afterClosed()
            .subscribe(x => x && this.addClaim(x));
    }

    delete(id: string) {
        this.confirmationService
            .confirm('Are you sure you want to delete claim?')
            .subscribe(isConfirmed => isConfirmed && this.deleteRole(id));
    }

    private reloadClaims() {
        this.isLoading = true;

        this.claimsService
            .getAll()
            .subscribe(
                x => this.dataSource.data = this.sortRoles(x),
                error => this.notificationService.error(error))
            .add(() => this.isLoading = false);
    }

    private addClaim(claim: Claim) {
        this.isLoading = true;
        this.claimsService
            .create(claim)
            .subscribe(
                x => {
                    this.reloadClaims();
                },
                error => this.notificationService.error(error))
            .add(() => this.isLoading = false);
    }

    private deleteRole(id: string) {
        this.isLoading = true;
        this.claimsService
            .delete(id)
            .subscribe(
                x => {
                    this.notificationService.success('Claim was deleted successfully');
                    this.reloadClaims();
                },
                error => this.notificationService.error(error))
            .add(() => this.isLoading = false);
    }

    private sortRoles(roles: Claim[]): Claim[] {
        const isAsc = this.sort.direction === 'asc';
        return roles.sort((a, b) => (a.value.toLowerCase() < b.value.toLowerCase() ? -1 : 1) * (isAsc ? 1 : -1));
    }
}
