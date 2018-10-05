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
import { IonicPage, NavController, PopoverController } from 'ionic-angular';
import { PopoverPage } from '../home/popover';
import { Storage } from "@ionic/storage";
import { SocialSharing } from '@ionic-native/social-sharing';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, popoverCtrl, localstorage, socialSharing) {
        this.navCtrl = navCtrl;
        this.popoverCtrl = popoverCtrl;
        this.localstorage = localstorage;
        this.socialSharing = socialSharing;
        this.page1 = 'Page1Page';
        this.page2 = 'Page2Page';
        this.page3 = 'Page3Page';
        this.playstoreappurl = "https://play.google.com/store/apps/details?id=com.project.yifybrowserandsubs";
        this.domain = 'ytsam';
    }
    HomePage.prototype.setBadgeCount = function (count) {
        this.badgecount = count;
    };
    HomePage.prototype.search = function () {
        this.navCtrl.push('SearchPage');
    };
    HomePage.prototype.openPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(PopoverPage);
        popover.present({
            ev: myEvent
        });
    };
    HomePage.prototype.setBookMarkCount = function (count) {
        this.bookmarkcount = count;
    };
    HomePage.prototype.shareApp = function () {
        var _this = this;
        this.socialSharing.share(null, null, null, this.playstoreappurl).then(function (res) {
            console.log("shared");
            _this.localstorage.set('shared', 'Y');
        }).catch(function (e) {
            _this.localstorage.set('shared', 'N');
            _this.localstorage.set('tried', 1);
        });
    };
    HomePage = __decorate([
        IonicPage({
            segment: 'home/:type'
        }),
        Component({
            selector: 'page-home',
            templateUrl: 'home.html',
            providers: [SocialSharing],
            styles: [
                ".mypopover-content{\n      box-shadow: 0 3px 0px 2px rgba(0, 0, 0, 0.3) !important;\n      top: 52px !important;\n      left: 70px !important;\n      transform-origin: right top 0px !important;\n      transform: scale(1) !important;\n      width: 252px !important;\n    \n    }"
            ]
        }),
        __metadata("design:paramtypes", [NavController, PopoverController,
            Storage, SocialSharing])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map