import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-image-blowup',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './image-blowup.component.html',
    styleUrls: ['./image-blowup.component.scss']
})
export class ImageBlowupComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<ImageBlowupComponent>
    ) { }
    ngOnInit(): void {
        this.dialogRef.updateSize('80vw', '80vh')
    }
}
