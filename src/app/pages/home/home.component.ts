import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { SubSink } from 'subsink';
import { debounce } from 'lodash';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    query: string = '';
    page: number = 1;
    limit: number = 20;
    subs: SubSink = new SubSink();
    products: Array<any> = [];
    constructor(
        private productsService: ProductsService
    ) {
        this.search = debounce(this.search, 800)
    }

    ngOnInit(): void {
        this.getProducts();
    }

    pageChanged(page: number) {
        this.page = page;
        this.getProducts();
    }

    search() {
        this.getProducts();
    }

    getProducts() {
        this.productsService.getProducts((this.page - 1), this.limit, this.query).subscribe({
            next: (res: any) => {
                this.products = res.data;
            }
        })
    }

}
