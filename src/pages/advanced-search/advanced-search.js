var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { HomePage } from '../home/home';
var AdvancedSearchPage = /** @class */ (function () {
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
    AdvancedSearchPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-advanced-search',
            templateUrl: 'advanced-search.html',
            providers: [HomePage],
            encapsulation: ViewEncapsulation.None,
            styles: ["\n  ion-searchbar {\n    position: relative;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    width: 100%;\n    left: 0%;\n}\n\n\n  "]
        }),
        __metadata("design:paramtypes", [NavController,
            SpeechRecognition,
            NavParams, HomePage, AlertController])
    ], AdvancedSearchPage);
    return AdvancedSearchPage;
}());
export { AdvancedSearchPage };
//# sourceMappingURL=advanced-search.js.map