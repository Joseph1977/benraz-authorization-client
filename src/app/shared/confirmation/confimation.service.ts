import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmationComponent } from './confirmation.component';

@Injectable({
    providedIn: 'root',
})
export class ConfirmationService {

    constructor(private dialog: MatDialog) {
    }

    confirm(message?: string): Observable<boolean> {
        const dialogRef = this.dialog.open(ConfirmationComponent, {
            data: message || 'Are you sure you want to proceed the action?'
        });

        return dialogRef.afterClosed().pipe(map(x => x as boolean));
    }
}
