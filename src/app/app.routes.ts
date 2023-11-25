import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AtelierComponent } from './pages/atelier/atelier.component';
import { ContactComponent } from './pages/contact/contact.component';

import { ProductsComponent } from './admin/product-categories/product-categories.component';
import { LoginComponent } from './admin/login/login.component';




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
        path: 'products', component: ProductsComponent
    }

];
