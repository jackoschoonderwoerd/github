import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';


@Component({
    selector: 'app-amplification',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule
    ],
    templateUrl: './amplification.component.html',
    styleUrls: ['./amplification.component.scss']
})
export class AmplificationComponent implements OnInit {

    form: FormGroup;
    amplifierTypes: string[] = ['Combo', 'Top'];

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.initForm()
    }
    initForm() {
        this.form = this.fb.group({
            brand: new FormControl('AER', [Validators.required]),
            type: new FormControl('top', [Validators.required])
        })
    }
}
