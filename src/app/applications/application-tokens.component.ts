import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Policies } from '../shared/shared.model';
import { NotificationService } from '../shared/notification/notification.service';
import { ConfirmationService } from '../shared/confirmation/confimation.service';
import { ApplicationToken } from './applications.model';
import { ApplicationsService } from './applications.service';
import { ApplicationTokenComponent } from './application-token.component';
import { ViewApplicationTokenComponent } from './view-application-token.component';

@Component({
    selector: 'app-application-tokens',
    templateUrl: './application-tokens.component.html',
    styleUrls: ['./application-tokens.component.scss']
})
export class ApplicationTokensComponent implements OnInit {
    @ViewChild(MatSort, { static: true })
    public sort: MatSort;

    public applicationId: string;

    public policies = Policies;

    public columns: string[] = [
        'name',
        'expirationTimeUtc',
        'createTimeUtc',
        'createdBy',
        'actions'
    ];
    public dataSource = new MatTableDataSource<ApplicationToken>();

    public isLoading = false;

    public filter: string;

    constructor(
        public location: Location,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private applicationsService: ApplicationsService,
        private notificationService: NotificationService,
        private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        this.sort.active = 'name';
        this.sort.direction = 'asc';

        this.applicationId = this.route.snapshot.params.id;

        this.reloadApplicationTokens();
    }

    onSort() {
        this.reloadApplicationTokens();
    }

    reload() {
        this.reloadApplicationTokens();
    }

    view(token: ApplicationToken) {
        this.showToken(token, null);
    }

    create() {
        this.dialog
            .open(
                ApplicationTokenComponent,
                {
                    width: '500px',
                    backdropClass: 'scroll-blackdrop',
                    autoFocus: false,
                    data: { applicationId: this.applicationId, token: null }
                })
            .afterClosed()
            .subscribe(x => {
                if (!x) {
                    return;
                }

                this.reloadApplicationTokens();
                this.showToken(null, x);
            });
    }

    revoke(id: string) {
        this.confirmationService
            .confirm('Are you sure you want to revoke access token?')
            .subscribe(isConfirmed => isConfirmed && this.revokeApplicationToken(id));
    }

    private showToken(token: ApplicationToken, tokenValue: string) {
        this.dialog
            .open(
                ViewApplicationTokenComponent,
                {
                    width: '500px',
                    backdropClass: 'scroll-blackdrop',
                    autoFocus: false,
                    data: { applicationToken: token, applicationTokenValue: tokenValue }
                })
            .afterClosed()
            .subscribe();
    }

    private reloadApplicationTokens() {
        if (!this.applicationId) {
            return;
        }

        this.isLoading = true;
        this.applicationsService
            .getTokens(this.applicationId)
            .subscribe(
                x => this.dataSource.data = x.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())),
                error => this.notificationService.error(error))
            .add(() => this.isLoading = false);
    }

    private revokeApplicationToken(id: string) {
        this.isLoading = true;
        this.applicationsService
            .revokeToken(this.applicationId, id)
            .subscribe(
                x => {
                    this.notificationService.success('Token was revoked successfully');
                    this.reloadApplicationTokens();
                },
                error => this.notificationService.error(error))
            .add(() => this.isLoading = false);
    }
}
