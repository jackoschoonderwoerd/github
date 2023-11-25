import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Observable } from 'rxjs';

import { User as FirebaseUser } from "@angular/fire/auth";


@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, MatToolbarModule, RouterModule, MatIconModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    user$: Observable<FirebaseUser>

    constructor(
        private authService: AuthService,
        private router: Router,
        private afAuth: Auth
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
    }

    onLogIn() {
        this.router.navigateByUrl('login');
    }
    onLogOut() {
        this.authService.logOut()
    }
}
