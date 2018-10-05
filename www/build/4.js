webpackJsonp([4],{

/***/ 619:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchPageModule", function() { return SearchPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search__ = __webpack_require__(632);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SearchPageModule = (function () {
    function SearchPageModule() {
    }
    return SearchPageModule;
}());
SearchPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__search__["a" /* SearchPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__search__["a" /* SearchPage */]), __WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image__["LazyLoadImageModule"]
        ],
    })
], SearchPageModule);

//# sourceMappingURL=search.module.js.map

/***/ }),

/***/ 632:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_yify_movies_yify_movies__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_speech_recognition__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_lazyload_image__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_lazyload_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng_lazyload_image__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(286);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SearchPage = (function () {
    function SearchPage(navCtrl, navParams, yifyprovider, speechRecognition, toastCtrl, homepage, alertcontroller) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.yifyprovider = yifyprovider;
        this.speechRecognition = speechRecognition;
        this.toastCtrl = toastCtrl;
        this.homepage = homepage;
        this.alertcontroller = alertcontroller;
        this.movielist = [];
        this.asyncCall = false;
        this.shouldShowCancel = true;
        this.cancelButtonText = 'Cancel';
        this.animated = true;
        this.options = { language: "en-US", matches: 5, prompt: "Speak now !!!", showPopup: "true" };
        this.hasMicAccess = false;
        this.hasRecognitionAvailable = false;
        this.textinput = "";
        this.showText = false;
        this.defaultImage = 'https://i.imgur.com/DLkGimY.png';
        this.darkui = true;
        this.isRecognitionAvailable();
    }
    SearchPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            position: 'bottom',
            closeButtonText: 'Ok',
            showCloseButton: true,
            duration: 4000
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    SearchPage.prototype.startListening = function () {
        var _this = this;
        this.speechRecognition.startListening(this.options)
            .subscribe(function (matches) {
            console.log(matches);
            _this.textinput = matches[0];
            _this.getItems(_this.textinput);
        }, function (onerror) {
            console.log('error:', onerror);
        });
    };
    SearchPage.prototype.presentConfirm = function () {
        this.requestPermission();
    };
    SearchPage.prototype.retryVoiceMessage = function (msg) {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: msg,
            position: 'bottom',
            closeButtonText: 'Ok',
            showCloseButton: false,
            duration: 3000
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
            _this.startListening();
        });
        toast.present();
    };
    SearchPage.prototype.listenmic = function () {
        if (this.hasMicAccess) {
            this.startListening();
        }
        else {
            this.presentConfirm();
        }
    };
    SearchPage.prototype.getSupportedLanguages = function () {
        this.speechRecognition.getSupportedLanguages()
            .then(function (languages) { return console.log(languages); }, function (error) { return console.log(error); });
    };
    SearchPage.prototype.hasPermission = function () {
        var _this = this;
        this.speechRecognition.hasPermission()
            .then(function (hasPermission) {
            if (!hasPermission) {
                _this.hasMicAccess = false;
            }
            else {
                _this.hasMicAccess = true;
            }
        });
    };
    SearchPage.prototype.requestPermission = function () {
        var _this = this;
        this.speechRecognition.requestPermission()
            .then(function () {
            _this.hasMicAccess = true;
            _this.startListening();
        }, function () {
            _this.hasMicAccess = false;
        });
    };
    SearchPage.prototype.isRecognitionAvailable = function () {
        var _this = this;
        this.speechRecognition.isRecognitionAvailable()
            .then(function (available) {
            if (available) {
                _this.hasRecognitionAvailable = true;
                _this.hasPermission();
            }
            else {
                _this.hasRecognitionAvailable = false;
            }
        });
    };
    SearchPage.prototype.getItems = function (val) {
        var _this = this;
        this.showText = false;
        if (val && val.trim() != '') {
            this.asyncCall = true;
            this.yifyprovider.searchYifyMovies(val).subscribe(function (res) {
                _this.asyncCall = false;
                if (res.status == 'ok') {
                    _this.movielist = res.data.movies;
                    _this.searchbar.setFocus();
                }
                if (res.data.movie_count == 0)
                    _this.showText = true;
                else
                    _this.showText = false;
            });
        }
        else {
            this.movielist = [];
            this.showText = false;
        }
    };
    SearchPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchPage');
    };
    SearchPage.prototype.openMoviePage = function (movie) {
        this.navCtrl.push('MoviedetailsPage', { movie: movie });
    };
    SearchPage.prototype.shareApp = function () {
        this.homepage.shareApp();
    };
    SearchPage.prototype.openSettings = function () {
        this.navCtrl.push('AppSettingsPage');
    };
    return SearchPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('searchbar'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* Searchbar */])
], SearchPage.prototype, "searchbar", void 0);
SearchPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-search',template:/*ion-inline-start:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/search/search.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start *ngIf="hasRecognitionAvailable==true">\n      <button ion-button style="font-size: 20px;" (click)="listenmic()">\n            <ion-icon name="mic"></ion-icon>\n        </button>\n    </ion-buttons>\n\n    <ion-searchbar [(ngModel)]="textinput" (ionInput)="getItems($event.target.value)" \n    [animated]="animated" spellcheck="true"\n      #searchbar>\n\n\n    </ion-searchbar>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding #container [ngClass]="(darkui)?\'darkcolor\':\'litecolor\'">\n  <div>\n    <ion-spinner color="spinner" name="crescent" *ngIf="asyncCall == true" \n    style="top: 50%;left: 50%; margin-top: 5px;margin-left: -14px;">\n    </ion-spinner>\n  </div>\n\n  <ion-list>\n    <ion-item *ngFor="let movie of movielist" (click)="openMoviePage(movie)">\n      <ion-thumbnail item-start>\n\n        <div class="tileimage" [lazyLoad]="movie.medium_cover_image" \n        [scrollTarget]="container.getScrollElement()"\n         [defaultImage]="defaultImage"\n         [errorImage]="defaultImage" \n        [scrollObservable]="container.ionScroll"\n          style="background-repeat: no-repeat;\n           background-size: contain;\n           height: 107px;\n           width: 100%;">\n\n        </div>\n\n     \n\n      </ion-thumbnail>\n      <h2>{{movie.title_long}}</h2>\n      <p>Imdb : {{movie.rating}}</p>\n    </ion-item>\n  </ion-list>\n  <ion-item text-wrap *ngIf="showText">No movies found related to your search , Try again with complete words !!!</ion-item>\n <!--  <ion-fab bottom right>\n    \n            <button ion-fab (click) = "openSettings()" class="animated zoomIn">\n                <ion-icon ios="ios-settings" md="md-settings"></ion-icon>\n            </button>\n    \n        </ion-fab> -->\n</ion-content>'/*ion-inline-end:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/search/search.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_4_ng_lazyload_image__["LazyLoadImageDirective"], __WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]],
        styles: ["\n  .ng-lazyloaded {\n      animation: fadein .3s;\n  }\n  @keyframes fadein {\n      from { opacity: 0; }\n      to   { opacity: 1; }\n  }\n\n  \n"]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_yify_movies_yify_movies__["a" /* YifyMoviesProvider */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_speech_recognition__["a" /* SpeechRecognition */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], SearchPage);

//# sourceMappingURL=search.js.map

/***/ })

});
//# sourceMappingURL=4.js.map