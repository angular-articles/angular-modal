import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    OnDestroy,
    Type,
    ViewChild
} from '@angular/core';
import {Subject} from 'rxjs';

import {InsertionDirective} from './insertion.directive';
import {ModalRef} from './modal-ref';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements AfterViewInit, OnDestroy {
    componentRef: ComponentRef<any>;

    @ViewChild(InsertionDirective)
    insertionPoint: InsertionDirective;

    private readonly onClose = new Subject<any>();
    public onClose$ = this.onClose.asObservable();

    childComponentType: Type<any>;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef, private modalRef: ModalRef) {}

    ngAfterViewInit() {
        this.loadChildComponent(this.childComponentType);
        this.cd.detectChanges();
    }

    onOverlayClicked(event: MouseEvent) {
        this.modalRef.close();
    }

    onDialogClicked(event: MouseEvent) {
        event.stopPropagation();
    }

    loadChildComponent(componentType: Type<any>) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

        const viewContainerRef = this.insertionPoint.viewContainerRef;
        viewContainerRef.clear();

        this.componentRef = viewContainerRef.createComponent(componentFactory);
    }

    ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }

    close() {
        this.onClose.next();
    }
}
