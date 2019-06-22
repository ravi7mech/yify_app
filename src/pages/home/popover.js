var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { HomePage } from './home';
import { EmailComposer } from '@ionic-native/email-composer';
var PopoverPage = /** @class */ (function () {
    function PopoverPage(viewCtrl, homepage, navCtrl, emailComposer) {
        this.viewCtrl = viewCtrl;
        this.homepage = homepage;
        this.navCtrl = navCtrl;
        this.emailComposer = emailComposer;
        this.email = {
            app: 'gmail',
            to: 'storm7breaker@gmail.com',
            subject: 'Feedback',
            body: 'Attach some screenshots or type the details of the issue you are facing and send it...!!!',
            isHtml: true
        };
    }
    PopoverPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    PopoverPage.prototype.search = function () {
        this.navCtrl.push('SearchPage');
        // this.viewCtrl.dismiss();
    };
    PopoverPage.prototype.report = function () {
        this.emailComposer.addAlias('gmail', 'com.google.android.gm');
        this.emailComposer.open(this.email);
    };
    PopoverPage.prototype.shareApp = function () {
        this.homepage.shareApp();
    };
    PopoverPage = __decorate([
        Component({
            template: "\n      <ion-list no-lines style=\"margin: 0px 0 0px;\">\n        <button ion-item (click)=\"shareApp()\"><i class=\"fa fa-share-alt\" aria-hidden=\"true\"></i> <span style=\"padding-left: 15px;\">Share</span></button>\n       \n      </ion-list>\n    ",
            providers: [HomePage, EmailComposer]
        }),
        __metadata("design:paramtypes", [ViewController, HomePage,
            NavController, EmailComposer])
    ], PopoverPage);
    return PopoverPage;
}());
export { PopoverPage };
//# sourceMappingURL=popover.js.map