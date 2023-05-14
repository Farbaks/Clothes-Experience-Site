import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { UsersService } from './users.service';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {

    constructor(
        private apiService: ApiService,
        private userService: UsersService
    ) { }

    async refreshUser() {
        try {
            let res: any = await (this.userService.refreshToken()).toPromise();
            this.saveUser(res);
        }
        catch (e) { }
    }


    saveUser(user: any) {
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    getUser() {
        let res: any = sessionStorage.getItem('user') ?? undefined;

        if (!res || res == '') {
            return undefined
        }

        return (JSON.parse(res));
    }

    getToken() {
        let res: any = sessionStorage.getItem('user') ?? undefined;

        if (!res || res == '') {
            return ''
        }

        return (JSON.parse(res)).apiToken;
    }

    logoutUser() {
        sessionStorage.clear();
        window.location.replace('/');
    }

}
