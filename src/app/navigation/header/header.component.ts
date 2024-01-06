import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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


@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,

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
        private authService: AuthService,
        private router: Router,
        private afAuth: Auth,

        private fsService: FirestoreService

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
        const path = `categories`
        this.categories$ = this.fsService.collection(path);
    }
    onCategorySelected(categoryId) {
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
}
