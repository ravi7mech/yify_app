webpackJsonp([15],{

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubsceneListPage; });
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









var SubsceneListPage = (function () {
    function SubsceneListPage(navCtrl, navParams, yifyProvider, transfer, file, toastCtrl, clipboard, socialSharing, localstorage, alert, diagnostic) {
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
    /* showBanner() {
  
      let interaddConfig: AdMobFreeBannerConfig = {
        autoShow: true,
        id: 'ca-app-pub-8173350460907694/2714806253'
  
      };
  
      this.admob.interstitial.config(interaddConfig);
      this.admob.interstitial.prepare();
      this.admob.interstitial.show();
  
    } */
    SubsceneListPage.prototype.loadSubtitle = function () {
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
    SubsceneListPage.prototype.handleSubDownload = function (index) {
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
    SubsceneListPage.prototype.showOpenSettingsAlert = function () {
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
    SubsceneListPage.prototype.downloadfile = function (file, index) {
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
    SubsceneListPage.prototype.requestExternalStorageAuthorization = function (index) {
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
    SubsceneListPage.prototype.presentToast = function (msg) {
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
    return SubsceneListPage;
}());
SubsceneListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-subscene-list',template:/*ion-inline-start:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/subscene-list/subscene-list.html"*/'\n<ion-content padding>\n  <div *ngIf = "asynccall" class="subspinner">\n    <svg class="spinner" width="55px" height="55px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">\n    <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>\n  </svg>\n  </div>\n  <ion-item text-wrap *ngIf="msg">Subtitles not found for this movie, Try after some times !!!</ion-item>\n  \n  <ion-card *ngFor="let sub of sublist ; index as i">\n    \n      <ion-item>\n        <ion-icon style="color: #387ef5;" name="map" item-start large></ion-icon>\n        <h2>{{sub.lang}}  </h2>\n      </ion-item>\n    \n  \n      <ion-item>\n        <ion-icon style="color: #387ef5;" name="document" item-left large ></ion-icon>\n        <h2>{{sub.name}}</h2>\n       \n      </ion-item>\n  \n      <ion-item>\n          <button ion-button icon-left clear item-start>\n              <ion-spinner *ngIf = "sub.downstart" style= "color: #387ef5;" icon="dots" \n              class="spinner-dark"></ion-spinner>\n              <ion-icon *ngIf = "sub.downcomplete" style="font-size: 28px; color: green;" \n              ios="ios-checkmark" md="md-checkmark"></ion-icon> <span *ngIf = "sub.downcomplete" \n              style=" color: green;" >Downloaded!</span>\n            \n            </button> \n\n        <button ion-button icon-left clear item-end (click) = "downloadfile(sub, i)">\n            <ion-icon name="download"></ion-icon>\n            Download\n          </button>\n      </ion-item>\n    \n    </ion-card>\n  \n  \n  </ion-content>\n  '/*ion-inline-end:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/subscene-list/subscene-list.html"*/,
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
], SubsceneListPage);

//# sourceMappingURL=subscene-list.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubtitlesListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_yify_movies_yify_movies__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_clipboard__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__subtitle_tabs_subtitle_tabs__ = __webpack_require__(291);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SubtitlesListPage = (function () {
    function SubtitlesListPage(navCtrl, navParams, yifyProvider, transfer, file, toastCtrl, clipboard, socialSharing, subtabs, alert, diagnostic) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.yifyProvider = yifyProvider;
        this.transfer = transfer;
        this.file = file;
        this.toastCtrl = toastCtrl;
        this.clipboard = clipboard;
        this.socialSharing = socialSharing;
        this.subtabs = subtabs;
        this.alert = alert;
        this.diagnostic = diagnostic;
        this.filteredsubnames = [];
        this.sublist = [];
        this.imdb_code = subtabs.imdb_code;
        this.fileTransfer = this.transfer.create();
        ;
        this.loadSubtitle();
    }
    /* showBanner() {
  
      let interaddConfig: AdMobFreeBannerConfig = {
        autoShow: true,
        id: 'ca-app-pub-8173350460907694/2714806253'
  
      };
  
      this.admob.interstitial.config(interaddConfig);
      this.admob.interstitial.prepare();
      this.admob.interstitial.show();
  
    } */
    SubtitlesListPage.prototype.showOpenSettingsAlert = function () {
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
    SubtitlesListPage.prototype.loadSubtitle = function () {
        var _this = this;
        try {
            this.asynccall = true;
            this.yifyProvider.getYifySUbTitles(this.imdb_code).subscribe(function (res) {
                _this.yifyresult = res;
                console.log(_this.yifyresult);
                if (_this.yifyresult.lang_list.length > 0) {
                    for (var i = 0; i < _this.yifyresult.sub_names.length; i++) {
                        if (_this.yifyresult.sub_names[i].subname.includes('subtitle')) {
                            var subname = { subname: _this.yifyresult.sub_names[i].subname.substring(9, _this.yifyresult.sub_names[i].subname.length) };
                            _this.filteredsubnames.push(subname);
                        }
                        ;
                    }
                    for (var i = 0; i < _this.yifyresult.rating_list.length; i++) {
                        var subobj = {
                            lang: _this.yifyresult.lang_list[i].lang,
                            link: 'https://www.yifysubtitles.com' + _this.yifyresult.sub_links[i].download_link.replace('subtitles', 'subtitle') + '.zip',
                            rating: _this.yifyresult.rating_list[i].rating,
                            name: _this.filteredsubnames[i].subname,
                            downstart: false,
                            downcomplete: false
                        };
                        _this.sublist.push(subobj);
                    }
                    _this.asynccall = false;
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
    SubtitlesListPage.prototype.handleSubDownload = function (index) {
        var _this = this;
        this.sublist[index].downstart = true;
        this.fileTransfer.download(this.url, this.file.externalRootDirectory + 'YIFY_Torrent_Browser/' + this.filename).then(function (entry) {
            _this.sublist[index].downstart = false;
            _this.sublist[index].downcomplete = true;
            _this.presentToast("File saved in : " + _this.file.externalRootDirectory.replace('file:///', '') + "YIFY_Torrent_Browser/" + _this.filename);
        }, function (error) {
            _this.showOpenSettingsAlert();
        });
    };
    SubtitlesListPage.prototype.downloadfile = function (file, index) {
        var _this = this;
        this.url = file.link;
        this.filename = this.url.split("/").pop();
        this.diagnostic.isExternalStorageAuthorized().then(function (res) {
            if (res)
                _this.handleSubDownload(index);
            else
                _this.requestExternalStorageAuthorization(index);
        });
    };
    SubtitlesListPage.prototype.requestExternalStorageAuthorization = function (index) {
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
    SubtitlesListPage.prototype.copylink = function (file) {
        this.clipboard.copy(file.link);
        this.presentToast('Copied!!');
    };
    SubtitlesListPage.prototype.sharelink = function (file) {
        var message = file.link;
        this.socialSharing.share(null, null, null, message).then(function (res) {
            // this.showBanner();
        }).catch(function (e) {
            console.log(e);
        });
    };
    SubtitlesListPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            position: 'bottom',
            closeButtonText: 'OK',
            showCloseButton: true
        });
        toast.onDidDismiss(function () {
            // this.showBanner();
        });
        toast.present();
    };
    return SubtitlesListPage;
}());
SubtitlesListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-subtitles-list',template:/*ion-inline-start:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/subtitles-list/subtitles-list.html"*/'<ion-content padding>\n<div *ngIf = "asynccall" class="subspinner">\n  <svg class="spinner1" width="55px" height="55px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">\n  <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>\n</svg>\n</div>\n<ion-item text-wrap *ngIf="msg">Subtitles not found for this movie, Try after some times !!!</ion-item>\n\n<ion-card *ngFor="let sub of sublist ; index as i">\n  \n    <ion-item>\n      <ion-icon style="color: #387ef5;" name="map" item-start large></ion-icon>\n      <h2>{{sub.lang}}  </h2>\n    </ion-item>\n  \n    <ion-item>\n        <ion-icon style="color: #387ef5;" name="star" item-left large ></ion-icon>\n        <h2><ion-badge id="cart-badge"> {{sub.rating}} </ion-badge></h2>\n       \n    </ion-item>\n\n    <ion-item>\n      <ion-icon style="color: #387ef5;" name="document" item-left large ></ion-icon>\n      <h2>{{sub.name}}</h2>\n     \n    </ion-item>\n    <ion-item>\n        <button ion-button icon-left clear item-start>\n            <ion-spinner *ngIf = "sub.downstart" style= "color: #387ef5;" icon="dots" \n            class="spinner-dark"></ion-spinner>\n            <ion-icon *ngIf = "sub.downcomplete" style="font-size: 28px; color: green;" \n            ios="ios-checkmark" md="md-checkmark"></ion-icon> <span *ngIf = "sub.downcomplete" \n            style=" color: green;" >Downloaded!</span>\n          \n          </button>  \n        <button ion-button icon-left clear item-end (click) = "copylink(sub)">\n            <ion-icon name="copy"></ion-icon>\n            Copy\n          </button>\n      <button ion-button icon-left clear item-end (click) = "sharelink(sub)">\n        <ion-icon name="share"></ion-icon>\n        Share\n      </button>\n      <button ion-button icon-left clear item-end (click) = "downloadfile(sub,i)">\n          <ion-icon name="download"></ion-icon>\n          Download\n        </button>\n    </ion-item>\n  \n  </ion-card>\n\n\n</ion-content>\n'/*ion-inline-end:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/subtitles-list/subtitles-list.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__providers_yify_movies_yify_movies__["a" /* YifyMoviesProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_clipboard__["a" /* Clipboard */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__["a" /* Diagnostic */]],
        styles: [
            "ion-badge {\n      padding: 8px 11px;\n      text-align: center;\n      display: inline-block;\n      min-width: 10px;\n      font-size: 1.3rem;\n      font-weight: bold;\n      line-height: 1;\n      white-space: nowrap;\n      vertical-align: baseline;\n  }"
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_yify_movies_yify_movies__["a" /* YifyMoviesProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_clipboard__["a" /* Clipboard */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__["a" /* SocialSharing */],
        __WEBPACK_IMPORTED_MODULE_8__subtitle_tabs_subtitle_tabs__["a" /* SubtitleTabsPage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__["a" /* Diagnostic */]])
], SubtitlesListPage);

//# sourceMappingURL=subtitles-list.js.map

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SettingsProvider = (function () {
    function SettingsProvider() {
        this.theme = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["BehaviorSubject"]('light-theme');
    }
    SettingsProvider.prototype.setActiveTheme = function (val) {
        this.theme.next(val);
    };
    SettingsProvider.prototype.getActiveTheme = function () {
        return this.theme.asObservable();
    };
    SettingsProvider.prototype.getSavedTheme = function () {
        return '';
    };
    return SettingsProvider;
}());
SettingsProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], SettingsProvider);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 154:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 154;

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/about/about.module": [
		611,
		10
	],
	"../pages/advance-search-results/advance-search-results.module": [
		612,
		9
	],
	"../pages/advanced-search/advanced-search.module": [
		613,
		8
	],
	"../pages/app-settings/app-settings.module": [
		614,
		7
	],
	"../pages/home/home.module": [
		607,
		12
	],
	"../pages/moviedetails/moviedetails.module": [
		615,
		1
	],
	"../pages/page1/page1.module": [
		617,
		0
	],
	"../pages/page2/page2.module": [
		616,
		6
	],
	"../pages/page3/page3.module": [
		618,
		5
	],
	"../pages/search/search.module": [
		619,
		4
	],
	"../pages/sub-title-search-subs-scene/sub-title-search-subs-scene.module": [
		620,
		3
	],
	"../pages/subscene-list/subscene-list.module": [
		608,
		14
	],
	"../pages/subtitle-search/subtitle-search.module": [
		621,
		2
	],
	"../pages/subtitle-tabs/subtitle-tabs.module": [
		609,
		11
	],
	"../pages/subtitles-list/subtitles-list.module": [
		610,
		13
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 197;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_email_composer__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PopoverPage = (function () {
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
    return PopoverPage;
}());
PopoverPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: "\n      <ion-list no-lines style=\"margin: 0px 0 0px;\">\n        <button ion-item (click)=\"shareApp()\"><i class=\"fa fa-share-alt\" aria-hidden=\"true\"></i> <span style=\"padding-left: 15px;\">Share</span></button>\n       \n      </ion-list>\n    ",
        providers: [__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_email_composer__["a" /* EmailComposer */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_email_composer__["a" /* EmailComposer */]])
], PopoverPage);

//# sourceMappingURL=popover.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_popover__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_social_sharing__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = (function () {
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
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_2__home_popover__["a" /* PopoverPage */]);
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
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPage */])({
        segment: 'home/:type'
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-home',template:/*ion-inline-start:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/home/home.html"*/'\n<ion-header>\n  \n    <ion-navbar>\n      <ion-buttons start>\n        <button ion-button (click)="search()">\n          <ion-icon name="search" style="font-size: 2.4rem;" ></ion-icon>\n        </button>\n      </ion-buttons>\n      <button ion-button menuToggle style="font-size: 2.4rem;">\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      <ion-title>\n       Browser for YIFY (Yts)  \n      </ion-title>\n      <ion-buttons end>\n        <button ion-button (click)="openPopover($event)" style="font-size: 2.4rem;">\n          <ion-icon name="more"></ion-icon>\n        </button>\n      </ion-buttons>\n    </ion-navbar>\n  \n  </ion-header>\n\n  \n\n\n<ion-content no-bounce >\n  <super-tabs>\n    <super-tab [root]="page1" title="LATEST"></super-tab>\n    <super-tab [root]="page2" title="TOP RATED"></super-tab>\n    <super-tab [root]="page3" title="SAVED" badge="{{bookmarkcount}}" ></super-tab>\n  </super-tabs>\n</ion-content>\n'/*ion-inline-end:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/home/home.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_4__ionic_native_social_sharing__["a" /* SocialSharing */]],
        styles: [
            ".mypopover-content{\n      box-shadow: 0 3px 0px 2px rgba(0, 0, 0, 0.3) !important;\n      top: 52px !important;\n      left: 70px !important;\n      transform-origin: right top 0px !important;\n      transform: scale(1) !important;\n      width: 252px !important;\n    \n    }"
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* PopoverController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_social_sharing__["a" /* SocialSharing */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_email_composer__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_device__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_social_sharing__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_app_availability__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_settings_settings__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_push__ = __webpack_require__(583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_toast__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_market__ = __webpack_require__(584);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_network__ = __webpack_require__(585);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var MyApp = (function () {
    function MyApp(platform, splashScreen, statusBar, emailComposer, device, toastCtrl, localstorage, socialSharing, appAvailability, settings, alert, push, market, toast, network) {
        var _this = this;
        this.emailComposer = emailComposer;
        this.device = device;
        this.toastCtrl = toastCtrl;
        this.localstorage = localstorage;
        this.socialSharing = socialSharing;
        this.appAvailability = appAvailability;
        this.settings = settings;
        this.alert = alert;
        this.push = push;
        this.market = market;
        this.toast = toast;
        this.network = network;
        this.isPurchased = false;
        this.backButtonPressedOnceToExit = false;
        this.playstoreappurl = "https://play.google.com/store/apps/details?id=com.project.yifybrowserandsubs";
        this.torrentapps = ['com.utorrent.client', 'com.mobilityflow.torrent', 'com.bittorrent.client',
            'com.napolovd.piratecat', 'com.delphicoder.flud', 'com.frostwire.android', 'com.gabordemko.torrnado',
            'org.transdroid.lite', 'com.vuze.torrent.downloader', 'com.teeonsoft.ztorrent', 'com.bittorrent.client.pro'];
        this.version = 'v1.0.0';
        this.email = {
            app: 'gmail',
            to: 'phoenixcoders777@gmail.com',
            subject: 'Feedback',
            body: 'Attach some screenshots or type the details of the issue you are facing and send it...!!!',
            isHtml: true
        };
        this.menuItems = [
            {
                name: 'Home',
                page: 'HomePage',
                faclass: 'fa fa-home fa-lg',
                params: { type: 'all' }
            },
            {
                name: 'Subtitles',
                page: 'SubtitleSearchPage',
                faclass: 'fa fa-file-archive-o fa-lg'
            },
            {
                name: 'Advanced Search',
                page: 'AdvancedSearchPage',
                faclass: 'fa fa-search-plus fa-lg'
            },
            {
                name: 'Share',
                page: 'SharePage',
                faclass: 'fa fa-share-alt fa-lg'
            },
            {
                name: 'Settings',
                page: 'AppSettingsPage',
                faclass: 'fa fa-cog fa-lg'
            },
            {
                name: 'Rate Us',
                page: 'RateUs',
                faclass: 'fa fa-star fa-lg'
            },
            {
                name: 'Privacy Policy',
                page: 'PrivacyPolicy',
                faclass: 'fa fa-file-text fa-lg'
            },
            {
                name: 'About',
                page: 'AboutPage',
                faclass: 'fa fa-info-circle fa-lg'
            }
        ];
        this.rootPage = this.menuItems[0].page;
        this.rootParams = this.menuItems[0].params;
        this.settings.getActiveTheme().subscribe(function (val) { return _this.selectedTheme = val; });
        this.checkAppThemeMode();
        this.platform = platform;
        this.stb = statusBar;
        platform.ready().then(function () {
            splashScreen.hide();
            statusBar.backgroundColorByHexString('#3F51B5');
            platform.registerBackButtonAction(function () {
                if (_this.backButtonPressedOnceToExit) {
                    _this.platform.exitApp();
                }
                else if (_this.nav.canGoBack()) {
                    _this.nav.pop({});
                }
                else {
                    _this.showToast();
                    _this.backButtonPressedOnceToExit = true;
                    setTimeout(function () {
                        _this.backButtonPressedOnceToExit = false;
                    }, 2000);
                }
            });
        });
        this.localstorage.set("hastorapp", false);
        this.checkTorrentsAppAvailability();
        this.registerNetworkEvents();
    }
    MyApp.prototype.registerNetworkEvents = function () {
        var _this = this;
        this.network.onDisconnect().subscribe(function () {
            _this.showNetworkError("Disconnected!");
        });
        this.network.onConnect().subscribe(function () {
            _this.showNetworkError("Connected!");
            _this.showBanner();
        });
    };
    MyApp.prototype.showNetworkError = function (msg) {
        this.toast.show("Network " + msg + "!", '3000', 'bottom').subscribe(function (toast) {
            console.log(toast);
        });
    };
    MyApp.prototype.setPurchased = function (val) {
        this.isPurchased = val;
    };
    MyApp.prototype.showBanner = function () {
    };
    MyApp.prototype.setStatusBarColor = function (color) {
        this.stb.backgroundColorByHexString(color);
    };
    MyApp.prototype.showRestartAlert = function () {
        var _this = this;
        var alert = this.alert.create({
            title: 'Thank you !!',
            message: 'Apps needs to get restarted to apply changes!!',
            buttons: [
                {
                    text: 'LATER',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'RESTART',
                    handler: function () {
                        _this.platform.exitApp();
                    }
                }
            ]
        });
        alert.present();
    };
    MyApp.prototype.checkTorrentsAppAvailability = function () {
        var _this = this;
        for (var i = 0; i < this.torrentapps.length; i++) {
            this.appAvailability.check(this.torrentapps[i].toString())
                .then(function (yes) { return _this.localstorage.set('hastorapp', true); }, function (no) { return console.log("not available"); });
        }
    };
    MyApp.prototype.checkAppThemeMode = function () {
        var _this = this;
        this.localstorage.get("mode").then(function (res) {
            if (res == null || res == undefined || res == '') {
                _this.setModeTheme("off");
            }
            else {
                _this.setModeTheme(res);
            }
        });
    };
    MyApp.prototype.setModeTheme = function (mode) {
        if (mode == "on") {
            this.selectedTheme = 'dark-theme';
            this.setStatusBarColor('#060a1f');
        }
        else if (mode == "off") {
            this.selectedTheme = 'light-theme';
            this.setStatusBarColor('#3F51B5');
        }
        else if (mode == "auto") {
            var d = new Date();
            if (d.getHours() >= 18 || (6 >= d.getHours())) {
                this.selectedTheme = 'dark-theme';
                this.setStatusBarColor('#060a1f');
            }
            else {
                this.selectedTheme = 'light-theme';
                this.setStatusBarColor('#3F51B5');
            }
        }
    };
    MyApp.prototype.showToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Press Again to exit',
            duration: 2000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    MyApp.prototype.openPage = function (page) {
        if (page.page == 'HomePage' || page.page == 'AdvancedSearchPage'
            || page.page == 'SettingsPage' || page.page == 'AboutPage'
            || page.page == 'SubtitleSearchPage' || page.page == 'AppSettingsPage') {
            this.nav.setRoot(page.page, page.params);
        }
        else if (page.page == 'ReportPage') {
            this.emailComposer.addAlias('gmail', 'com.google.android.gm');
            this.loadDeviceInfo();
            this.emailComposer.open(this.email);
        }
        else if (page.page == 'PrivacyPolicy') {
            window.open('https://sites.google.com/view/yifyhdmovies/home', '_system', "location=yes");
        }
        else if (page.page == 'SharePage') {
            this.shareApp();
        }
        else if (page.page == 'RateUs') {
            this.market.open('com.project.yifybrowserandsubs');
        }
    };
    MyApp.prototype.shareApp = function () {
        var _this = this;
        this.socialSharing.share(null, null, null, this.playstoreappurl).then(function (res) {
            console.log("shared");
            _this.localstorage.set('shared', 'Y');
        }).catch(function (e) {
            _this.localstorage.set('shared', 'N');
            _this.localstorage.set('tried', 1);
        });
    };
    MyApp.prototype.loadDeviceInfo = function () {
        var model = this.device.model;
        var platform = this.device.platform;
        var manufacturer = this.device.manufacturer;
        var version = this.device.version;
        var content = model + " " + platform + " " + manufacturer + " " + version;
        this.email.body = content;
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/app/app.html"*/'  <ion-menu [content]="content" [class]="selectedTheme">\n    <ion-content>\n      <div class = "bgbar">\n\n         \n            \n      </div>\n      <ion-list-header>\n        Browser for YIFY\n      </ion-list-header>\n\n      <ion-list no-lines>\n          <button ion-item menuClose *ngFor="let item of menuItems" (click)="openPage(item)">\n            \n              <i [class]="item.faclass" aria-hidden="true" style="color:#387ef5"></i>\n              <span style="padding-left: 25px;font-size: 16px;">{{ item.name }}</span> \n          \n          </button>         \n\n        </ion-list>\n\n      \n    </ion-content>\n  </ion-menu>\n  <ion-nav [root]="rootPage" [class]="selectedTheme" [rootParams]="rootParams" main #content></ion-nav>\n\n'/*ion-inline-end:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/app/app.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_9__providers_settings_settings__["a" /* SettingsProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_email_composer__["a" /* EmailComposer */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_app_availability__["a" /* AppAvailability */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_push__["a" /* Push */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_toast__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_market__["a" /* Market */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_network__["a" /* Network */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_email_composer__["a" /* EmailComposer */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_social_sharing__["a" /* SocialSharing */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_app_availability__["a" /* AppAvailability */], __WEBPACK_IMPORTED_MODULE_9__providers_settings_settings__["a" /* SettingsProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_push__["a" /* Push */],
        __WEBPACK_IMPORTED_MODULE_12__ionic_native_market__["a" /* Market */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_toast__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_network__["a" /* Network */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubtitleTabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__subtitles_list_subtitles_list__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__subscene_list_subscene_list__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SubtitleTabsPage = (function () {
    function SubtitleTabsPage(navCtrl, navParams, localstorage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.localstorage = localstorage;
        this.yifySubs = __WEBPACK_IMPORTED_MODULE_2__subtitles_list_subtitles_list__["a" /* SubtitlesListPage */];
        this.subsceneSubs = __WEBPACK_IMPORTED_MODULE_3__subscene_list_subscene_list__["a" /* SubsceneListPage */];
        this.subdata = navParams.get('imdb');
        this.imdb_code = this.subdata.imdbcode;
        this.suburl = this.subdata.suburl;
        this.localstorage.set("suburl", this.suburl);
    }
    return SubtitleTabsPage;
}());
SubtitleTabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-subtitle-tabs',template:/*ion-inline-start:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/subtitle-tabs/subtitle-tabs.html"*/'\n<ion-header>\n  <ion-navbar>\n    <ion-title>Subtitles</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content no-bounce>\n  <super-tabs>\n      <super-tab [root]="yifySubs" title="YIFY"></super-tab>\n      <super-tab [root]="subsceneSubs" title="SUBSCENE"></super-tab>\n    </super-tabs>  \n</ion-content>\n\n'/*ion-inline-end:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/subtitle-tabs/subtitle-tabs.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
], SubtitleTabsPage);

//# sourceMappingURL=subtitle-tabs.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(298);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic2_super_tabs__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser_animations__ = __webpack_require__(603);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_yify_movies_yify_movies__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_social_sharing__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_in_app_browser__ = __webpack_require__(606);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_home_popover__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_speech_recognition__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ng_lazyload_image__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ng_lazyload_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_ng_lazyload_image__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_settings_settings__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_subtitles_list_subtitles_list__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_subscene_list_subscene_list__ = __webpack_require__(139);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], __WEBPACK_IMPORTED_MODULE_13__pages_home_popover__["a" /* PopoverPage */], __WEBPACK_IMPORTED_MODULE_18__pages_subtitles_list_subtitles_list__["a" /* SubtitlesListPage */], __WEBPACK_IMPORTED_MODULE_19__pages_subscene_list_subscene_list__["a" /* SubsceneListPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5_ionic2_super_tabs__["a" /* SuperTabsModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["a" /* IonicStorageModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_15_ng_lazyload_image__["LazyLoadImageModule"], __WEBPACK_IMPORTED_MODULE_16__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], { pageTransition: 'md-transition' }, {
                links: [
                    { loadChildren: '../pages/home/home.module#Module', name: 'HomePage', segment: 'home/:type', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/subscene-list/subscene-list.module#SubsceneListPageModule', name: 'SubsceneListPage', segment: 'subscene-list', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/subtitle-tabs/subtitle-tabs.module#SubtitleTabsPageModule', name: 'SubtitleTabsPage', segment: 'subtitle-tabs', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/subtitles-list/subtitles-list.module#SubtitlesListPageModule', name: 'SubtitlesListPage', segment: 'subtitles-list', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/about/about.module#AboutPageModule', name: 'AboutPage', segment: 'about', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/advance-search-results/advance-search-results.module#AdvanceSearchResultsPageModule', name: 'AdvanceSearchResultsPage', segment: 'advance-search-results', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/advanced-search/advanced-search.module#AdvancedSearchPageModule', name: 'AdvancedSearchPage', segment: 'advanced-search', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/app-settings/app-settings.module#AppSettingsPageModule', name: 'AppSettingsPage', segment: 'app-settings', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/moviedetails/moviedetails.module#MoviedetailsPageModule', name: 'MoviedetailsPage', segment: 'moviedetails', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/page2/page2.module#Module', name: 'Page2Page', segment: 'page2', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/page1/page1.module#Module', name: 'Page1Page', segment: 'page1', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/page3/page3.module#Module', name: 'Page3Page', segment: 'page3', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/search/search.module#SearchPageModule', name: 'SearchPage', segment: 'search', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/sub-title-search-subs-scene/sub-title-search-subs-scene.module#SubTitleSearchSubsScenePageModule', name: 'SubTitleSearchSubsScenePage', segment: 'sub-title-search-subs-scene', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/subtitle-search/subtitle-search.module#SubtitleSearchPageModule', name: 'SubtitleSearchPage', segment: 'subtitle-search', priority: 'low', defaultHistory: [] }
                ]
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], __WEBPACK_IMPORTED_MODULE_13__pages_home_popover__["a" /* PopoverPage */], __WEBPACK_IMPORTED_MODULE_18__pages_subtitles_list_subtitles_list__["a" /* SubtitlesListPage */], __WEBPACK_IMPORTED_MODULE_19__pages_subscene_list_subscene_list__["a" /* SubsceneListPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_9__providers_yify_movies_yify_movies__["a" /* YifyMoviesProvider */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_14__ionic_native_speech_recognition__["a" /* SpeechRecognition */],
            __WEBPACK_IMPORTED_MODULE_17__providers_settings_settings__["a" /* SettingsProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YifyMoviesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var YifyMoviesProvider = (function () {
    /* https://api.themoviedb.org/3/find/tt5997666?api_key=fa286812af448bf2745c5c960c7b964e&language=en-US&external_source=imdb_id */
    function YifyMoviesProvider(http) {
        this.http = http;
        this.yifysites = ['https://yts.am/api/v2', 'https://yts.unblocked.lat/api/v2', 'https://yts.bypassed.org/api/v2', 'https://yts.pe/api/v2/',
            'https://yifymovie.co/api/v2', 'https://yifytorrent.to/api/v2/', 'https://yts.me/api/v2', 'https://yts.gs/api/v2'];
        this.sitecount = -1;
        this.yifysubUrl = 'https://www.yifysubtitles.com/movie-imdb/';
        this.storeurl = '/storeurl';
        this.queryjson = { "rating_list": [{ "elem": ".container .row .table-responsive .other-subs tbody .rating-cell ", "rating": "text" }], "lang_list": [{ "elem": ".container .row .table-responsive .other-subs tbody .flag-cell .sub-lang ", "lang": "text" }], "sub_links": [{ "elem": ".container .row .table-responsive .other-subs tbody  .download-cell a", "download_link": "href" }], "sub_names": [{ "elem": ".container .row .table-responsive .other-subs tbody td", "subname": "text" }] };
        this.subscene_queryjson = { "down_links": [{ "elem": ".a1 > a:first-of-type", "link": "href" }], "langs_names": [{ "elem": ".a1 > a:first-of-type span", "link": "href", "lang_name": "text" }] };
        this.subscene_download_json = { "downlink": [{ "elem": ".download > a:first-of-type", "link": "href" }] };
        this.Tmdburl = 'https://api.themoviedb.org/3/search/movie?include_adult=false&api_key=fa286812af448bf2745c5c960c7b964e';
        this.ServerIp = 'http://18.217.205.247:7070/';
    }
    YifyMoviesProvider.prototype.loadYifyMovies = function (limit, page, sitecount) {
        return this.http.get(this.yifysites[sitecount] + "/list_movies.jsonp?limit=" + limit + "&page=" + page)
            .map(function (res) { return res.json(); })
            .catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(new Error(error.status));
        });
    };
    YifyMoviesProvider.prototype.loadYifyTopRatedMovies = function (limit, page, sitecount) {
        return this.http.get(this.yifysites[sitecount] + "/list_movies.jsonp?sort_by=rating&limit=" + limit + "&page=" + page)
            .map(function (res) { return res.json(); })
            .catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(new Error(error.status));
        });
    };
    YifyMoviesProvider.prototype.setUrl = function (index) {
        this.Url = this.yifysites[index];
        console.log(this.Url);
    };
    YifyMoviesProvider.prototype.getUrl = function () {
        return this.Url;
    };
    YifyMoviesProvider.prototype.loadYifyMovieDetails = function (movie_id) {
        return this.http.get(this.Url + "/movie_details.json?movie_id=" + movie_id + "&with_images=true&with_cast=true")
            .map(function (res) { return res.json(); })
            .catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(new Error(error.status));
        });
    };
    YifyMoviesProvider.prototype.searchYifyMovies = function (query_term) {
        return this.http.get(this.Url + "/list_movies.jsonp?sort_by=rating&limit=30&query_term=" + query_term)
            .map(function (res) { return res.json(); })
            .catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(new Error(error.status));
        });
    };
    YifyMoviesProvider.prototype.advancedSearchYifyMovies = function (limit, page, criteria) {
        return this.http.get(this.Url + "/list_movies.jsonp?limit=" + limit + "&page=" + page + "&" + criteria)
            .map(function (res) { return res.json(); })
            .catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(new Error(error.status));
        });
    };
    YifyMoviesProvider.prototype.getYifySUbTitles = function (imdb_code) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        var body = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* URLSearchParams */]();
        body.set('url', "" + this.yifysubUrl + imdb_code);
        body.set('json_data', JSON.stringify(this.queryjson));
        return this.http.post("" + this.ServerIp, body, options).
            map(function (res) { return res.json(); })
            .catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(new Error(error.status));
        });
    };
    YifyMoviesProvider.prototype.getSubSceneSubTitles = function (suburl) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        var body = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* URLSearchParams */]();
        body.set('url', suburl);
        body.set('json_data', JSON.stringify(this.subscene_queryjson));
        return this.http.post("" + this.ServerIp, body, options).
            map(function (res) { return res.json(); })
            .catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(new Error(error.status));
        });
    };
    YifyMoviesProvider.prototype.downloadSubsceneSubs = function (suburl) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        var body = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* URLSearchParams */]();
        body.set('url', suburl);
        body.set('json_data', JSON.stringify(this.subscene_download_json));
        return this.http.post("" + this.ServerIp, body, options).
            map(function (res) { return res.json(); })
            .catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(new Error(error.status));
        });
    };
    YifyMoviesProvider.prototype.searchTMDbQueryData = function (query_term, page) {
        return this.http.get(this.Tmdburl + "&query=" + query_term + "&page=" + page)
            .map(function (res) { return res.json(); })
            .catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(new Error(error.status));
        });
    };
    return YifyMoviesProvider;
}());
YifyMoviesProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], YifyMoviesProvider);

//# sourceMappingURL=yify-movies.js.map

/***/ })

},[293]);
//# sourceMappingURL=main.js.map