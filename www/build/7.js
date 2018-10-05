webpackJsonp([7],{

/***/ 614:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppSettingsPageModule", function() { return AppSettingsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_settings__ = __webpack_require__(627);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AppSettingsPageModule = (function () {
    function AppSettingsPageModule() {
    }
    return AppSettingsPageModule;
}());
AppSettingsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_settings__["a" /* AppSettingsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__app_settings__["a" /* AppSettingsPage */]),
        ],
    })
], AppSettingsPageModule);

//# sourceMappingURL=app-settings.module.js.map

/***/ }),

/***/ 627:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppSettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_component__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_yify_movies_yify_movies__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppSettingsPage = (function () {
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
    return AppSettingsPage;
}());
AppSettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-app-settings',template:/*ion-inline-start:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/app-settings/app-settings.html"*/'\n<ion-header>\n\n  <ion-navbar>\n      <button ion-button menuToggle style="font-size: 2.4rem;">\n          <ion-icon name="menu"></ion-icon>\n      </button>\n    <ion-title>Settings</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n<!--     <ion-list-header>\n        Provider / Load from*\n       </ion-list-header>\n       <ion-list radio-group [(ngModel)]="domain">\n         <ion-item>\n           <ion-label>Yts.am</ion-label>\n           <ion-radio value="yts.unblocked.lat" (ionSelect) = "useAm()"></ion-radio>\n         </ion-item>\n         <ion-item>\n           <ion-label>Yts.me</ion-label>\n           <ion-radio value="yts.me" (ionSelect) = "useMe()"></ion-radio>\n         </ion-item>\n       </ion-list>\n -->\n  <ion-list-header>\n   Night Mode\n  </ion-list-header>\n  <ion-list radio-group [(ngModel)]="mode">\n    <ion-item>\n      <ion-label>On</ion-label>\n      <ion-radio value="on" (ionSelect) = "showMode()"></ion-radio>\n    </ion-item>\n    <ion-item>\n      <ion-label>Off</ion-label>\n      <ion-radio value="off" (ionSelect) = "showMode()"></ion-radio>\n    </ion-item>\n    <ion-item>\n      <ion-label>Automatic on Sunset</ion-label>\n      <ion-radio value="auto" (ionSelect) = "showMode()"></ion-radio>\n    </ion-item>\n  </ion-list>\n  \n\n</ion-content>\n\n'/*ion-inline-end:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/app-settings/app-settings.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__app_app_component__["a" /* MyApp */],
        __WEBPACK_IMPORTED_MODULE_4__providers_yify_movies_yify_movies__["a" /* YifyMoviesProvider */]])
], AppSettingsPage);

//# sourceMappingURL=app-settings.js.map

/***/ })

});
//# sourceMappingURL=7.js.map