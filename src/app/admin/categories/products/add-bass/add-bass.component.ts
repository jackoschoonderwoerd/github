import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Bass } from 'src/app/shared/models/bass.model';

@Component({
    selector: 'app-add-bass',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './add-bass.component.html',
    styleUrls: ['./add-bass.component.scss']
})
export class AddBassComponent implements OnInit {

    form: FormGroup;
    editmode: boolean = false;
    imageUrl: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<AddBassComponent>,
        private fb: FormBuilder
    ) { }


    ngOnInit(): void {
        this.initForm()
    }

    initForm() {
        this.form = this.fb.group({
            name: new FormControl('null', [Validators.required]),
            scale: new FormControl(null),
            typeOfWood: new FormControl(null),
            origin: new FormControl(null),
            yearBuilt: new FormControl(null),
            backboard: new FormControl(null),
            color: new FormControl(null),

            bridge: new FormControl(null),
            mensuur: new FormControl(null),
            stringLength: new FormControl(null),
            top: new FormControl(null),
            middle: new FormControl(null),
            bottom: new FormControl(null),
            depth: new FormControl(null),
            lengthBackPlate: new FormControl(null),

            description: new FormControl(null),
            price: new FormControl(null),

        })
    }
    onImageInputChange(e) {
        console.log(e.target.files[0])
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.onload = () => {
            this.imageUrl = reader.result as string;
        }
        reader.readAsDataURL(file)
    }
    onAddBass() {
        console.log(this.form.value)
        const bass: Bass = {
            ...this.form.value
        }
        console.log(bass);
    }
    onCancel() {
        this.dialogRef.close();
    }
}
