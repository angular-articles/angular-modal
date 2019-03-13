import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type} from '@angular/core';

import {ModalModule} from './modal.module';
import {ModalComponent} from './modal.component';
import {ModalConfig} from './modal-config';
import {ModalRef} from './modal-ref';
import {ModalInjector} from './modal-injector';

@Injectable({
    providedIn: ModalModule
})

export class ModalService {
    dialogComponentRef: ComponentRef<ModalComponent>;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {
    }

    public open(componentType: Type<any>, config: ModalConfig) {
        const dialogRef = this.appendDialogComponentToBody(config);

        this.dialogComponentRef.instance.childComponentType = componentType;

        return dialogRef;
    }

    private appendDialogComponentToBody(config: ModalConfig) {
        const map = new WeakMap();
        map.set(ModalConfig, config);

        const dialogRef = new ModalRef();
        map.set(ModalRef, dialogRef);

        const sub = dialogRef.afterClosed$.subscribe(() => {
            this.removeDialogComponentFromBody();
            sub.unsubscribe();
        });

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
        const componentRef = componentFactory.create(new ModalInjector(this.injector, map));

        this.appRef.attachView(componentRef.hostView);

        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);

        this.dialogComponentRef = componentRef;

        this.dialogComponentRef.instance.onClose$.subscribe(() => {
            this.removeDialogComponentFromBody();
        });

        return dialogRef;
    }

    private removeDialogComponentFromBody() {
        this.appRef.detachView(this.dialogComponentRef.hostView);
        this.dialogComponentRef.destroy();
    }
}
