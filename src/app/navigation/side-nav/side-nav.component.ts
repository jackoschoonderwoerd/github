import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../app.reducer'
import * as VISITOR from './../../visitor/store/visitor.actions';
import { MatExpansionModule } from '@angular/material/expansion';
import { CapitalizePipe } from 'src/app/shared/pipes/capitalize.pipe';


@Component({
    selector: 'app-side-nav',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatSelectModule,
        MatListModule,
        MatButtonModule,
        RouterModule,
        MatMenuModule,
        MatExpansionModule,
        CapitalizePipe
        // MatSidenavModule
    ],
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

    @Output() closeSidenav = new EventEmitter<void>();
    categories$: Observable<any>;


    constructor(
        private fsService: FirestoreService,
        private router: Router,
        private store: Store
    ) { }

    ngOnInit(): void {
        const path = `categories`
        this.categories$ = this.fsService.collection(path)
    }

    onCloseSidenav() {
        this.closeSidenav.emit()
    }

    onCategorySelected(categoryId: string) {
        this.onCloseSidenav();
        this.store.dispatch(new VISITOR.SetCategoryId(categoryId))
        this.router.navigateByUrl('visitor/products-visitor')
    }

}
