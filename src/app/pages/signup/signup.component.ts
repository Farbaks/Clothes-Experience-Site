import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from 'src/app/models/user';
import { GeneralService } from 'src/app/services/general.service';
import { UsersService } from 'src/app/services/users.service';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    errorMessage: string = "";
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
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            emailAddress: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        })
    }

    ngOnInit(): void {
    }

    signUp() {
        if (this.processLoading) return;

        this.form.markAllAsTouched();
        this.form.markAsDirty();

        this.errorMessage = '';

        if (!this.form.valid) {
            this.errorMessage = 'Please enter all fields.'
            return;
        }

        if(this.form.value.password != this.form.value.confirmPassword) {
            this.errorMessage = 'Passwords do not match.'
            return;
        }

        this.processLoading = true;
        let data = new Signup();
        data = {
            ...data,
            ...this.form.value,
        }

        this.usersService.signup(data).subscribe({
            next: (res: any) => {
                this.processLoading = false;

                if (!/^20.*/.test(res.status)) {
                    this.errorMessage = res.message;
                    return;
                }

                this.successMessage = res.message;
                this.showSuccessMessage = true;

                this.generalService.saveUser(res.data);

                setTimeout(() => {
                    this.router.navigateByUrl('/');
                }, 3000);
            },
            error: (error: any) => {
                this.processLoading = false;
                this.errorMessage = error;
            }
        })


    }

}