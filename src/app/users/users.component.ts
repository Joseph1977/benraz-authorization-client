import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Policies } from '../shared/shared.model';
import { NotificationService } from '../shared/notification/notification.service';
import { ConfirmationService } from '../shared/confirmation/confimation.service';
import { User, UsersQueryParameter, UsersQuery } from './users.model';
import { UsersService } from './users.service';
import { MatPaginator } from '@angular/material/paginator';
@Component({
    selector: 'app-users',
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
    @ViewChild(MatSort, { static: true })
    public sort: MatSort | undefined;

    @ViewChild(MatPaginator, { static: true })
    public paginator: MatPaginator | undefined;

    public policies = Policies;

    public columns: string[] = [
        'fullName',
        'statusCode',
        'email',
        'emailConfirmed',
        'phoneNumber',
        'phoneNumberConfirmed'
    ];
    public dataSource = new MatTableDataSource<User>();

    public isLoading = false;

    public filter: string | undefined;

    public emptyFullNameMessage: string = '<Full name is missed>';

    constructor(
        public location: Location,
        private router: Router,
        private usersService: UsersService,
        private notificationService: NotificationService,
        private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        if (this.sort) {
            this.sort.active = 'fullName';
            this.sort.direction = 'asc';
        }
        if (this.paginator) {
            this.paginator.pageSize = 50;
        }

        this.reloadUsers();
    }

    onFilter(value: string) {
        this.filter = value;
        this.reloadUsers();
    }

    onSort() {
        this.reloadUsers();
    }

    onPage() {
        this.reloadUsers();
    }

    reload() {
        this.reloadUsers();
    }

    delete(id: string) {
        this.confirmationService
            .confirm('Are you sure you want to delete user?')
            .subscribe(isConfirmed => isConfirmed && this.deleteUser(id));
    }

    private reloadUsers() {
        this.isLoading = true;
        const query: UsersQuery = {
            sortBy: this.getSortingParameter(this.sort?.active ?? 'fullName'),
            sortDesc: this.sort?.direction === 'desc',
            pageNo: (this.paginator?.pageIndex ?? 0) + 1,
            pageSize: this.paginator?.pageSize ?? 50,
            filter: ''
        };

        if (this.filter) {
            query.filter = this.filter;
        }

        this.usersService
            .getPage(query)
            .subscribe(
                x => {
                    this.dataSource.data = x.items;
                    if (this.paginator) {
                        this.paginator.pageIndex = x.pageNo - 1;
                        this.paginator.length = x.totalCount;
                    }
                },
                error => this.notificationService.error(error))
            .add(() => this.isLoading = false);
    }

    private deleteUser(id: string) {
        this.isLoading = true;
        this.usersService
            .delete(id)
            .subscribe(
                x => {
                    this.notificationService.success('User was deleted successfully');
                    this.reloadUsers();
                },
                error => this.notificationService.error(error))
            .add(() => this.isLoading = false);
    }

    private getSortingParameter(name: string): UsersQueryParameter {
        switch (name) {
            case 'fullName':
                return UsersQueryParameter.FullName;
            case 'email':
                return UsersQueryParameter.Email;
            case 'phoneNumber':
                return UsersQueryParameter.PhoneNumber;
            default:
                return UsersQueryParameter.FullName;
        }
    }
}
