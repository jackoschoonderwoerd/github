import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemFormService } from '../item-form.service';

@Component({
    selector: 'app-amplifier',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './amplifier.component.html',
    styleUrls: ['./amplifier.component.scss']
})
export class AmplifierComponent {
    readonly form = inject(ItemFormService).form;
}
