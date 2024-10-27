import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InternalUrlsService } from '@josephbenraz/npm-common';
import { Claim } from './claims.model';

@Injectable()
export class ClaimsService {

    constructor(private internalUrlsService: InternalUrlsService, private http: HttpClient) {
    }

    getAll(): Observable<Claim[]> {
        return this.http.get<Claim[]>(`${this.internalUrlsService.getApiBaseUrl()}/claims`);
    }

    create(claim: Claim): Observable<string> {
        return this.http.post<string>(
            `${this.internalUrlsService.getApiBaseUrl()}/claims`, claim);
    }

    delete(id: string): Observable<any> {
        return this.http.delete(
            `${this.internalUrlsService.getApiBaseUrl()}/claims/${id}`);
    }
}
