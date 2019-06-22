var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ToastController } from 'ionic-angular';
import { YifyMoviesProvider } from '../../providers/yify-movies/yify-movies';
import { LazyLoadImageDirective } from 'ng-lazyload-image';
import { HomePage } from '../home/home';
var AdvanceSearchResultsPage = /** @class */ (function () {
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
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], AdvanceSearchResultsPage.prototype, "content", void 0);
    AdvanceSearchResultsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-advance-search-results',
            templateUrl: 'advance-search-results.html',
            providers: [LazyLoadImageDirective, HomePage],
            styles: ["\n  .ng-lazyloaded {\n      animation: fadein .3s;\n  }\n  @keyframes fadein {\n      from { opacity: 0; }\n      to   { opacity: 1; }\n  }\n\n\n"]
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            YifyMoviesProvider, ToastController, HomePage])
    ], AdvanceSearchResultsPage);
    return AdvanceSearchResultsPage;
}());
export { AdvanceSearchResultsPage };
//# sourceMappingURL=advance-search-results.js.map