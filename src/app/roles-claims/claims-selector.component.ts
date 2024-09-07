import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Claim } from './claims.model';

@Component({
    selector: 'app-claims-selector',
    templateUrl: './claims-selector.component.html',
    styleUrls: ['./claims-selector.component.scss']
})
export class ClaimsSelectorComponent implements OnInit {
    @Input()
    claims: Claim[] = [];

    @Input()
    set selectedClaims(claims: Claim[]) {
        if (!claims) {
            return;
        }

        this.selectedClaimValues = claims.map(x => x.value);
    }

    get selectedClaims(): Claim[] {
        if (!this.claims || !this.selectedClaimValues) {
            return [];
        }

        return this.claims.filter(x => this.selectedClaimValues.some(y => y === x.value));
    }

    selectedClaimValues: string[] = [];

    @Output()
    selectedClaimsChange = new EventEmitter<Claim[]>();

    filter: string;

    constructor() {
    }

    ngOnInit() {
    }

    onFilter(filter) {
        this.filter = filter;
    }

    onSelectionChange() {
        this.selectedClaimsChange.emit(this.selectedClaims);
    }

    sort(claims: Claim[]): Claim[] {
        if (!claims) {
            return claims;
        }

        return claims.sort((x, y) => x.value.toLowerCase().localeCompare(y.value.toLowerCase()));
    }

    isVisible(claim: Claim) {
        return !this.filter || !claim || claim.value.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
    }
}
