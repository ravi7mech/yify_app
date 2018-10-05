webpackJsonp([5],{

/***/ 618:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Module", function() { return Module; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page3__ = __webpack_require__(631);
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
            __WEBPACK_IMPORTED_MODULE_2__page3__["a" /* Page3Page */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__page3__["a" /* Page3Page */]), __WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image__["LazyLoadImageModule"]
        ]
    })
], Module);

//# sourceMappingURL=page3.module.js.map

/***/ }),

/***/ 631:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Page3Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_lazyload_image__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_lazyload_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng_lazyload_image__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Page3Page = (function () {
    function Page3Page(navCtrl, navParams, homepage, localstorage, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.homepage = homepage;
        this.localstorage = localstorage;
        this.toastCtrl = toastCtrl;
        this.movielist = [];
        this.badge = 0;
        this.color = 'primary';
        this.mode = 'determinate';
        this.value = 50;
        this.asyncCall = false;
        this.showText = false;
        this.defaultImage = 'https://i.imgur.com/DLkGimY.png';
        this.errorImage = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
        this.isScrolled = false;
        this.offset = 1000;
        this.darkui = true;
        this.rootNavCtrl = navParams.get('rootNavCtrl');
        this.loadMovies();
    }
    Page3Page.prototype.loadMovies = function () {
        var _this = this;
        try {
            if (!this.asyncCall) {
                this.asyncCall = true;
                this.localstorage.get('bookmarklist').then(function (value) {
                    if (value == undefined || value == null || value.length == 0) {
                        _this.asyncCall = false;
                        _this.showText = true;
                    }
                    else {
                        var bmklist = value;
                        _this.movielist = bmklist.reverse();
                        _this.asyncCall = false;
                        _this.showText = false;
                        _this.homepage.setBookMarkCount(_this.movielist.length);
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    Page3Page.prototype.shareApp = function () {
        this.homepage.shareApp();
    };
    Page3Page.prototype.scrollToTop = function () {
        this.isScrolled = false;
        this.content.scrollToTop(1000);
    };
    Page3Page.prototype.doRefresh = function (refresher) {
        this.movielist = [];
        refresher.complete();
        this.loadMovies();
    };
    Page3Page.prototype.openMoviePage = function (movie) {
        this.rootNavCtrl.push('MoviedetailsPage', { movie: movie });
    };
    Page3Page.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            position: 'bottom',
            closeButtonText: 'Ok',
            showCloseButton: true
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    Page3Page.prototype.ionViewWillEnter = function () {
        this.loadMovies();
    };
    Page3Page.prototype.ngAfterViewInit = function () {
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
    Page3Page.prototype.openSettings = function () {
        this.rootNavCtrl.push('AppSettingsPage');
    };
    return Page3Page;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
], Page3Page.prototype, "content", void 0);
Page3Page = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-page3',template:/*ion-inline-start:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/page3/page3.html"*/'<ion-content padding #container [ngClass]="(darkui)?\'darkcolor\':\'litecolor\'" >\n\n        <ion-refresher (ionRefresh)="doRefresh($event)" pullMax="250">\n                <ion-refresher-content\n                pullingIcon="arrow-dropdown"\n                pullingText="Release to refresh"\n                refreshingSpinner="circles"\n                refreshingText="Refreshing...">\n              </ion-refresher-content>\n        </ion-refresher>\n            \n            \n    <div>\n        <ion-spinner name="crescent" *ngIf="asyncCall == true"\n         style="top: 50%;left: 50%; margin-top: 5px;margin-left: -14px;" color="spinner">\n        </ion-spinner>\n    </div>\n\n    <ion-list class="animate-ripple">\n\n        <ion-grid>\n            <ion-row justify-content-center>\n                <ion-col col-4 *ngFor="let movie of movielist" (click)="openMoviePage(movie)">\n                    <div class="tileimage col" \n                    [lazyLoad]="movie.medium_cover_image" \n                    [offset]="offset" [defaultImage]="defaultImage" [errorImage]="defaultImage"\n                    [scrollTarget]="container.getScrollElement()"\n                        [scrollObservable]="container.ionScroll">\n\n                    </div>\n\n                         <br>\n                         <span style="padding-left: 5px;float: left;">{{movie.title_long}}</span><br>\n\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n\n\n\n\n\n    </ion-list>\n\n    <ion-item text-wrap *ngIf="showText">Bookmark some movies in order to view in this page !!!</ion-item>\n    \n    <ion-fab bottom right>\n\n        <button ion-fab (click)="openSettings()" class="animated zoomIn">\n          <ion-icon ios="ios-settings" md="md-settings"></ion-icon>\n        </button>\n    \n      </ion-fab>\n\n\n</ion-content>'/*ion-inline-end:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/page3/page3.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_4_ng_lazyload_image__["LazyLoadImageDirective"]],
        styles: ["\n  .ng-lazyloaded {\n      animation: fadein .3s;\n  }\n  @keyframes fadein {\n      from { opacity: 0; }\n      to   { opacity: 1; }\n  }\n  \n"]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ToastController */]])
], Page3Page);

//# sourceMappingURL=page3.js.map

/***/ })

});
//# sourceMappingURL=5.js.map