import { Component, Input } from '@angular/core';
import { UserStatusCode } from './users.model';

@Component({
    selector: 'app-user-status',
    templateUrl: './user-status.component.html'
})
export class UserStatusComponent {
    @Input()
    statusCode: UserStatusCode = UserStatusCode.Active;

    private mappings = [
        { statusCode: null, icon: '\u25CB', class: 'text-warning', text: 'Unknown' },
        { statusCode: UserStatusCode.Active, icon: '\u25CF', class: 'text-success', text: 'Active' },
        { statusCode: UserStatusCode.Suspended, icon: '\u25CF', class: 'text-warning', text: 'Suspended' },
        { statusCode: UserStatusCode.PaymentServiceSuspended, icon: '\u25CB', class: 'text-warning', text: 'Payments suspended' },
        { statusCode: UserStatusCode.Blocked, icon: '\u25CF', class: 'text-danger', text: 'Blocked' }
    ];

    getMapping() {
        const mapping = this.mappings.find(x => x.statusCode === this.statusCode);
        if (mapping) {
            return mapping;
        }

        return this.mappings.find(x => x.statusCode === null);
    }
}
