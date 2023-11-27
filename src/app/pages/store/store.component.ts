import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromRoot from 'src/app/app.reducer'
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-store',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

    storeData: any

    constructor(
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit(): void {
        this.store.subscribe((storeData: any) => {
            this.storeData = storeData
        })
    }
}
