import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Signin } from 'src/app/models/user';
import { GeneralService } from 'src/app/services/general.service';
import { UsersService } from 'src/app/services/users.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    errorMessage: string = '';
    successMessage: string = '';
    showSuccessMessage: boolean = false;
    processLoading: boolean = false;
    form: FormGroup;
    subs: SubSink = new SubSink();
    constructor(
        private fb: FormBuilder,
        private usersService: UsersService,
        private generalService: GeneralService,
        private router: Router
    ) {
        this.form = this.fb.group({
            emailAddress: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        })
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    signIn() {
        if (this.processLoading) return;

        this.form.markAllAsTouched();
        this.form.markAsDirty();

        this.errorMessage = '';

        if (!this.form.valid) {
            this.errorMessage = 'Please enter all fields.'
            return;
        }

        this.processLoading = true;
        let data = new Signin();
        data = {
            ...data,
            ...this.form.value,
        }

        this.usersService.signin(data).subscribe({
            next: (res: any) => {
                this.processLoading = false;

                if (!/^20.*/.test(res.statusCode)) {
                    this.errorMessage = res.message;
                    return;
                }

                this.successMessage = res.message;
                this.showSuccessMessage = true;

                this.generalService.saveUser(res.data);

                setTimeout(() => {
                    this.router.navigateByUrl('/');
                }, 1500);
            },
            error: (error: any) => {
                this.processLoading = false;
                this.errorMessage = error;
            }
        })


    }

}
