import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { ProductsService } from 'src/app/services/products.service';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
    subs: SubSink = new SubSink();
    product: any;
    slug:string;
    constructor(
        private generalService: GeneralService,
        private productsService: ProductsService,
        private route: ActivatedRoute
    ) {
        this.slug = this.route.snapshot.params['slug'];
    }

    ngOnInit(): void {
        this.getProduct();
    }

    get user() {
        let user = this.generalService.getUser();
        return user;
    }

    getProduct() {
        this.productsService.getOneProduct(this.slug).subscribe({
            next: (res: any) => {
                this.product = res.data;
            }
        })
    }

}
