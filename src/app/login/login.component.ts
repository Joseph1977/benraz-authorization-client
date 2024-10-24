import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { AuthService } from '@josephbenraz/npm-authorization';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {

    public isLoading = false;

    constructor(private authService: AuthService) { }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.isLoading = false;
    }

    login() {
        this.isLoading = true;
        this.authService.redirectToLogin();
    }
}
