import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Role } from './roles.model';

@Component({
    selector: 'app-roles-selector',
    templateUrl: './roles-selector.component.html',
    styleUrls: ['./roles-selector.component.scss']
})
export class RolesSelectorComponent implements OnInit {
    @Input()
    roles: Role[] = [];

    @Input()
    set selectedRoles(roles: Role[]) {
        if (!roles) {
            return;
        }

        this.selectedRoleNames = roles.map(x => x.name);
    }

    get selectedRoles(): Role[] {
        if (!this.roles || !this.selectedRoleNames) {
            return [];
        }

        return this.roles.filter(x => this.selectedRoleNames.some(y => y === x.name));
    }

    selectedRoleNames: string[] = [];

    @Output()
    selectedRolesChange = new EventEmitter<Role[]>();

    filter: string = '';

    constructor() {
    }

    ngOnInit() {
    }

    onFilter(filter: string) {
        this.filter = filter;
    }

    onSelectionChange() {
        this.selectedRolesChange.emit(this.selectedRoles);
    }

    sort(roles: Role[]): Role[] {
        if (!roles) {
            return roles;
        }

        return roles.sort((x, y) => x.name.toLowerCase().localeCompare(y.name.toLowerCase()));
    }

    isVisible(role: Role) {
        return !this.filter || !role || role.name.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
    }
}
