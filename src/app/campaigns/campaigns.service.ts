import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { TCampaign, TProvider, TTemplate } from './campaigns.types';

@Injectable({
    providedIn: 'root',
})
export class CampaignsService {
    constructor(
        private http: HttpClient
    ) { }

    getCampaignsList(limit: number, offset: number): Observable<{ items: TCampaign[]; count: number }> {
        const params = new HttpParams()
            .set('limit', limit.toString())
            .set('offset', offset.toString());
        return this.http.get<{ items: TCampaign[]; count: number }>('campaigns/', { params });
    }

    getTemplateList(): Observable<TTemplate[]> {
        return this.http.get<TTemplate[]>('templates/');
    }

    getProviderList(): Observable<TProvider[]> {
        return this.http.get<TProvider[]>('providers/');
    }

    createCampaign(campaign: FormData): Observable<TCampaign> {
        return this.http.post<TCampaign>('campaigns/', campaign);
    }
}