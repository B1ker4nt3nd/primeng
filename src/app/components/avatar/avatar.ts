import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'p-avatar',
    template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <ng-content></ng-content>
            <span class="p-avatar-text" *ngIf="label; else iconTemplate">{{ label }}</span>
            <ng-template #iconTemplate><span [class]="icon" [ngClass]="'p-avatar-icon'" *ngIf="icon; else imageTemplate"></span></ng-template>
            <ng-template #imageTemplate><img [src]="image" *ngIf="image" (error)="imageError($event)" /></ng-template>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./avatar.css'],
    host: {
        class: 'p-element'
    }
})
export class Avatar {
    /**
     * Defines the text to display.
     */
    @Input() label: string | undefined;
    /**
     * Defines the icon to display.
     */
    @Input() icon: string | undefined;
    /**
     * Defines the image to display.
     */
    @Input() image: string | undefined;
    /**
     * Size of the element.
     * @defaultValue normal
     * @possibleValues 'normal' | 'large' | 'xlarge'
     */
    @Input() size: 'normal' | 'large' | 'xlarge' | undefined = 'normal';
    /**
     * Shape of the element.
     * @defaultValue square
     * @possibleValues 'square' | 'circle'
     */
    @Input() shape: 'square' | 'circle' | undefined = 'square';
    /**
     * Inline style of the element.
     */
    @Input() style: CSSStyleDeclaration | undefined;
    /**
     * Class of the element.
     */
    @Input() styleClass: string;
    /**
     * This event is triggered if an error occurs while loading an image file.
     */
    @Output() onImageError: EventEmitter<Event> = new EventEmitter();

    containerClass() {
        return {
            'p-avatar p-component': true,
            'p-avatar-image': this.image != null,
            'p-avatar-circle': this.shape === 'circle',
            'p-avatar-lg': this.size === 'large',
            'p-avatar-xl': this.size === 'xlarge'
        };
    }

    imageError(event) {
        this.onImageError.emit(event);
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Avatar],
    declarations: [Avatar]
})
export class AvatarModule {}
