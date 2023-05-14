import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { GeneralService } from 'src/app/services/general.service';
import { ProductsService } from 'src/app/services/products.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
    errorMessage: string = '';
    successMessage: string = '';
    showSuccessMessage: boolean = false;
    processLoading: boolean = false;
    form: FormGroup;
    subs: SubSink = new SubSink();
    slug: string;
    product: any;
    constructor(
        private fb: FormBuilder,
        private productsService: ProductsService,
        private generalService: GeneralService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.slug = this.route.snapshot.params['slug'];

        this.getProduct();
        this.form = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            price: [null, Validators.required],
            size: ['', [Validators.required]],
            slug: ['', Validators.required],
            color: ['', Validators.required],
            imageUrl: ['', Validators.required],
        });

        this.getProduct();
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    getProduct() {
        this.productsService.getOneProduct(this.slug).subscribe({
            next: (res: any) => {
                this.product = res.data;

                this.form.get('name')?.setValue(this.product.name);
                this.form.get('description')?.setValue(this.product.description);
                this.form.get('price')?.setValue(this.product.price);
                this.form.get('size')?.setValue(this.product.size);
                this.form.get('slug')?.setValue(this.product.slug);
                this.form.get('color')?.setValue(this.product.color);
                this.form.get('imageUrl')?.setValue(this.product.imageUrl);

                this.form.updateValueAndValidity();
            }
        })
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
        let data = new Product();
        data = {
            ...data,
            ...this.form.value,
        }

        this.productsService.update(data, this.product._id).subscribe({
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
