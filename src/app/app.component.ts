import {Component} from '@angular/core';

import {ExampleComponent} from './example/example.component';
import {ModalService} from './modal/modal.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title = 'angular-modal';

    constructor(public modal: ModalService) {
    }

    showModal(event: MouseEvent) {
        event.preventDefault();

        const ref = this.modal.open(ExampleComponent, { data: { message: 'I am a dynamic component inside of a dialog!' } });

        ref.afterClosed$.subscribe(result => {
            console.log('Dialog closed', result);
        });
    }
}
