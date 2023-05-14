import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '', 
                loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'login',
                loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
            },
            {
                path: 'signup',
                loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule)
            },
            {
                path: 'new-product',
                canActivate: [AuthGuard],
                loadChildren: () => import('./pages/new-product/new-product.module').then(m => m.NewProductModule)
            }, 
            { 
                path: 'edit-product/:slug', 
                canActivate: [AuthGuard],
                loadChildren: () => import('./pages/edit-product/edit-product.module').then(m => m.EditProductModule) 
            },
            {
                path: ':slug',
                loadChildren: () => import('./pages/product-detail/product-detail.module').then(m => m.ProductDetailModule)
            },
            {
                path: '**',
                redirectTo: '',
                pathMatch: 'full'
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
