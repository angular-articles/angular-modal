import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {InsertionDirective} from './insertion.directive';
import {ModalComponent} from './modal.component';

@NgModule({
    declarations: [
        InsertionDirective,
        ModalComponent
    ],
    entryComponents: [
        ModalComponent
    ],
    imports: [
        CommonModule
    ]
})

export class ModalModule {
}
