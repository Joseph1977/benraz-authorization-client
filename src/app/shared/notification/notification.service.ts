import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from './notification.component';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    public static readonly DEFAULT_FORM_VALIDATION_ERROR =
        'Can\'t save changes because an input errors, please check out the form';

    constructor(private snackBar: MatSnackBar) {
    }

    notify(message: string) {
        this.snackBar.openFromComponent(NotificationComponent, {
            data: message,
            panelClass: ['bg-info', 'text-white'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
            politeness: 'polite',
            duration: 3000
        });
    }

    success(message: string) {
        this.snackBar.openFromComponent(NotificationComponent, {
            data: message,
            panelClass: ['bg-success', 'text-white'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
            politeness: 'polite',
            duration: 3000
        });
    }

    error(error: any) {
        const message = this.getErrorMessage(error);
        this.snackBar.openFromComponent(NotificationComponent, {
            data: message,
            panelClass: ['bg-danger', 'text-white'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
            politeness: 'polite',
            duration: 3000
        });
    }

    formValidationError() {
        this.error(NotificationService.DEFAULT_FORM_VALIDATION_ERROR);
    }

    private getErrorMessage(error: any) {
        if (!error) {
            return null;
        }

        if (typeof error === 'string') {
            return error;
        }

        const httpErrorResponse = error as HttpErrorResponse;
        if (httpErrorResponse.status === 403) {
            return 'Access denied';
        }

        if (httpErrorResponse.error && typeof httpErrorResponse.error === 'string') {
            return httpErrorResponse.error;
        }

        if (httpErrorResponse.message && typeof httpErrorResponse.message === 'string') {
            return httpErrorResponse.message;
        }

        return 'Unknown error';
    }
}
