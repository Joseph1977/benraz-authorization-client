import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@josephbenraz/ngx-authorization';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
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
