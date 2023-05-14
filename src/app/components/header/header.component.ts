import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(
        private generalService: GeneralService
    ) { }

    ngOnInit(): void {
    }

    get userIsSignedIn() {
        let user = this.generalService.getUser();
        return user != undefined;
    }

    logout() {
        this.generalService.logoutUser();
    }

}
