import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User, UserService } from '@josephbenraz/ngx-authorization';
import { NotificationService } from '../notification/notification.service';
import { Policies } from '../shared.model';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {
    public policies = Policies;
    public user: User;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private notificationService: NotificationService,
        public location: Location,
        private router: Router) { }

    ngOnInit() {
        this.user = this.userService.getUser();
        if (!this.user.isAuthenticated) {
            this.navigateToLogin();
        }
    }

    logout() {
        this.authService.removeToken();
        this.notificationService.success('You have been successfully logged out');
        this.navigateToLogin();
    }

    private navigateToLogin() {
        this.router.navigate(['/login']);
    }
}
