import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WarnComponent } from 'src/app/shared/warn/warn.component';

import { ContactService } from './contact.service';
import { ContactFormValue } from 'src/app/shared/models/contact-form-value.model';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule
    ],
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private dialog: MatDialog,
        private contactService: ContactService) { }
    contactForm: FormGroup

    ngOnInit(): void {
        this.initForm()
    }
    initForm() {
        this.contactForm = this.fb.group({
            name: new FormControl('jacko', [Validators.required]),
            email: new FormControl('2@2', [Validators.required]),
            phone: new FormControl('123456'),
            message: new FormControl('null', [Validators.required])
        })
    }
    onSubmit() {
        console.log(this.contactForm.value)
        if (this.contactForm.invalid) {
            this.dialog.open(WarnComponent, {
                data: {
                    message: 'Please fill out all required fields'
                }
            })
        } else {
            const formValue = this.contactForm.value
            const contactFormValue: ContactFormValue = {
                name: formValue.name,
                email: formValue.email,
                phone: formValue.phone,
                message: formValue.message
            }
            this.contactService.sendMail(contactFormValue)
        }
    }
}
