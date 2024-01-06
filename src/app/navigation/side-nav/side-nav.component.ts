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
        MatMenuModule
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
        this.router.navigate(['/visitor/products-visitor', { categoryId }])
    }

}
