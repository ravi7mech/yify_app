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
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { MyApp } from '../../app/app.component';
import { YifyMoviesProvider } from '../../providers/yify-movies/yify-movies';
var AppSettingsPage = /** @class */ (function () {
    function AppSettingsPage(navCtrl, navParams, localstorage, toastCtrl, myapp, yifyprovider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.localstorage = localstorage;
        this.toastCtrl = toastCtrl;
        this.myapp = myapp;
        this.yifyprovider = yifyprovider;
        this.checkAppThemeMode();
    }
    AppSettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AppSettingsPage');
    };
    AppSettingsPage.prototype.showMode = function () {
        this.localstorage.set("mode", this.mode);
        this.presentToast("Configured!!");
        this.setModeTheme(this.mode);
    };
    AppSettingsPage.prototype.setModeTheme = function (mode) {
        if (mode == "on") {
            this.myapp.selectedTheme = 'dark-theme';
            this.myapp.setStatusBarColor('#060a1f');
        }
        else if (mode == "off") {
            this.myapp.selectedTheme = 'light-theme';
            this.myapp.setStatusBarColor('#3F51B5');
        }
        else if (mode == "auto") {
            var d = new Date();
            if (d.getHours() >= 18 || (6 >= d.getHours())) {
                this.myapp.selectedTheme = 'dark-theme';
                this.myapp.setStatusBarColor('#060a1f');
            }
            else {
                this.myapp.selectedTheme = 'light-theme';
                this.myapp.setStatusBarColor('#3F51B5');
            }
        }
    };
    AppSettingsPage.prototype.useAm = function () {
        this.yifyprovider.Url = 'https://yts.unblocked.lat/api/v2';
    };
    AppSettingsPage.prototype.useMe = function () {
        this.yifyprovider.Url = 'https://yts.me/api/v2';
    };
    AppSettingsPage.prototype.checkAppThemeMode = function () {
        var _this = this;
        this.localstorage.get("mode").then(function (res) {
            if (res == null || res == undefined || res == '') {
                _this.mode = "off";
            }
            else {
                _this.mode = res;
            }
            _this.setModeTheme(_this.mode);
        });
        if (this.yifyprovider.Url && this.yifyprovider.Url.includes('yts.unblocked.lat')) {
            this.domain = 'yts.unblocked.lat';
        }
        else {
            this.domain = 'yts.me';
        }
    };
    AppSettingsPage.prototype.getYifydomain = function () {
        if (this.yifyprovider.Url.includes('yts.unblocked.lat')) {
            this.domain = 'yts.unblocked.lat';
        }
        else {
            this.domain = 'yts.me';
        }
        return this.domain;
    };
    AppSettingsPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            position: 'bottom',
            closeButtonText: 'Ok',
            showCloseButton: false,
            duration: 2000
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    AppSettingsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-app-settings',
            templateUrl: 'app-settings.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Storage, ToastController, MyApp,
            YifyMoviesProvider])
    ], AppSettingsPage);
    return AppSettingsPage;
}());
export { AppSettingsPage };
//# sourceMappingURL=app-settings.js.map