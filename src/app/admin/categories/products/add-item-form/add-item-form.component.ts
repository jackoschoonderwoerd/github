//https://sandroroth.com/blog/angular-complex-reactive-forms/

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemFormService } from './item-form.service';
import { GeneralComponent } from './general/general.component';
import { BassComponent } from './bass/bass.component';
import { AmplifierComponent } from './amplifier/amplifier.component';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/models/category.model';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-add-item-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        GeneralComponent,
        BassComponent,
        AmplifierComponent,
        FormsModule,
        MatButtonModule
    ],
    providers: [ItemFormService],
    templateUrl: './add-item-form.component.html',
    styleUrls: ['./add-item-form.component.scss']
})
export class AddItemFormComponent implements OnInit {

    readonly form = inject(ItemFormService).form;
    category: Category;
    category$: Observable<any>

    constructor(
        private route: ActivatedRoute,
        private fsService: FirestoreService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe((params: any) => {
            console.log(params)
            const pathToCategory = `categories/${params.categoryId}`
            this.category$ = this.fsService.getDoc(pathToCategory)
            this.fsService.getDoc(pathToCategory).subscribe((category: Category) => {
                this.category = category
            })
        })
    }

    onSubmit(e) {
        // console.log(e.target)
        console.log(this.form.value)
    }
}
