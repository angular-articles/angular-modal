import {Component} from '@angular/core';

import {ModalConfig} from '../modal/modal-config';
import {ModalRef} from '../modal/modal-ref';

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
    constructor(public config: ModalConfig, public dialog: ModalRef) {}

    onClose() {
        this.dialog.close('some value');
    }
}
