import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as fromApp from './../../../../../../app.reducer'
import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/app.reducer';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
    selector: 'app-large-image',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule],
    templateUrl: './large-image.component.html',
    styleUrl: './large-image.component.scss'
})
export class LargeImageComponent implements OnInit {

    imageUrl: string;

    constructor(
        public store: Store<fromApp.SuringarState>,
        private router: Router) { }

    ngOnInit(): void {

        this.store.select(fromRoot.getVisitorImageUrl).subscribe((imageUrl: string) => {
            this.imageUrl = imageUrl
        })
    }
    onClose() {
        this.router.navigateByUrl('product-visitor')
    }

}
