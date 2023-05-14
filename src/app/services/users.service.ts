import { Injectable } from '@angular/core';
import { Signup, Signin } from '../models/user';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(
        private apiService: ApiService
    ) { }

    signup(data: Signup) {
        return this.apiService.post('users', data);
    }

    signin(data: Signin) {
        return this.apiService.post('users/login', data);
    }

    refreshToken() {
        return this.apiService.get('users/me');
    }

}
