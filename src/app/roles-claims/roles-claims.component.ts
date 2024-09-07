import { Component, OnInit } from '@angular/core';
import { Policies } from '../shared/shared.model';

@Component({
    selector: 'app-roles-claims',
    templateUrl: './roles-claims.component.html'
})
export class RolesClaimsComponent implements OnInit {
    public policies = Policies;

    constructor() {
    }

    ngOnInit() {
    }
}
