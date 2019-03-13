import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ExampleComponent} from './example/example.component';
import {ModalModule} from './modal/modal.module';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent,
        ExampleComponent
    ],
    entryComponents: [
        ExampleComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        ModalModule
    ]
})

export class AppModule {
}
