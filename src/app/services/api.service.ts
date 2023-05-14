import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(public http: HttpClient) { }

    get url() {
        return environment.apiUrl;
    }

    get(endpoint: string): Observable<any> {
        return this.http.get(endpoint);
    }

    post(endpoint: string, body: any, reqOpts?: any) {
        return this.http.post(this.url + endpoint, body, reqOpts);
    }

    put(endpoint: string, body: any, reqOpts?: any) {
        return this.http.put(this.url + endpoint, body, reqOpts);
    }

    delete(endpoint: string, reqOpts?: any) {
        return this.http.delete(this.url + endpoint, reqOpts);
    }
}

