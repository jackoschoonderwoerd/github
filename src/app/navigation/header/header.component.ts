import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Observable } from 'rxjs';

import { User as FirebaseUser } from "@angular/fire/auth";
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { MatMenuModule } from '@angular/material/menu'
import { Store } from '@ngrx/store';
import * as fromRoot from './../../app.reducer'
import * as VISITOR from './../../visitor/store/visitor.actions';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        FlexLayoutModule,
        MatMenuModule
    ],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    form: FormGroup;
    categories$: Observable<any>

    user$: Observable<FirebaseUser>
    @Output() sidenavToggle = new EventEmitter<void>()

    constructor(
        public authService: AuthService,
        private router: Router,
        private afAuth: Auth,
        private store: Store<fromRoot.SuringarState>,
        private fsService: FirestoreService,
        private renderer: Renderer2,
        private el: ElementRef


    ) { }

    ngOnInit(): void {

        onAuthStateChanged(this.afAuth, (user: FirebaseUser) => {
            if (user) {
                this.user$ = new Observable<FirebaseUser>((subcriber: any) => {
                    subcriber.next(user)
                })
            } else {
                this.user$ = null;
            }
        })
        const pathToCategories = `categories`
        this.categories$ = this.fsService.collection(pathToCategories);

        console.log(window.innerWidth);


    }
    onCategorySelected(categoryId) {
        this.store.dispatch(new VISITOR.SetCategoryId(categoryId));
        this.router.navigate(['/visitor/products-visitor', { categoryId }])

    }

    onToggleSidenav() {
        this.sidenavToggle.emit()
    }

    onLogIn() {
        this.router.navigateByUrl('login');
    }
    onLogOut() {
        this.authService.logOut()
    }
    style() {
        if (window.innerWidth < 700) {
            return {
                'display': 'none'
            }
        }
    }


}
