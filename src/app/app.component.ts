import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './navigation/header/header.component';
import { Store } from '@ngrx/store'
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideNavComponent } from './navigation/side-nav/side-nav.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        HeaderComponent,
        MatSidenavModule,
        SideNavComponent
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    openSidenav: boolean = false;
    title = 'github';
}
