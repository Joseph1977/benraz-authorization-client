import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InternalUrlsService } from '@josephbenraz/ngx-common';
import { Role, RoleClaim } from './roles.model';

@Injectable()
export class RolesService {

    constructor(private internalUrlsService: InternalUrlsService, private http: HttpClient) {
    }

    getAll(): Observable<Role[]> {
        return this.http.get<Role[]>(`${this.internalUrlsService.getApiBaseUrl()}/roles`);
    }

    getOne(id: string): Observable<Role> {
        return this.http.get<Role>(
            `${this.internalUrlsService.getApiBaseUrl()}/roles/${id}`);
    }

    create(role: Role): Observable<string> {
        return this.http.post(
            `${this.internalUrlsService.getApiBaseUrl()}/roles`, role, { responseType: 'text' });
    }

    change(id: string, role: Role): Observable<any> {
        return this.http.put(
            `${this.internalUrlsService.getApiBaseUrl()}/roles/${id}`, role);
    }

    delete(id: string): Observable<any> {
        return this.http.delete(
            `${this.internalUrlsService.getApiBaseUrl()}/roles/${id}`);
    }

    getClaims(id: string): Observable<RoleClaim[]> {
        return this.http.get<RoleClaim[]>(
            `${this.internalUrlsService.getApiBaseUrl()}/roles/${id}/claims`);
    }

    changeClaims(id: string, claims: RoleClaim[]): Observable<any> {
        return this.http.put(
            `${this.internalUrlsService.getApiBaseUrl()}/roles/${id}/claims`, claims);
    }
}
