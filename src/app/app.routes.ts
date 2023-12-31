import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AtelierComponent } from './pages/atelier/atelier.component';
import { ContactComponent } from './pages/contact/contact.component';


import { LoginComponent } from './admin/login/login.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { StoreComponent } from './pages/store/store.component';
import { ProductsVisitorComponent } from './visitor/pages/products-visitor/products-visitor.component';




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
        path: 'store', component: StoreComponent
    },
    {
        path: 'visitor/products-visitor', component: ProductsVisitorComponent
    }

];
