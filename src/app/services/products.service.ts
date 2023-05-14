import { Injectable } from '@angular/core';
import { NewProduct, Product } from '../models/product';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    constructor(
        private apiService: ApiService
    ) { }

    getProducts(page: number, limit: number, query: string) {
        return this.apiService.get(`products?page=${page}&limit=${limit}&query=${query}`);
    }

    getMyProducts(page: number, limit: number, query: string) {
        return this.apiService.get(`products/mine?page=${page}&limit=${limit}&query=${query}`);
    }

    getOneProduct(slug:string) {
        return this.apiService.get(`products/${slug}`);
    }

    create(data: NewProduct) {
        return this.apiService.post('products', data);
    }

    update(data: Product, id:string) {
        return this.apiService.put(`products/${id}`, data);
    }

    delete(id:string) {
        return this.apiService.delete(`products/${id}`);
    }

}
