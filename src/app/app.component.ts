import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './navigation/header/header.component';
import { Store } from '@ngrx/store'
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideNavComponent } from './navigation/side-nav/side-nav.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { UiService } from './shared/services/ui.service';
import * as fromRoot from './app.reducer'

import { adminReducer } from './admin/admin-store/admin.reducer';
import { visitorReducer } from './visitor/visitor-store/visitor.reducer';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { User as FirebaseUser } from "@angular/fire/auth";
import { AuthService } from './shared/services/auth.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as UI from './shared/ui-store/ui.actions'


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        HeaderComponent,
        MatSidenavModule,
        SideNavComponent,
        FooterComponent,


    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    openSidenav: boolean = false;
    title = 'Suringar';
    showHeaderFooter: boolean = true

    constructor(
        private uiService: UiService,
        private store: Store<fromRoot.SuringarState>,
        private afAuth: Auth,
        private authService: AuthService,
        private deviceDetector: DeviceDetectorService
    ) {

    }

    ngOnInit(): void {
        onAuthStateChanged(this.afAuth, (user: FirebaseUser) => {
            if (user) {
                this.authService.isLoggedIn.next(true)
            }
        })
        this.store.subscribe((state: fromRoot.SuringarState) => {
            this.storeStateInLs(state)
        })
        if (localStorage.getItem('suringarState')) {
            visitorReducer({
                categoryId: '',
                productId: '',
                imageUrl: '',
                indexCurrentSlide: 0
            }, '')
            adminReducer({
                categoryId: '',
                productId: '',
                imageUrl: ''

            }, '')
        }
        this.getDevice()
    }


    ngAfterViewInit(): void {
        this.uiService.showHeaderFooter.subscribe((status: boolean) => {
            setTimeout(() => {
                this.showHeaderFooter = status
            }, 0);
        })
    }
    storeStateInLs(state: fromRoot.SuringarState) {
        localStorage.setItem('suringarState', JSON.stringify(state))
    }
    getDevice() {
        const deviceInfo = this.deviceDetector.getDeviceInfo()
        console.log(deviceInfo.deviceType)
        this.store.dispatch(new UI.SetDeviceType(deviceInfo.deviceType))
    }
}
