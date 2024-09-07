import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationToken } from './applications.model';

@Component({
    selector: 'app-view-application-token',
    templateUrl: './view-application-token.component.html',
})
export class ViewApplicationTokenComponent {
    applicationToken: ApplicationToken;
    applicationTokenValue: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<ViewApplicationTokenComponent>) {
        this.applicationToken = data.applicationToken;
        this.applicationTokenValue = data.applicationTokenValue;
    }
}
