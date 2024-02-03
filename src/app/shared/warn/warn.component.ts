import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-warn',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule],
    templateUrl: './warn.component.html',
    styleUrls: ['./warn.component.scss']
})
export class WarnComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<WarnComponent>
    ) { }

    ngOnInit(): void {
        // this.dialogRef.updateSize(
        //     '300px', ''
        // )
    }
    onClose() {
        this.dialogRef.close();
    }

}
