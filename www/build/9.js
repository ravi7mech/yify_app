webpackJsonp([9],{

/***/ 612:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvanceSearchResultsPageModule", function() { return AdvanceSearchResultsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__advance_search_results__ = __webpack_require__(625);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AdvanceSearchResultsPageModule = (function () {
    function AdvanceSearchResultsPageModule() {
    }
    return AdvanceSearchResultsPageModule;
}());
AdvanceSearchResultsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__advance_search_results__["a" /* AdvanceSearchResultsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__advance_search_results__["a" /* AdvanceSearchResultsPage */]), __WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image__["LazyLoadImageModule"]
        ],
    })
], AdvanceSearchResultsPageModule);

//# sourceMappingURL=advance-search-results.module.js.map

/***/ }),

/***/ 625:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdvanceSearchResultsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_yify_movies_yify_movies__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(286);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AdvanceSearchResultsPage = (function () {
    function AdvanceSearchResultsPage(navCtrl, navParams, yifyprovider, toastCtrl, homepage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.yifyprovider = yifyprovider;
        this.toastCtrl = toastCtrl;
        this.homepage = homepage;
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
        this.darkui = true;
        this.querystring = navParams.get('qstring');
        this.loadMovies(this.movielimit, this.moviepage, null, this.querystring);
    }
    AdvanceSearchResultsPage.prototype.loadMovies = function (limit, page, infiniteScroll, querystring) {
        var _this = this;
        try {
            if (!this.asyncCall) {
                if (this.movielist.length == 0)
                    this.asyncCall = true;
                this.yifyprovider.advancedSearchYifyMovies(limit, page, querystring).subscribe(function (res) {
                    console.log(res);
                    if (res.status == 'ok') {
                        if (res.data.movies != undefined && res.data.movies != null) {
                            if (_this.movielist.length == 0) {
                                _this.movielist = res.data.movies;
                                _this.asyncCall = false;
                                if (infiniteScroll != null)
                                    infiniteScroll.complete();
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
                        else {
                            _this.asyncCall = false;
                            if (infiniteScroll != null) {
                                infiniteScroll.complete();
                            }
                            if (_this.movielist.length > 0)
                                _this.presentToast('No more movies found !!');
                            else
                                _this.presentToast('No movies found releated to your queries.');
                        }
                    }
                }, function (error) {
                    console.log(error);
                    throw error;
                });
            }
        }
        catch (error) {
            this.asyncCall = false;
            console.log(error);
            if (infiniteScroll != null)
                infiniteScroll.complete();
        }
    };
    AdvanceSearchResultsPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            position: 'bottom',
            closeButtonText: 'Ok',
            showCloseButton: false,
            duration: 3000
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    AdvanceSearchResultsPage.prototype.doInfinite = function (infiniteScroll) {
        console.log('Begin async operation');
        if (!this.asyncCall) {
            this.moviepage = this.moviepage + 1;
            this.loadMovies(this.movielimit, this.moviepage, infiniteScroll, this.querystring);
        }
        else {
            infiniteScroll.complete();
        }
    };
    AdvanceSearchResultsPage.prototype.openMoviePage = function (movie) {
        this.navCtrl.push('MoviedetailsPage', { movie: movie });
    };
    AdvanceSearchResultsPage.prototype.doRefresh = function (refresher) {
        this.moviepage = 1;
        this.movielist = [];
        refresher.complete();
        this.loadMovies(this.movielimit, this.moviepage, null, this.querystring);
    };
    AdvanceSearchResultsPage.prototype.scrollToTop = function () {
        this.isScrolled = false;
        this.content.scrollToTop(1000);
    };
    AdvanceSearchResultsPage.prototype.shareApp = function () {
        this.homepage.shareApp();
    };
    AdvanceSearchResultsPage.prototype.openSettings = function () {
        this.navCtrl.push('AppSettingsPage');
    };
    return AdvanceSearchResultsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
], AdvanceSearchResultsPage.prototype, "content", void 0);
AdvanceSearchResultsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-advance-search-results',template:/*ion-inline-start:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/advance-search-results/advance-search-results.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Advanced Search Results</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding #container>\n  <ion-refresher (ionRefresh)="doRefresh($event)" pullMax="250">\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Release to refresh" refreshingSpinner="circles" refreshingText="Refreshing...">\n    </ion-refresher-content>\n  </ion-refresher>\n\n  <div>\n    <ion-spinner color="spinner" name="crescent" *ngIf="asyncCall == true" style="top: 50%;left: 50%; margin-top: 5px;margin-left: -14px;">\n    </ion-spinner>\n  </div>\n\n  <ion-list class="animate-ripple">\n\n    <ion-grid>\n      <ion-row justify-content-center>\n        <ion-col col-4 *ngFor="let movie of movielist" (click)="openMoviePage(movie)">\n\n          <div class="tileimage col" [lazyLoad]="movie.medium_cover_image" [offset]="offset" [defaultImage]="defaultImage" [errorImage]="defaultImage"\n            [scrollTarget]="container.getScrollElement()" [scrollObservable]="container.ionScroll">\n\n          </div>\n          <br>\n          <span style="padding-left: 5px;float: left;">{{movie.title_long}}</span>\n          <br>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n\n\n\n\n  </ion-list>\n  <ion-fab bottom right>\n\n    <button ion-fab (click)="openSettings()" class="animated zoomIn">\n      <ion-icon ios="ios-settings" md="md-settings"></ion-icon>\n    </button>\n\n  </ion-fab>\n\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)" threshold="30%">\n    <ion-infinite-scroll-content loadingSpinner="crescent" color="spinner">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n\n</ion-content>\n'/*ion-inline-end:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/advance-search-results/advance-search-results.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image__["LazyLoadImageDirective"], __WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]],
        styles: ["\n  .ng-lazyloaded {\n      animation: fadein .3s;\n  }\n  @keyframes fadein {\n      from { opacity: 0; }\n      to   { opacity: 1; }\n  }\n\n\n"]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_yify_movies_yify_movies__["a" /* YifyMoviesProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]])
], AdvanceSearchResultsPage);

//# sourceMappingURL=advance-search-results.js.map

/***/ })

});
//# sourceMappingURL=9.js.map