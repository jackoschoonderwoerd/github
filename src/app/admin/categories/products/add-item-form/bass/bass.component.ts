import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemFormService } from '../item-form.service';

@Component({
    selector: 'app-bass',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './bass.component.html',
    styleUrls: ['./bass.component.scss']
})
export class BassComponent {
    readonly form = inject(ItemFormService).form;
}
