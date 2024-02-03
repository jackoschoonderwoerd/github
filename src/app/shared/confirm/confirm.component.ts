import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-confirm',
    standalone: true,
    imports: [CommonModule, MatButtonModule],
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<ConfirmComponent>
    ) { }

    ngOnInit(): void {
        this.dialogRef.updateSize(
            '300px', ''
        )
    }

    onConfirm() {
        this.dialogRef.close(true);
    }
    onCancel() {
        this.dialogRef.close(false);
    }
}
