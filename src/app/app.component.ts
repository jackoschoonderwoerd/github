import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './navigation/header/header.component';
import { Store } from '@ngrx/store'
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideNavComponent } from './navigation/side-nav/side-nav.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { UiService } from './shared/services/ui.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        HeaderComponent,
        MatSidenavModule,
        SideNavComponent,
        FooterComponent
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    openSidenav: boolean = false;
    title = 'github';
    showHeaderFooter: boolean = true

    constructor(private uiService: UiService) { }

    ngOnInit(): void {
        this.uiService.showHeaderFooter.subscribe((status: boolean) => {
            this.showHeaderFooter = status
        })
    }
}
