webpackJsonp([3],{

/***/ 620:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubTitleSearchSubsScenePageModule", function() { return SubTitleSearchSubsScenePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sub_title_search_subs_scene__ = __webpack_require__(633);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SubTitleSearchSubsScenePageModule = (function () {
    function SubTitleSearchSubsScenePageModule() {
    }
    return SubTitleSearchSubsScenePageModule;
}());
SubTitleSearchSubsScenePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__sub_title_search_subs_scene__["a" /* SubTitleSearchSubsScenePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__sub_title_search_subs_scene__["a" /* SubTitleSearchSubsScenePage */]),
        ],
    })
], SubTitleSearchSubsScenePageModule);

//# sourceMappingURL=sub-title-search-subs-scene.module.js.map

/***/ }),

/***/ 633:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubTitleSearchSubsScenePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_yify_movies_yify_movies__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_clipboard__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_diagnostic__ = __webpack_require__(142);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SubTitleSearchSubsScenePage = (function () {
    function SubTitleSearchSubsScenePage(navCtrl, navParams, yifyProvider, transfer, file, toastCtrl, clipboard, socialSharing, localstorage, alert, diagnostic) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.yifyProvider = yifyProvider;
        this.transfer = transfer;
        this.file = file;
        this.toastCtrl = toastCtrl;
        this.clipboard = clipboard;
        this.socialSharing = socialSharing;
        this.localstorage = localstorage;
        this.alert = alert;
        this.diagnostic = diagnostic;
        this.sublist = [];
        this.showheader = false;
        this.params = { showheader: false };
        this.fileTransfer = this.transfer.create();
        this.params = navParams.get('params');
        if (this.params != null && this.params != undefined)
            this.showheader = this.params.showheader;
        this.localstorage.get('suburl').then(function (value) {
            _this.suburl = value;
            _this.loadSubtitle();
        });
    }
    SubTitleSearchSubsScenePage.prototype.loadSubtitle = function () {
        var _this = this;
        try {
            this.asynccall = true;
            this.yifyProvider.getSubSceneSubTitles(this.suburl).subscribe(function (res) {
                _this.subtitelist = res;
                if (_this.subtitelist.langs_names.length > 0) {
                    var j = 0;
                    for (var i = 0; i < _this.subtitelist.langs_names.length; i++) {
                        if (i % 2 === 0) {
                            _this.subtitelist.down_links[j].lang = _this.subtitelist.langs_names[i].lang_name;
                        }
                        else {
                            _this.subtitelist.down_links[j].name = _this.subtitelist.langs_names[i].lang_name;
                            j++;
                        }
                    }
                    _this.asynccall = false;
                    _this.sublist = _this.subtitelist.down_links;
                }
                else {
                    _this.asynccall = false;
                    _this.msg = true;
                }
            });
        }
        catch (e) {
            console.log(e);
            this.asynccall = false;
            this.msg = true;
        }
    };
    SubTitleSearchSubsScenePage.prototype.handleSubDownload = function (index) {
        var _this = this;
        this.sublist[index].downstart = true;
        this.yifyProvider.downloadSubsceneSubs(this.url).subscribe(function (res) {
            _this.fileTransfer.download('https://subscene.com' + res.downlink[0].link, _this.file.externalRootDirectory + 'YIFY_Torrent_Browser/' + _this.filename).then(function (entry) {
                _this.sublist[index].downstart = false;
                _this.sublist[index].downcomplete = true;
                _this.presentToast("File saved in : " + _this.file.externalRootDirectory.replace('file:///', '') + "YIFY_Torrent_Browser/" + _this.filename);
            }, function (error) {
                _this.showOpenSettingsAlert();
            });
        });
    };
    SubTitleSearchSubsScenePage.prototype.showOpenSettingsAlert = function () {
        var _this = this;
        var alert = this.alert.create({
            title: 'Permission needed!',
            message: 'This permission is needed to save the downloaded subtitle to disk!',
            buttons: [
                {
                    text: 'OPEN SETTINGS',
                    handler: function () {
                        _this.diagnostic.switchToSettings();
                    }
                }
            ]
        });
        alert.present();
    };
    SubTitleSearchSubsScenePage.prototype.downloadfile = function (file, index) {
        var _this = this;
        this.url = 'https://subscene.com' + file.link;
        this.filename = file.name + '.zip';
        this.diagnostic.isExternalStorageAuthorized().then(function (res) {
            if (res)
                _this.handleSubDownload(index);
            else
                _this.requestExternalStorageAuthorization(index);
        });
    };
    SubTitleSearchSubsScenePage.prototype.requestExternalStorageAuthorization = function (index) {
        var _this = this;
        this.diagnostic.requestExternalStorageAuthorization().then(function (res) {
            console.log("requestExternalStorageAuthorization ", res);
            if (res)
                _this.handleSubDownload(index);
            else
                _this.showOpenSettingsAlert();
        }, function (err) {
            _this.showOpenSettingsAlert();
        });
    };
    SubTitleSearchSubsScenePage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            position: 'bottom',
            closeButtonText: 'OK',
            showCloseButton: true
        });
        toast.onDidDismiss(function () {
            // this.showBanner()
        });
        toast.present();
    };
    return SubTitleSearchSubsScenePage;
}());
SubTitleSearchSubsScenePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-sub-title-search-subs-scene',template:/*ion-inline-start:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/sub-title-search-subs-scene/sub-title-search-subs-scene.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Subtitles</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n<div *ngIf = "asynccall" class="subspinner">\n  <svg class="spinner" width="55px" height="55px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">\n  <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>\n</svg>\n</div>\n<ion-item text-wrap *ngIf="msg">Subtitles not found for this movie, Try after some times !!!</ion-item>\n\n<ion-card *ngFor="let sub of sublist ; index as i">\n  \n    <ion-item>\n      <ion-icon style="color: #387ef5;" name="map" item-start large></ion-icon>\n      <h2>{{sub.lang}}  </h2>\n    </ion-item>\n  \n\n    <ion-item>\n      <ion-icon style="color: #387ef5;" name="document" item-left large ></ion-icon>\n      <h2>{{sub.name}}</h2>\n     \n    </ion-item>\n\n    <ion-item>\n        <button ion-button icon-left clear item-start>\n            <ion-spinner *ngIf = "sub.downstart" style= "color: #387ef5;" icon="dots" \n            class="spinner-dark"></ion-spinner>\n            <ion-icon *ngIf = "sub.downcomplete" style="font-size: 28px; color: green;" \n            ios="ios-checkmark" md="md-checkmark"></ion-icon> <span *ngIf = "sub.downcomplete" \n            style=" color: green;" >Downloaded!</span>\n          \n          </button> \n\n      <button ion-button icon-left clear item-end (click) = "downloadfile(sub, i)">\n          <ion-icon name="download"></ion-icon>\n          Download\n        </button>\n    </ion-item>\n  \n  </ion-card>\n\n\n</ion-content>\n'/*ion-inline-end:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/sub-title-search-subs-scene/sub-title-search-subs-scene.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__providers_yify_movies_yify_movies__["a" /* YifyMoviesProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_clipboard__["a" /* Clipboard */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_diagnostic__["a" /* Diagnostic */]],
        styles: [
            "ion-badge {\n      padding: 8px 11px;\n      text-align: center;\n      display: inline-block;\n      min-width: 10px;\n      font-size: 1.3rem;\n      font-weight: bold;\n      line-height: 1;\n      white-space: nowrap;\n      vertical-align: baseline;\n  }"
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_yify_movies_yify_movies__["a" /* YifyMoviesProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_clipboard__["a" /* Clipboard */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__["a" /* SocialSharing */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_diagnostic__["a" /* Diagnostic */]])
], SubTitleSearchSubsScenePage);

//# sourceMappingURL=sub-title-search-subs-scene.js.map

/***/ })

});
//# sourceMappingURL=3.js.map