import { Inject, Component } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
})
export class NotificationComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    }
}
