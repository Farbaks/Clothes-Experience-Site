import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewProduct } from 'src/app/models/product';
import { GeneralService } from 'src/app/services/general.service';
import { ProductsService } from 'src/app/services/products.service';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-new-product',
    templateUrl: './new-product.component.html',
    styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
    errorMessage: string = '';
    successMessage: string = '';
    showSuccessMessage: boolean = false;
    processLoading: boolean = false;
    form: FormGroup;
    subs: SubSink = new SubSink();
    constructor(
        private fb: FormBuilder,
        private productsService: ProductsService,
        private generalService: GeneralService,
        private router: Router
    ) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            price: [null, Validators.required],
            size: ['', [Validators.required]],
            slug: ['', Validators.required],
            color: ['', Validators.required],
            imageUrl: ['', Validators.required],
        })
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
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

        this.processLoading = true;
        let data = new NewProduct();
        data = {
            ...data,
            ...this.form.value,
        }

        this.productsService.create(data).subscribe({
            next: (res: any) => {
                this.processLoading = false;

                if (!/^20.*/.test(res.statusCode)) {
                    this.errorMessage = res.message;
                    return;
                }

                this.successMessage = res.message;
                this.showSuccessMessage = true;

                setTimeout(() => {
                    this.router.navigateByUrl('/'+res.data.slug);
                }, 3000);
            },
            error: (error: any) => {
                this.processLoading = false;
                this.errorMessage = error;
            }
        })


    }

}
