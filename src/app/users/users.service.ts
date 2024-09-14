import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InternalUrlsService } from '@josephbenraz/npm-common';
import { EncodeUrlCodec } from '../shared/encode-url-codec';
import { Page } from '../shared/shared.model';
import { User, UsersQuery, UserClaim } from './users.model';

@Injectable()
export class UsersService {
    constructor(private internalUrlsService: InternalUrlsService, private http: HttpClient) {
    }

    getPage(query: UsersQuery): Observable<Page<User>> {
        const params = new HttpParams({ fromObject: query as any, encoder: new EncodeUrlCodec() });
        return this.http.get<Page<User>>(
            `${this.internalUrlsService.getApiBaseUrl()}/users`, { params });
    }

    getOne(id: string): Observable<User> {
        return this.http.get<User>(
            `${this.internalUrlsService.getApiBaseUrl()}/users/${id}`);
    }

    create(user: User): Observable<string> {
        return this.http.post(
            `${this.internalUrlsService.getApiBaseUrl()}/users`, user, { responseType: 'text' });
    }

    delete(id: string): Observable<any> {
        return this.http.delete(
            `${this.internalUrlsService.getApiBaseUrl()}/users/${id}`);
    }

    suspendPayments(id: string, suspend: boolean): Observable<any> {
        const httpOptions = this.createContentTypeHttpOptions();
        return this.http.post(
            `${this.internalUrlsService.getApiBaseUrl()}/users/${id}/suspend-payment`, suspend, httpOptions);
    }

    block(id: string, block: boolean): Observable<any> {
        const httpOptions = this.createContentTypeHttpOptions();
        return this.http.post(
            `${this.internalUrlsService.getApiBaseUrl()}/users/${id}/block`, block, httpOptions);
    }

    unlock(id: string): Observable<any> {
        const httpOptions = this.createContentTypeHttpOptions();
        return this.http.post(
            `${this.internalUrlsService.getApiBaseUrl()}/users/${id}/unlock`, httpOptions);
    }

    getEmail(id: string): Observable<string> {
        return this.http.get(
            `${this.internalUrlsService.getApiBaseUrl()}/users/${id}/email`, { responseType: 'text' });
    }

    verifyEmail(id: string): Observable<any> {
        return this.http.post(
            `${this.internalUrlsService.getApiBaseUrl()}/users/${id}/verify-email`, null);
    }

    getPhoneNumber(id: string): Observable<string> {
        return this.http.get(
            `${this.internalUrlsService.getApiBaseUrl()}/users/${id}/phone`, { responseType: 'text' });
    }

    verifyPhone(id: string): Observable<any> {
        return this.http.post(
            `${this.internalUrlsService.getApiBaseUrl()}/users/${id}/verify-phone`, null);
    }

    resetPassword(id: string): Observable<any> {
        return this.http.post(
            `${this.internalUrlsService.getApiBaseUrl()}/users/${id}/reset-password`, null);
    }

    getClaims(id: string): Observable<UserClaim[]> {
        return this.http.get<UserClaim[]>(
            `${this.internalUrlsService.getApiBaseUrl()}/users/${id}/claims`);
    }

    changeClaims(id: string, claims: UserClaim[]): Observable<any> {
        return this.http.put(
            `${this.internalUrlsService.getApiBaseUrl()}/users/${id}/claims`, claims);
    }

    getRoles(id: string): Observable<string[]> {
        return this.http.get<string[]>(
            `${this.internalUrlsService.getApiBaseUrl()}/users/${id}/roles`);
    }

    changeRoles(id: string, roles: string[]): Observable<void> {
        return this.http.put<void>(
            `${this.internalUrlsService.getApiBaseUrl()}/users/${id}/roles`, roles);
    }

    private createContentTypeHttpOptions() {
        return {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
    }
}
