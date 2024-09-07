import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent, AuthorizePolicyGuardService } from '@josephbenraz/ngx-authorization';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { Policies } from './shared/shared.model';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationComponent } from './applications/application.component';
import { RolesClaimsComponent } from './roles-claims/roles-claims.component';
import { RoleComponent } from './roles-claims/role.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'applications',
                component: DashboardComponent
            },
            {
                path: 'application',
                component: ApplicationComponent,
                canActivate: [AuthorizePolicyGuardService],
                data: { policy: Policies.APPLICATION_ADD }
            },
            {
                path: 'application/:id',
                component: ApplicationComponent,
                canActivate: [AuthorizePolicyGuardService],
                data: { policy: Policies.APPLICATION_READ }
            },
            {
                path: 'users',
                component: UsersComponent,
                canActivate: [AuthorizePolicyGuardService],
                data: { policy: Policies.USER_READ }
            },
            {
                path: 'user',
                component: UserComponent,
                canActivate: [AuthorizePolicyGuardService],
                data: { policy: Policies.USER_ADD }
            },
            {
                path: 'user/:id',
                component: UserComponent,
                canActivate: [AuthorizePolicyGuardService],
                data: { policy: Policies.USER_READ }
            },
            {
                path: 'roles-claims',
                component: RolesClaimsComponent,
                canActivate: [AuthorizePolicyGuardService],
                data: { policy: Policies.ROLE_READ }
            },
            {
                path: 'role',
                component: RoleComponent,
                canActivate: [AuthorizePolicyGuardService],
                data: { policy: Policies.ROLE_ADD }
            },
            {
                path: 'role/:id',
                component: RoleComponent,
                canActivate: [AuthorizePolicyGuardService],
                data: { policy: Policies.ROLE_UPDATE }
            },
            {
                path: '',
                redirectTo: 'applications',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'auth/callback',
        component: AuthenticationComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
