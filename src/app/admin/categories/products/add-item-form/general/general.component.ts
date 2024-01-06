import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemFormService } from '../item-form.service';

@Component({
    selector: 'app-general',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.scss']
})
export class GeneralComponent {
    readonly form = inject(ItemFormService).form;


}
