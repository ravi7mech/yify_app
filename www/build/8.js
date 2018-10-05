webpackJsonp([8],{

/***/ 613:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvancedSearchPageModule", function() { return AdvancedSearchPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__advanced_search__ = __webpack_require__(626);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AdvancedSearchPageModule = (function () {
    function AdvancedSearchPageModule() {
    }
    return AdvancedSearchPageModule;
}());
AdvancedSearchPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__advanced_search__["a" /* AdvancedSearchPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__advanced_search__["a" /* AdvancedSearchPage */])
        ],
    })
], AdvancedSearchPageModule);

//# sourceMappingURL=advanced-search.module.js.map

/***/ }),

/***/ 626:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdvancedSearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_speech_recognition__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(286);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AdvancedSearchPage = (function () {
    function AdvancedSearchPage(navCtrl, speechRecognition, navParams, homepage, alertcontroller) {
        this.navCtrl = navCtrl;
        this.speechRecognition = speechRecognition;
        this.navParams = navParams;
        this.homepage = homepage;
        this.alertcontroller = alertcontroller;
        this.shouldShowCancel = true;
        this.cancelButtonText = 'Cancel';
        this.animated = true;
        this.options = { language: "en-US", matches: 5, prompt: "Speak now !!!", showPopup: "true" };
        this.hasMicAccess = false;
        this.hasRecognitionAvailable = false;
        this.darkui = true;
        this.isRecognitionAvailable();
    }
    AdvancedSearchPage.prototype.advancedSearch = function () {
        var qstring = this.getQueryStringForAdvancedSearch();
        this.navCtrl.push('AdvanceSearchResultsPage', { qstring: qstring });
    };
    AdvancedSearchPage.prototype.isRecognitionAvailable = function () {
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
    AdvancedSearchPage.prototype.hasPermission = function () {
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
    AdvancedSearchPage.prototype.requestPermission = function () {
        var _this = this;
        this.speechRecognition.requestPermission()
            .then(function () {
            _this.hasMicAccess = true;
            _this.startListening();
        }, function () {
            _this.hasMicAccess = false;
        });
    };
    AdvancedSearchPage.prototype.getQueryStringForAdvancedSearch = function () {
        var qstring = '';
        if (this.genre != undefined && this.genre != null && this.genre != '') {
            qstring = qstring.concat('genre=' + this.genre);
            qstring = qstring.concat('&');
        }
        if (this.quality != undefined && this.quality != null && this.quality != '') {
            qstring = qstring.concat('quality=' + this.quality);
            qstring = qstring.concat('&');
        }
        if (this.minimum_rating != undefined && this.minimum_rating != null && this.minimum_rating != '') {
            qstring = qstring.concat('minimum_rating=' + this.minimum_rating);
            qstring.concat('&');
        }
        if (this.sort_by != undefined && this.sort_by != null && this.sort_by != '') {
            qstring = qstring.concat('sort_by=' + this.sort_by);
            qstring = qstring.concat('&');
        }
        if (this.order_by != undefined && this.order_by != null && this.order_by != '') {
            qstring = qstring.concat('order_by=' + this.order_by);
            qstring = qstring.concat('&');
        }
        if (this.moviename != undefined && this.moviename != null && this.moviename != '') {
            qstring = qstring.concat('query_term=' + this.moviename);
            qstring = qstring.concat('&');
        }
        if (qstring != '' && qstring.charAt(qstring.length - 1) == '&') {
            qstring = qstring.substr(0, qstring.length - 1);
        }
        return qstring;
    };
    AdvancedSearchPage.prototype.getItems = function (val) {
        console.log(this.moviename);
        if (val && val.trim() != '') {
        }
        else {
        }
    };
    AdvancedSearchPage.prototype.listenmic = function () {
        if (this.hasMicAccess) {
            this.startListening();
        }
        else {
            this.presentConfirm();
        }
    };
    AdvancedSearchPage.prototype.presentConfirm = function () {
        this.requestPermission();
    };
    AdvancedSearchPage.prototype.startListening = function () {
        var _this = this;
        this.speechRecognition.startListening(this.options)
            .subscribe(function (matches) {
            console.log(matches);
            _this.moviename = matches[0];
        }, function (onerror) {
            console.log('error:', onerror);
        });
    };
    AdvancedSearchPage.prototype.shareApp = function () {
        this.homepage.shareApp();
    };
    AdvancedSearchPage.prototype.openSettings = function () {
        this.navCtrl.push('AppSettingsPage');
    };
    return AdvancedSearchPage;
}());
AdvancedSearchPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-advanced-search',template:/*ion-inline-start:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/advanced-search/advanced-search.html"*/'<ion-header>\n\n   <ion-navbar>\n      <button ion-button menuToggle style="font-size: 2.4rem;">\n          <ion-icon name="menu"></ion-icon>\n      </button>\n    <ion-title>Browser for YIFY</ion-title>\n    <ion-buttons end *ngIf="hasRecognitionAvailable==true">\n         <button ion-button style="font-size: 20px;" (click)="listenmic()">\n              <ion-icon name="mic"></ion-icon>\n          </button>\n      </ion-buttons>\n\n  </ion-navbar>\n\n  <ion-toolbar color="bgback">\n    <ion-buttons start>\n            <button ion-button style="font-size: 20px;"  (click) = "advancedSearch()">\n                    <ion-icon name="arrow-forward"></ion-icon>\n            </button>\n      \n      </ion-buttons>\n    <ion-searchbar [(ngModel)]="moviename" (ionInput)="getItems($event.target.value)" \n    [animated]="animated" spellcheck="true"  [debounce]="250"\n    #searchbar>\n\n\n  </ion-searchbar>\n  </ion-toolbar>\n   \n\n</ion-header>\n\n\n<ion-content padding [ngClass]="(darkui)?\'darkcolor\':\'litecolor\'">\n\n    \n     \n     <ion-toolbar color="bgback">\n          <ion-item>\n		<ion-label>Genre</ion-label>\n		<ion-select interface="popover" [(ngModel)]="genre">\n            <ion-option value="Action">Action</ion-option>\n            <ion-option value="Adventure">Adventure</ion-option>\n            <ion-option value="Animation">Animation</ion-option>\n            <ion-option value="Biography">Biography</ion-option>\n            <ion-option value="Comedy">Comedy</ion-option>\n            <ion-option value="Crime">Crime</ion-option>\n            <ion-option value="Documentary">Documentary</ion-option>\n            <ion-option value="Drama">Drama</ion-option>\n            <ion-option value="Family">Family</ion-option>\n            <ion-option value="Fantasy">Fantasy</ion-option>\n            <ion-option value="Film-Noir">Film-Noir</ion-option>\n            <ion-option value="History">History</ion-option>\n            <ion-option value="Horror">Horror</ion-option>\n            <ion-option value="Music">Music</ion-option>\n            <ion-option value="Musical">Musical</ion-option>\n            <ion-option value="Mystery">Mystery</ion-option>\n            <ion-option value="Romance">Romance</ion-option>\n            <ion-option value="Sci-Fi">Sci-Fi</ion-option>\n            <ion-option value="Sport">Sport</ion-option>\n            <ion-option value="Thriller">Thriller</ion-option>\n            <ion-option value="War">War</ion-option>\n            <ion-option value="Western">Western</ion-option>\n		</ion-select>\n	</ion-item>\n      </ion-toolbar>\n\n      <ion-toolbar color="bgback">\n        <ion-item>\n      <ion-label>Quality</ion-label>\n      <ion-select interface="popover" [(ngModel)]="quality">\n          <ion-option value="720p">720p</ion-option>\n          <ion-option value="1080p">1080p</ion-option>\n          <ion-option value="3D">3D</ion-option>\n      </ion-select>\n  </ion-item>\n    </ion-toolbar>\n    <ion-toolbar color="bgback">\n        <ion-item>\n      <ion-label>IMDB Rating</ion-label>\n      <ion-select interface="popover" [(ngModel)]="minimum_rating">\n          <ion-option value="0">0 +</ion-option>\n          <ion-option value="1">1 +</ion-option>\n          <ion-option value="2">2 +</ion-option>\n          <ion-option value="3">3 +</ion-option>\n          <ion-option value="4">4 +</ion-option>\n          <ion-option value="5">5 +</ion-option>\n          <ion-option value="6">6 +</ion-option>\n          <ion-option value="7">7 +</ion-option>\n          <ion-option value="8">8 +</ion-option>\n          <ion-option value="9">9 +</ion-option>\n      </ion-select>\n  </ion-item>\n    </ion-toolbar>\n    <ion-toolbar color="bgback">\n        <ion-item>\n      <ion-label>Sort By</ion-label>\n      <ion-select interface="popover" [(ngModel)]="sort_by">\n          <ion-option value="title">Movie title</ion-option>\n          <ion-option value="year">Year released</ion-option>\n          <ion-option value="rating">Imdb Rating</ion-option>\n          <ion-option value="peers">Peers</ion-option>\n          <ion-option value="seeds">Seeds</ion-option>\n          <ion-option value="download_count">Download count</ion-option>\n          <ion-option value="like_count">Likes</ion-option>\n          <ion-option value="date_added">Date uploaded</ion-option>\n      </ion-select>\n  </ion-item>\n    </ion-toolbar>\n    <ion-toolbar color="bgback">\n        <ion-item>\n      <ion-label>Order By</ion-label>\n      <ion-select interface="popover" [(ngModel)]="order_by">\n          <ion-option value="desc">Descending order</ion-option>\n          <ion-option value="asc">Ascending order</ion-option>\n      </ion-select>\n  </ion-item>\n    </ion-toolbar>\n\n    <ion-fab bottom right>\n        \n                <button ion-fab (click) = "openSettings()" class="animated zoomIn">\n                    <ion-icon ios="ios-settings" md="md-settings"></ion-icon>\n                </button>\n        \n            </ion-fab>\n\n</ion-content>\n'/*ion-inline-end:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/advanced-search/advanced-search.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        styles: ["\n  ion-searchbar {\n    position: relative;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    width: 100%;\n    left: 0%;\n}\n\n\n  "]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_speech_recognition__["a" /* SpeechRecognition */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], AdvancedSearchPage);

//# sourceMappingURL=advanced-search.js.map

/***/ })

});
//# sourceMappingURL=8.js.map