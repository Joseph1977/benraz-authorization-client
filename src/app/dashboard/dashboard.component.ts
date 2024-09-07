import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Policies } from '../shared/shared.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    public policies = Policies;

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
    }
}
