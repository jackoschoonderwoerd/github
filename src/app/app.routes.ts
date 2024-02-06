import { Routes } from '@angular/router';
import { HomeComponent } from './visitor/pages/home/home.component';
import { AtelierComponent } from './visitor/pages/atelier/atelier.component';
import { ContactComponent } from './visitor/pages/contact/contact.component';


import { LoginComponent } from './admin/auth/login/login.component';
import { CategoriesComponent } from './admin/categories/categories.component';

import { ProductsVisitorComponent } from './visitor/pages/products-visitor/products-visitor.component';
import { ProductDetailsComponent } from './admin/categories/products/product-details/product-details.component';
import { ProductVisitorComponent } from './visitor/pages/products-visitor/product-visitor/product-visitor.component';
import { LargeImageComponent } from './visitor/pages/products-visitor/product-visitor/carousel/large-image/large-image.component';
import { CatalogComponent } from './visitor/pages/catalog/catalog.component';
import { NgrxComponent } from './shared/ngrx/ngrx.component';
import { ImageControlComponent } from './admin/categories/products/product-details/image-control/image-control.component';






export const routes: Routes = [
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'atelier', component: AtelierComponent
    },
    {
        path: 'contact', component: ContactComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'products', component: CategoriesComponent
    },
    {
        path: 'product-visitor', component: ProductVisitorComponent
    },
    {
        path: 'catalog', component: CatalogComponent
    },
    {
        path: 'ngrx', component: NgrxComponent
    },
    {
        path: 'visitor/products-visitor', component: ProductsVisitorComponent
    },
    {
        path: 'large-image', component: LargeImageComponent
    },
    {
        path: 'image-control', component: ImageControlComponent
    },
    {
        path: 'product-details', component: ProductDetailsComponent
    },
    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    },
    {
        path: '**', component: HomeComponent
    }


];
