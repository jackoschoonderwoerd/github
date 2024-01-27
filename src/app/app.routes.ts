import { Routes } from '@angular/router';
import { HomeComponent } from './visitor/pages/home/home.component';
import { AtelierComponent } from './visitor/pages/atelier/atelier.component';
import { ContactComponent } from './visitor/pages/contact/contact.component';


import { LoginComponent } from './admin/auth/login/login.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { StoreComponent } from './pages/store/store.component';
import { ProductsVisitorComponent } from './visitor/pages/products-visitor/products-visitor.component';
import { AddItemFormComponent } from './admin/categories/products/add-item-form/add-item-form.component';
import { ProductVisitorComponent } from './visitor/pages/products-visitor/product-visitor/product-visitor.component';






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
        path: 'store', component: StoreComponent
    },
    {
        path: 'visitor/products-visitor', component: ProductsVisitorComponent
    },
    {
        path: 'add-item', component: AddItemFormComponent
    },
    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    },
    {
        path: '**', component: HomeComponent
    }


];
