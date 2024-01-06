import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UiService } from 'src/app/shared/services/ui.service';

@Component({
    selector: 'app-large-image',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './large-image.component.html',
    styleUrls: ['./large-image.component.scss']
})
export class LargeImageComponent implements OnInit {

    url: string;

    constructor(
        // @Inject(MAT_DIALOG_DATA) public data: any,
        private route: ActivatedRoute,
        private uiService: UiService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.uiService.showHeaderFooter.next(false)
        this.route.params.subscribe((params: any) => {
            console.log(params)
            this.url = params.url
        })
        // console.log(this.data.url)
    }
    onClose() {
        this.uiService.showHeaderFooter.next(true);
        this.router.navigateByUrl('product-visitor')
    }
}
