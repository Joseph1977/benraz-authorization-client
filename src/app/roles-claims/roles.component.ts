import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Policies } from '../shared/shared.model';
import { ConfirmationService } from '../shared/confirmation/confimation.service';
import { NotificationService } from '../shared/notification/notification.service';
import { RolesService } from './roles.service';
import { Role } from './roles.model';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html'
})
export class RolesComponent implements OnInit {
    @ViewChild(MatSort, { static: true })
    public sort: MatSort = new MatSort();

    public policies = Policies;

    public columns: string[] = [
        'name',
        'actions'
    ];
    public dataSource = new MatTableDataSource<Role>();

    public isLoading = false;

    constructor(
        public location: Location,
        private router: Router,
        private rolesService: RolesService,
        private confirmationService: ConfirmationService,
        private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.sort.active = 'name';
        this.sort.direction = 'asc';

        this.reloadRoles();
    }

    onSort() {
        this.dataSource.data = this.sortRoles(this.dataSource.data);
    }

    reload() {
        this.reloadRoles();
    }

    delete(id: string) {
        this.confirmationService
            .confirm('Are you sure you want to delete role?')
            .subscribe(isConfirmed => isConfirmed && this.deleteRole(id));
    }

    private reloadRoles() {
        this.isLoading = true;

        this.rolesService
            .getAll()
            .subscribe(
                x => this.dataSource.data = this.sortRoles(x),
                error => this.notificationService.error(error))
            .add(() => this.isLoading = false);
    }

    private deleteRole(id: string) {
        this.isLoading = true;
        this.rolesService
            .delete(id)
            .subscribe(
                x => {
                    this.notificationService.success('Role was deleted successfully');
                    this.reloadRoles();
                },
                error => this.notificationService.error(error))
            .add(() => this.isLoading = false);
    }

    private sortRoles(roles: Role[]): Role[] {
        const isAsc = this.sort.direction === 'asc';
        return roles.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1) * (isAsc ? 1 : -1));
    }
}
