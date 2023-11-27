import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { DocumentReference } from '@angular/fire/firestore';
import { Category } from 'src/app/shared/models/category.model';
import { FirebaseError } from '@angular/fire/app';

@Component({
    selector: 'app-add-category',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule
    ],
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

    form: FormGroup;
    editmode: boolean = false

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AddCategoryComponent>,
        private fsService: FirestoreService,
        @Inject(MAT_DIALOG_DATA) private data: any
    ) { }

    ngOnInit(): void {
        console.log(this.data);
        if (this.data && this.data.id) {
            this.editmode = true;
            const path = `categories/${this.data.id}`
            this.fsService.getDoc(path).subscribe((category: Category) => {
                this.form.setValue({
                    ...category
                })
            })
        }
        this.initForm()

    }


    initForm() {
        this.form = this.fb.group({
            id: new FormControl(null),
            name: new FormControl('category name', [Validators.required])
        })
    }
    onAddCategory() {
        console.log(this.form.value)
        const name = this.form.value.name
        const document = { name }
        if (this.editmode) {
            const pathToCategory = `categories/${this.data.id}`
            this.fsService.updateDocument(pathToCategory, document)
                .then((res: any) => {
                    console.log(`category updated`);
                    this.dialogRef.close()
                })
                .catch((err: FirebaseError) => {
                    console.log(`failed to update category; ${err.message}`)
                    this.dialogRef.close()
                })
        } else {
            const path = `categories`
            this.fsService.addDoc(path, document).then((docRef: DocumentReference) => {
                console.log(docRef)
                this.dialogRef.close();

            });
        }
    }
    onCancel() {
        this.dialogRef.close()
    }
}
