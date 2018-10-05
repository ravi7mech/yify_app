webpackJsonp([0],{

/***/ 617:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Module", function() { return Module; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page1__ = __webpack_require__(630);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var Module = (function () {
    function Module() {
    }
    return Module;
}());
Module = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__page1__["a" /* Page1Page */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__page1__["a" /* Page1Page */]), __WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image__["LazyLoadImageModule"]
        ]
    })
], Module);

//# sourceMappingURL=page1.module.js.map

/***/ }),

/***/ 623:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Page2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_yify_movies_yify_movies__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_toast__ = __webpack_require__(289);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Page2Page = (function () {
    function Page2Page(navCtrl, navParams, yifyprovider, homepage, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.yifyprovider = yifyprovider;
        this.homepage = homepage;
        this.toast = toast;
        this.movielimit = 50;
        this.moviepage = 1;
        this.movielist = [];
        this.badge = 0;
        this.color = 'primary';
        this.mode = 'determinate';
        this.value = 50;
        this.asyncCall = false;
        this.defaultImage = 'https://i.imgur.com/DLkGimY.png';
        this.errorImage = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
        this.isScrolled = false;
        this.offset = 800;
        this.darkui = true;
        this.sitecount = -1;
        this.rootNavCtrl = navParams.get('rootNavCtrl');
        this.sitecount++;
        this.loadMovies(this.movielimit, this.moviepage, null);
    }
    Page2Page.prototype.loadMovies = function (limit, page, infiniteScroll) {
        var _this = this;
        try {
            if (!this.asyncCall) {
                if (this.movielist.length == 0)
                    this.asyncCall = true;
                this.yifyprovider.loadYifyTopRatedMovies(limit, page, this.sitecount).subscribe(function (res) {
                    console.log(res);
                    if (res.status == 'ok') {
                        if (_this.movielist.length == 0) {
                            _this.yifyprovider.setUrl(_this.sitecount);
                            _this.movielist = res.data.movies;
                            _this.asyncCall = false;
                            if (infiniteScroll != null)
                                infiniteScroll.complete();
                            _this.moviepage = _this.moviepage + 1;
                            _this.loadMovies(_this.movielimit, _this.moviepage, null);
                        }
                        else {
                            var list = res.data.movies;
                            for (var i = 0; i < list.length; i++) {
                                _this.movielist.push(list[i]);
                            }
                            _this.asyncCall = false;
                            if (infiniteScroll != null) {
                                infiniteScroll.complete();
                            }
                        }
                    }
                }, function (error) {
                    _this.asyncCall = false;
                    if (_this.sitecount < _this.yifyprovider.yifysites.length) {
                        _this.sitecount++;
                        _this.loadMovies(_this.movielimit, _this.moviepage, null);
                    }
                    else {
                        _this.toast.show("Server issue please try again later!", '5000', 'bottom').subscribe(function (toast) {
                            console.log(toast);
                        });
                    }
                    throw error;
                });
            }
        }
        catch (error) {
            if (infiniteScroll != null)
                infiniteScroll.complete();
        }
    };
    Page2Page.prototype.doInfinite = function (infiniteScroll) {
        console.log('Begin async operation');
        if (!this.asyncCall) {
            this.moviepage = this.moviepage + 1;
            this.loadMovies(this.movielimit, this.moviepage, infiniteScroll);
        }
        else {
            infiniteScroll.complete();
        }
    };
    Page2Page.prototype.openMoviePage = function (movie) {
        this.viewmovie = movie;
        this.rootNavCtrl.push('MoviedetailsPage', { movie: movie });
    };
    Page2Page.prototype.doRefresh = function (refresher) {
        this.moviepage = 1;
        this.movielist = [];
        refresher.complete();
        this.loadMovies(this.movielimit, this.moviepage, null);
    };
    Page2Page.prototype.scrollToTop = function () {
        this.isScrolled = false;
        this.content.scrollToTop(1000);
    };
    Page2Page.prototype.shareApp = function () {
        this.homepage.shareApp();
    };
    Page2Page.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.content.ionScroll.subscribe(function (data) {
            if (data != null && data != undefined && data.scrollTop == 0) {
                _this.isScrolled = false;
            }
            else {
                if (data == null || data == undefined)
                    _this.isScrolled = false;
                else
                    _this.isScrolled = true;
            }
        });
    };
    Page2Page.prototype.openSettings = function () {
        this.rootNavCtrl.push('AppSettingsPage');
    };
    return Page2Page;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
], Page2Page.prototype, "content", void 0);
Page2Page = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-page2',template:/*ion-inline-start:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/page2/page2.html"*/'<ion-content padding #container [ngClass]="(darkui)?\'darkcolor\':\'litecolor\'" >\n\n        <ion-refresher (ionRefresh)="doRefresh($event)" pullMax="250">\n                <ion-refresher-content\n                pullingIcon="arrow-dropdown"\n                pullingText="Release to refresh"\n                refreshingSpinner="circles"\n                refreshingText="Refreshing...">\n              </ion-refresher-content>\n        </ion-refresher>\n            \n    <div>\n        <ion-spinner name="crescent" *ngIf="asyncCall == true" \n        style="top: 50%;left: 50%; margin-top: 5px;margin-left: -14px;" color="spinner">\n        </ion-spinner>\n    </div>\n\n    <ion-list class="animate-ripple">\n\n        <ion-grid>\n            <ion-row justify-content-center>\n                <ion-col col-4 *ngFor="let movie of movielist" (click)="openMoviePage(movie)">\n                    \n                    <div class="tileimage col" \n                    [lazyLoad]="movie.medium_cover_image" \n                    [offset]="offset" [defaultImage]="defaultImage" [errorImage]="defaultImage"\n                    [scrollTarget]="container.getScrollElement()"\n                        [scrollObservable]="container.ionScroll">\n\n                    </div>\n\n                    \n                    <br>\n                    <span style="padding-left: 5px;float: left;">{{movie.title_long}}</span><br>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n\n\n\n\n    </ion-list>\n    \n    <ion-fab bottom right>\n\n        <button ion-fab (click)="openSettings()" class="animated zoomIn">\n          <ion-icon ios="ios-settings" md="md-settings"></ion-icon>\n        </button>\n    \n      </ion-fab>\n\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)" threshold="60%">\n        <ion-infinite-scroll-content loadingSpinner="crescent" color="spinner">\n        </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n\n</ion-content>'/*ion-inline-end:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/page2/page2.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image__["LazyLoadImageDirective"], __WEBPACK_IMPORTED_MODULE_5__ionic_native_toast__["a" /* Toast */]],
        styles: ["\n  .ng-lazyloaded {\n      animation: fadein .5s;\n  }\n  @keyframes fadein {\n      from { opacity: 0; }\n      to   { opacity: 1; }\n  }\n  \n"]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_yify_movies_yify_movies__["a" /* YifyMoviesProvider */], __WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_toast__["a" /* Toast */]])
], Page2Page);

//# sourceMappingURL=page2.js.map

/***/ }),

/***/ 630:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Page1Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_yify_movies_yify_movies__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_lazyload_image__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_lazyload_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng_lazyload_image__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_availability__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_page2_page2__ = __webpack_require__(623);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_app_component__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_settings_settings__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_toast__ = __webpack_require__(289);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var Page1Page = (function () {
    function Page1Page(navCtrl, navParams, yifyprovider, localstorage, homepage, platform, appAvailability, alertCtrl, toastCtrl, page2page, myapp, settings, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.yifyprovider = yifyprovider;
        this.localstorage = localstorage;
        this.homepage = homepage;
        this.platform = platform;
        this.appAvailability = appAvailability;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.page2page = page2page;
        this.myapp = myapp;
        this.settings = settings;
        this.toast = toast;
        this.yifyappsub = 'Browser for YIFY';
        this.yifyappmes = 'Download YIFY Torrent Browser (YTS) App from playstore to download high quality 720p,1080p,3D movies !!';
        this.yifyiconurl = 'https://i.imgur.com/MvPgeiT.png';
        this.movielimit = 50;
        this.moviepage = 1;
        this.movielist = [];
        this.badge = 0;
        this.color = 'primary';
        this.mode = 'determinate';
        this.value = 50;
        this.asyncCall = false;
        this.defaultImage = 'https://i.imgur.com/DLkGimY.png';
        this.errorImage = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
        this.youtube_android = 'com.google.android.youtube';
        this.youtube_ios = 'youtube://';
        this.isScrolled = false;
        this.offset = 100;
        this.sitecount = -1;
        this.position = 'bottom';
        this.icon = 'more';
        this.enableBackdropDismiss = true;
        this.buttonColor = 'dark';
        this.rootNavCtrl = navParams.get('rootNavCtrl');
        this.sitecount++;
        this.loadMovies(this.movielimit, this.moviepage, null);
        this.checkApps();
        this.isUpdateAvailable();
        platform.ready().then(function () {
        });
    }
    Page1Page.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 1000
        });
        toast.present();
    };
    Page1Page.prototype.isUpdateAvailable = function () {
    };
    Page1Page.prototype.setTheme = function (theme) {
        this.selectedTheme = theme;
    };
    Page1Page.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.content.ionScroll.subscribe(function (data) {
            if (data != null && data != undefined && data.scrollTop == 0) {
                _this.isScrolled = false;
            }
            else {
                if (data == null || data == undefined)
                    _this.isScrolled = false;
                else
                    _this.isScrolled = true;
            }
        });
    };
    Page1Page.prototype.checkApps = function () {
        var _this = this;
        var app;
        if (this.platform.is('ios')) {
            app = this.youtube_ios;
        }
        else if (this.platform.is('android')) {
            app = this.youtube_android;
        }
        this.appAvailability.check(app)
            .then(function (yes) { return _this.localstorage.set('hasytapp', true); }, function (no) { return _this.localstorage.set('hasytapp', false); });
    };
    Page1Page.prototype.loadMovies = function (limit, page, infiniteScroll) {
        var _this = this;
        try {
            if (!this.asyncCall) {
                if (this.movielist.length == 0)
                    this.asyncCall = true;
                this.yifyprovider.loadYifyMovies(limit, page, this.sitecount).subscribe(function (res) {
                    console.log(res);
                    if (res.status == 'ok') {
                        if (_this.movielist.length == 0) {
                            _this.yifyprovider.setUrl(_this.sitecount);
                            _this.showBadgeCount(res.data.movie_count);
                            _this.movielist = res.data.movies;
                            _this.asyncCall = false;
                            if (infiniteScroll != null)
                                infiniteScroll.complete();
                            _this.moviepage = _this.moviepage + 1;
                            _this.loadMovies(_this.movielimit, _this.moviepage, null);
                        }
                        else {
                            var list = res.data.movies;
                            for (var i = 0; i < list.length; i++) {
                                _this.movielist.push(list[i]);
                            }
                            _this.asyncCall = false;
                            if (infiniteScroll != null) {
                                infiniteScroll.complete();
                            }
                        }
                    }
                }, function (error) {
                    _this.asyncCall = false;
                    if (_this.sitecount < _this.yifyprovider.yifysites.length) {
                        _this.sitecount++;
                        _this.loadMovies(_this.movielimit, _this.moviepage, null);
                    }
                    else {
                        _this.toast.show("Server issue please try again later!", '10000', 'bottom').subscribe(function (toast) {
                            console.log(toast);
                        });
                    }
                    throw error;
                });
            }
        }
        catch (error) {
            if (infiniteScroll != null)
                infiniteScroll.complete();
        }
    };
    Page1Page.prototype.doInfinite = function (infiniteScroll) {
        console.log('Begin async operation');
        if (!this.asyncCall) {
            this.moviepage = this.moviepage + 1;
            this.loadMovies(this.movielimit, this.moviepage, infiniteScroll);
        }
        else {
            infiniteScroll.complete();
        }
    };
    Page1Page.prototype.openMoviePage = function (movie) {
        this.rootNavCtrl.push('MoviedetailsPage', { movie: movie });
    };
    Page1Page.prototype.showBadgeCount = function (badgecount) {
        var _this = this;
        this.localstorage.get('badgecount').then(function (value) {
            if (value == undefined || value == null) {
                _this.localstorage.set('badgecount', badgecount);
                _this.homepage.setBadgeCount('');
            }
            else {
                var badge = (badgecount - value > 0) ? badgecount - value : '';
                _this.localstorage.set('badgecount', badgecount);
                _this.homepage.setBadgeCount(badge);
            }
        });
    };
    Page1Page.prototype.doRefresh = function (refresher) {
        this.moviepage = 1;
        this.movielist = [];
        refresher.complete();
        this.loadMovies(this.movielimit, this.moviepage, null);
    };
    Page1Page.prototype.openSettings = function () {
        this.rootNavCtrl.push('AppSettingsPage');
    };
    Page1Page.prototype.scrollToTop = function () {
        this.isScrolled = false;
        this.content.scrollToTop(1000);
    };
    Page1Page.prototype.shareApp = function () {
        if (this.myapp.selectedTheme === 'dark-theme') {
            this.myapp.selectedTheme = 'light-theme';
        }
        else {
            this.myapp.selectedTheme = 'dark-theme';
        }
    };
    return Page1Page;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
], Page1Page.prototype, "content", void 0);
Page1Page = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-page1',template:/*ion-inline-start:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/page1/page1.html"*/'<ion-content padding #container [ngClass]="(darkui)?\'darkcolor\':\'litecolor\'">\n  <ion-refresher (ionRefresh)="doRefresh($event)" pullMax="250">\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Release to refresh" refreshingSpinner="circles" refreshingText="Refreshing...">\n    </ion-refresher-content>\n  </ion-refresher>\n  <div>\n    <ion-spinner color="spinner" name="crescent" *ngIf="asyncCall == true" style="top: 50%;left: 50%; margin-top: 5px;margin-left: -14px;">\n    </ion-spinner>\n  </div>\n\n  <ion-list class="animate-ripple">\n\n    <ion-grid>\n      <ion-row justify-content-center>\n        <ion-col tappable col-4 *ngFor="let movie of movielist" (click)="openMoviePage(movie)">\n\n          <div class="tileimage col" [lazyLoad]="movie.medium_cover_image" [offset]="offset" [defaultImage]="defaultImage" [errorImage]="defaultImage"\n            [scrollTarget]="container.getScrollElement()" [scrollObservable]="container.ionScroll">\n\n          </div>\n          <br>\n          <span style="padding-left: 5px;float: left;">{{movie.title_long}}</span>\n          <br>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n  </ion-list>\n\n  <ion-fab bottom right>\n\n    <button ion-fab (click)="openSettings()" class="animated zoomIn">\n      <ion-icon ios="ios-settings" md="md-settings"></ion-icon>\n    </button>\n\n  </ion-fab>\n  \n\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)" threshold="30%">\n    <ion-infinite-scroll-content loadingSpinner="crescent" color="spinner">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n\n\n</ion-content>\n'/*ion-inline-end:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/page1/page1.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_9__providers_settings_settings__["a" /* SettingsProvider */], __WEBPACK_IMPORTED_MODULE_5_ng_lazyload_image__["LazyLoadImageDirective"], __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_availability__["a" /* AppAvailability */], __WEBPACK_IMPORTED_MODULE_7__pages_page2_page2__["a" /* Page2Page */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_toast__["a" /* Toast */]],
        styles: ["\n  .ng-lazyloaded {\n      animation: fadein .3s;\n  }\n  @keyframes fadein {\n      from { opacity: 0; }\n      to   { opacity: 1; }\n  }\n\n\n"]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__providers_yify_movies_yify_movies__["a" /* YifyMoviesProvider */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_availability__["a" /* AppAvailability */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7__pages_page2_page2__["a" /* Page2Page */],
        __WEBPACK_IMPORTED_MODULE_8__app_app_component__["a" /* MyApp */], __WEBPACK_IMPORTED_MODULE_9__providers_settings_settings__["a" /* SettingsProvider */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_toast__["a" /* Toast */]])
], Page1Page);

//# sourceMappingURL=page1.js.map

/***/ })

});
//# sourceMappingURL=0.js.map