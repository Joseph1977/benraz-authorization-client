import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InternalUrlsService } from '@josephbenraz/ngx-common';
import { Page } from '../shared/shared.model';
import { Application, ApplicationsQuery, ApplicationToken, CreateApplicationToken } from './applications.model';

@Injectable()
export class ApplicationsService {

    constructor(private internalUrlsService: InternalUrlsService, private http: HttpClient) {
    }

    getAll(): Observable<Application[]> {
        return this.http.get<Application[]>(`${this.internalUrlsService.getApiBaseUrl()}/applications`);
    }

    getPage(query: ApplicationsQuery): Observable<Page<Application>> {
        return this.http.get<Page<Application>>(
            `${this.internalUrlsService.getApiBaseUrl()}/applications`, { params: query as any });
    }

    getOne(id: string): Observable<Application> {
        return this.http.get<Application>(
            `${this.internalUrlsService.getApiBaseUrl()}/applications/${id}`);
    }

    create(application: Application): Observable<string> {
        return this.http.post<string>(
            `${this.internalUrlsService.getApiBaseUrl()}/applications`, application);
    }

    change(id: string, application: Application): Observable<any> {
        return this.http.put(
            `${this.internalUrlsService.getApiBaseUrl()}/applications/${id}`, application);
    }

    delete(id: string): Observable<any> {
        return this.http.delete(
            `${this.internalUrlsService.getApiBaseUrl()}/applications/${id}`);
    }

    getTokens(id: string): Observable<ApplicationToken[]> {
        return this.http.get<ApplicationToken[]>(
            `${this.internalUrlsService.getApiBaseUrl()}/applications/${id}/tokens`);
    }

    createToken(id: string, createToken: CreateApplicationToken): Observable<string> {
        return this.http.post(
            `${this.internalUrlsService.getApiBaseUrl()}/applications/${id}/tokens`,
            createToken,
            { responseType: 'text' });
    }

    revokeToken(id: string, tokenId: string): Observable<any> {
        return this.http.delete(
            `${this.internalUrlsService.getApiBaseUrl()}/applications/${id}/tokens/${tokenId}`);
    }
}
