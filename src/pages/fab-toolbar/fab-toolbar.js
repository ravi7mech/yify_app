var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, Input, Renderer } from '@angular/core';
/**
 * @name FabToolbar
 * @description
 * FabToolbar is Ionic v2 component which uses ionic fab buttons, buttons. Inspired by Google's Material Design
 *
 * On click Fab button will transform into tab like area with provided buttons
 *
 * @usage
 * *html - simply add the 'fab-toolbar' tag to your page and bind the properties.
 * ```
 * <fab-toolbar  [color]="'light'" [icon]="'more'" [enableBackdropDismiss]="'false'" [position]="'left" [buttons]="buttons"></fab-toolbar>
 * ```
 *
 * *javascript - starting from Ionic 2 RC0.0 (AoT) you should provide all components inside app.module.ts
 *                 after adding them into app.module.ts import FabToolbar
 *  ```
 * import { FabToolbar } from './fab-toolbar/fab-toolbar';
 *
 * public buttons = [
 *  {
 *      icon: 'add',
 *      title: 'Add',
 *      color: 'dark',
 *      handler: () => {console.log('added');}
 *  },
 *  {
 *      icon: 'cart',
 *      title: 'Products',
 *      color: 'dark',
 *      handler: () => {console.log('Products');}
 *  }
 * ]
 * ```
 *
 * @see {@link https://github.com/ekhmoi/Ionic-Component-fab-toolbar Ionic-Component-fab-toolbar}
 *
 */
var FabToolbar = /** @class */ (function () {
    function FabToolbar(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.active = false;
        this.position = 'left';
        this.color = 'secondary';
        this.icon = 'more';
        this.cssClass = '';
        this.enableBackdropDismiss = true;
        this.buttons = [];
    }
    FabToolbar.prototype.ngOnInit = function () {
        this.renderer.setElementClass(this.el.nativeElement, this.position, true);
    };
    FabToolbar.prototype.onClick = function (event, button) {
        var _this = this;
        // We are listening to click event on document in order to be able to close button on backdrop click
        // Therefore we need to check if user clicked on our component or outside
        if (!event && !button) {
            // clicked on backdrop
            if (this.enableBackdropDismiss === true && this.active) {
                this.closeButton();
                return;
            }
        }
        if (this.el.nativeElement.contains(event.target)) {
            // User has clicked on our component. Check if he clicked on sub button or no.
            if (button) {
                var shouldDismiss = true;
                if (button.handler) {
                    // a handler has been provided, execute it
                    if (button.handler() === false) {
                        // if the return value of the handler is false then do not dismiss
                        shouldDismiss = false;
                    }
                }
                if (shouldDismiss) {
                    setTimeout(function () {
                        _this.closeButton();
                    }, 10);
                }
            }
            else {
                if (!this.active)
                    this.openButton();
            }
        }
        else {
            // User has clicked outside our component.
            // Check if `enableBackdropDismiss` is true and if component is opened.
            if (this.enableBackdropDismiss === true && this.active) {
                this.closeButton();
            }
        }
    };
    Object.defineProperty(FabToolbar.prototype, "width", {
        get: function () {
            var width = window.innerWidth / 56 * 2;
            return 'scale(' + width + ')';
        },
        enumerable: true,
        configurable: true
    });
    FabToolbar.prototype.openButton = function () {
        var _this = this;
        this.renderer.setElementClass(this.el.nativeElement, 'activated', true);
        setTimeout(function () {
            _this.renderer.setElementClass(_this.el.nativeElement, 'closed', false);
            _this.renderer.setElementClass(_this.el.nativeElement, 'opened', true);
        }, 400);
        this.renderer.setElementStyle(this.el.nativeElement, 'width', '100%');
        this.active = true;
    };
    FabToolbar.prototype.closeButton = function () {
        var _this = this;
        this.renderer.setElementClass(this.el.nativeElement, 'activated', false);
        setTimeout(function () {
            _this.renderer.setElementClass(_this.el.nativeElement, 'opened', false);
            _this.renderer.setElementClass(_this.el.nativeElement, 'closed', true);
            _this.renderer.setElementStyle(_this.el.nativeElement, 'width', '68px');
        }, 400);
        this.active = false;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FabToolbar.prototype, "position", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FabToolbar.prototype, "color", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FabToolbar.prototype, "icon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FabToolbar.prototype, "cssClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FabToolbar.prototype, "enableBackdropDismiss", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], FabToolbar.prototype, "buttons", void 0);
    FabToolbar = __decorate([
        Component({
            selector: 'fab-toolbar',
            template: "\n        <div tappable class=\"backdrop\" (click)=\"onClick(false, false)\"></div>\n        <div class=\"fab-toolbar\">\n            <ion-row [style.transform]=\"\">\n                <ion-col *ngFor=\"let b of buttons\">\n                    <button (click)=\"onClick($event, b)\" ion-button clear [color]=\"b.color ? b.color : 'light'\">\n                        <div>\n                            <ion-icon style=\"color: white;\" *ngIf=\"b.icon\" [name]=\"b.icon\"></ion-icon>\n                                <br *ngIf=\"b.title && b.icon\">\n                            <label *ngIf=\"b.title\" style=\"color: white;\">{{b.title}}</label>\n                        </div>\n                    </button>\n                </ion-col>\n            </ion-row>\n           \n            <button (click)=\"onClick($event, false)\" [style.transform]=\"active ? width: 'scale(1)' \" \n            ion-fab color=\"{{color}}\"><ion-icon name=\"{{icon}}\"></ion-icon></button>\n\n\n        </div>\n        "
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer])
    ], FabToolbar);
    return FabToolbar;
}());
export { FabToolbar };
//# sourceMappingURL=fab-toolbar.js.map