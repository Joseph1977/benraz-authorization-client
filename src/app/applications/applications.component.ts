import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Policies } from '../shared/shared.model';
import { Application, ApplicationsQueryParameter, ApplicationsQuery } from './applications.model';
import { ApplicationsService } from './applications.service';

@Component({
    selector: 'app-applications',
    templateUrl: './applications.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ApplicationsComponent implements OnInit {
    @ViewChild(MatSort, { static: true })
    public sort: MatSort;

    @ViewChild(MatPaginator, { static: true })
    public paginator: MatPaginator;

    public policies = Policies;

    public columns: string[] = [
        'name',
        'id',
        'audience',
        'createTimeUtc',
        'createdBy',
        'updateTimeUtc',
        'updatedBy'
    ];
    public dataSource = new MatTableDataSource<Application>();

    public isLoading = false;

    public filter: string;
    public sorting = { active: 'createTimeUtc', direction: 'desc' };
    public pageSize = 50;
    public pageIndex = 0;
    public itemsTotalCount = 0;

    constructor(
        public location: Location,
        private router: Router,
        private applicationsService: ApplicationsService) {
    }

    ngOnInit() {
        this.reloadApplications();
    }

    onFilter(value: string) {
        this.filter = value;
        this.reloadApplications();
    }

    onSort(value) {
        this.sorting = value;
        this.reloadApplications();
    }

    onPage() {
        this.reloadApplications();
    }

    private reloadApplications() {
        this.isLoading = true;

        const query = {
            sortBy: this.getSortingParameter(this.sorting.active),
            sortDesc: this.sorting.direction === 'desc',
            pageNo: this.paginator.pageIndex + 1,
            pageSize: this.paginator.pageSize || this.pageSize
        } as ApplicationsQuery;

        if (this.filter) {
            query.filter = this.filter;
        }

        this.applicationsService
            .getPage(query)
            .subscribe(x => {
                this.dataSource.data = x.items;
                this.pageIndex = x.pageNo - 1;
                this.itemsTotalCount = x.totalCount;
            }, error => {
            }, () => {
                this.isLoading = false;
            });
    }

    private getSortingParameter(name: string): ApplicationsQueryParameter {
        switch (name) {
            case 'id':
                return ApplicationsQueryParameter.Id;
            case 'name':
                return ApplicationsQueryParameter.Name;
            case 'audience':
                return ApplicationsQueryParameter.Audience;
            case 'createTimeUtc':
                return ApplicationsQueryParameter.CreateTimeUtc;
            case 'updateTimeUtc':
                return ApplicationsQueryParameter.UpdateTimeUtc;
            case 'createdBy':
                return ApplicationsQueryParameter.CreatedBy;
            case 'updatedBy':
                return ApplicationsQueryParameter.UpdatedBy;
            default:
                return ApplicationsQueryParameter.CreateTimeUtc;
        }
    }
}
