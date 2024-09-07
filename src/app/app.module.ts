import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { ClipboardModule } from '@angular/cdk/clipboard';
import {
    AuthInterceptorService,
    PolicyRegistration,
    BenrazNgxAuthorizationModule, 
    UserService
} from '@josephbenraz/ngx-authorization';
import { EnvironmentsService, EnvironmentsServiceConfig, InternalUrlsService, BenrazNgxCommonModule } from '@josephbenraz/ngx-common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { LayoutComponent } from './shared/layout/layout.component';
import { NotificationComponent } from './shared/notification/notification.component';
import { ConfirmationComponent } from './shared/confirmation/confirmation.component';
import { NotificationService } from './shared/notification/notification.service';
import { YesNoPipe } from './shared/yesNo.pipe';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationsService } from './applications/applications.service';
import { UrlTypePipe } from './applications/url-type.pipe';
import { SsoProviderPipe } from './applications/sso-provider.pipe';
import { ApplicationsComponent } from './applications/applications.component';
import { ApplicationComponent } from './applications/application.component';
import { ApplicationTokensComponent } from './applications/application-tokens.component';
import { ApplicationTokenComponent } from './applications/application-token.component';
import { ViewApplicationTokenComponent } from './applications/view-application-token.component';
import { RolesService } from './roles-claims/roles.service';
import { RolesClaimsComponent } from './roles-claims/roles-claims.component';
import { RolesComponent } from './roles-claims/roles.component';
import { RoleComponent } from './roles-claims/role.component';
import { RolesSelectorComponent } from './roles-claims/roles-selector.component';
import { ClaimsService } from './roles-claims/claims.service';
import { ClaimsComponent } from './roles-claims/claims.component';
import { ClaimComponent } from './roles-claims/claim.component';
import { ClaimsSelectorComponent } from './roles-claims/claims-selector.component';
import { UsersService } from './users/users.service';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user.component';
import { UserStatusComponent } from './users/user-status.component';
import { Claims, Policies } from './shared/shared.model';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatCheckboxModule,
        MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatSelectModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatBadgeModule,
        MatExpansionModule,
        MatTabsModule,
        ClipboardModule,
        BenrazNgxCommonModule.forRoot({
            companySubdomain: 'benraz',
            apiBaseUrl: AppModule.getApiBaseUrl(),
            authorizationUrl: AppModule.getAuthorizationUrl()
        }),
        BenrazNgxAuthorizationModule.forRoot({
            applicationId: environment.authorization.applicationId,
            isCookies: environment.authorization.isCookies,
            loginUrl: '/login',
            returnUrl: '/',
            policies: [
                PolicyRegistration.claimsPolicy(Policies.APPLICATION_READ, [Claims.APPLICATION_READ]),
                PolicyRegistration.claimsPolicy(Policies.APPLICATION_ADD, [Claims.APPLICATION_ADD]),
                PolicyRegistration.claimsPolicy(Policies.APPLICATION_UPDATE, [Claims.APPLICATION_UPDATE]),
                PolicyRegistration.claimsPolicy(Policies.APPLICATION_DELETE, [Claims.APPLICATION_DELETE]),
                PolicyRegistration.claimsPolicy(Policies.USER_READ, [Claims.USER_READ]),
                PolicyRegistration.claimsPolicy(Policies.USER_ADD, [Claims.USER_ADD]),
                PolicyRegistration.claimsPolicy(Policies.USER_UPDATE, [Claims.USER_UPDATE]),
                PolicyRegistration.claimsPolicy(Policies.USER_DELETE, [Claims.USER_DELETE]),
                PolicyRegistration.claimsPolicy(Policies.USER_STATUS_READ, [Claims.USER_STATUS_READ]),
                PolicyRegistration.claimsPolicy(Policies.USER_STATUS_SUSPEND, [Claims.USER_STATUS_SUSPEND]),
                PolicyRegistration.claimsPolicy(Policies.USER_STATUS_BLOCK, [Claims.USER_STATUS_BLOCK]),
                PolicyRegistration.claimsPolicy(Policies.USER_UNLOCK, [Claims.USER_UNLOCK]),
                PolicyRegistration.claimsPolicy(Policies.USER_ROLE_READ, [Claims.USER_ROLE_READ]),
                PolicyRegistration.claimsPolicy(Policies.USER_ROLE_UPDATE, [Claims.USER_ROLE_UPDATE]),
                PolicyRegistration.claimsPolicy(Policies.USER_CLAIM_READ, [Claims.USER_CLAIM_READ]),
                PolicyRegistration.claimsPolicy(Policies.USER_CLAIM_UPDATE, [Claims.USER_CLAIM_UPDATE]),
                PolicyRegistration.claimsPolicy(Policies.USER_EMAIL_READ, [Claims.USER_EMAIL_READ]),
                PolicyRegistration.claimsPolicy(Policies.USER_EMAIL_VERIFY, [Claims.USER_EMAIL_VERIFY]),
                PolicyRegistration.claimsPolicy(Policies.USER_PHONE_READ, [Claims.USER_PHONE_READ]),
                PolicyRegistration.claimsPolicy(Policies.USER_PHONE_VERIFY, [Claims.USER_PHONE_VERIFY]),
                PolicyRegistration.claimsPolicy(Policies.USER_PASSWORD_RESET, [Claims.USER_PASSWORD_RESET]),
                PolicyRegistration.claimsPolicy(Policies.ROLE_READ, [Claims.ROLE_READ]),
                PolicyRegistration.claimsPolicy(Policies.ROLE_ADD, [Claims.ROLE_ADD]),
                PolicyRegistration.claimsPolicy(Policies.ROLE_UPDATE, [Claims.ROLE_UPDATE]),
                PolicyRegistration.claimsPolicy(Policies.ROLE_DELETE, [Claims.ROLE_DELETE]),
                PolicyRegistration.claimsPolicy(Policies.CLAIM_READ, [Claims.CLAIM_READ]),
                PolicyRegistration.claimsPolicy(Policies.CLAIM_ADD, [Claims.CLAIM_ADD]),
                PolicyRegistration.claimsPolicy(Policies.CLAIM_DELETE, [Claims.CLAIM_DELETE])
            ]
          })
    ],
    declarations: [
        YesNoPipe,
        AppComponent,
        LayoutComponent,
        LoginComponent,
        DashboardComponent,
        ApplicationsComponent,
        ApplicationComponent,
        ApplicationTokensComponent,
        ApplicationTokenComponent,
        ViewApplicationTokenComponent,
        SsoProviderPipe,
        UrlTypePipe,
        UsersComponent,
        UserComponent,
        UserStatusComponent,
        RolesClaimsComponent,
        RolesComponent,
        RoleComponent,
        RolesSelectorComponent,
        ClaimsComponent,
        ClaimComponent,
        ClaimsSelectorComponent,
        NotificationComponent,
        ConfirmationComponent
    ],
    entryComponents: [
        NotificationComponent,
        ConfirmationComponent
    ],
    providers: [
        InternalUrlsService,
        UserService,
        ApplicationsService,
        UsersService,
        RolesService,
        ClaimsService,
        DatePipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
  static companySubdomain = 'benraz';

  static getApiBaseUrl(): string {
      const environmentsService = new EnvironmentsService({ companySubdomain: this.companySubdomain } as EnvironmentsServiceConfig);
      const environmentName = environmentsService.getEnvironmentNameByHostname(window.location.hostname);

      switch (environmentName) {
          case 'qa':
              return environment.qa.apiBaseUrl;
          case 'sb':
              return environment.sb.apiBaseUrl;
          default:
              return environment.apiBaseUrl;
      }
  }

  static getAuthorizationUrl(): string {
      const environmentsService = new EnvironmentsService({ companySubdomain: this.companySubdomain } as EnvironmentsServiceConfig);
      const environmentName = environmentsService.getEnvironmentNameByHostname(window.location.hostname);

      switch (environmentName) {
          case 'qa':
              return environment.qa.authorization.endpoint;
          case 'sb':
              return environment.sb.authorization.endpoint;
          default:
              return environment.authorization.endpoint;
      }
  }
}
