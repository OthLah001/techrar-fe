import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) { }

    login(data: [{ key: string }, string | boolean]): Observable<any> {
        return this.http.post('merchants/login/', data);
    }

    setUserToken(token: string) {
        this.localStorageService.setItem('bearer_token', token);
    }

    removeUserToken() {
        this.localStorageService.removeItem('bearer_token');
    }
}