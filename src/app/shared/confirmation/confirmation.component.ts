import { Inject, Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.component.html',
})
export class ConfirmationComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
    }
}
