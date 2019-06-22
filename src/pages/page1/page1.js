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
import { NavController, NavParams, IonicPage, Content, Platform, ToastController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { YifyMoviesProvider } from '../../providers/yify-movies/yify-movies';
import { HomePage } from '../home/home';
import { LazyLoadImageDirective } from 'ng-lazyload-image';
import { AppAvailability } from '@ionic-native/app-availability';
import { AlertController } from 'ionic-angular';
import { Page2Page } from '../../pages/page2/page2';
import { MyApp } from '../../app/app.component';
import { SettingsProvider } from '../../providers/settings/settings';
import { Toast } from '@ionic-native/toast';
var Page1Page = /** @class */ (function () {
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
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], Page1Page.prototype, "content", void 0);
    Page1Page = __decorate([
        IonicPage(),
        Component({
            selector: 'page-page1',
            templateUrl: 'page1.html',
            providers: [SettingsProvider, LazyLoadImageDirective, AppAvailability, Page2Page, Toast],
            styles: ["\n  .ng-lazyloaded {\n      animation: fadein .3s;\n  }\n  @keyframes fadein {\n      from { opacity: 0; }\n      to   { opacity: 1; }\n  }\n\n\n"]
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            YifyMoviesProvider,
            Storage,
            HomePage,
            Platform,
            AppAvailability,
            AlertController,
            ToastController, Page2Page,
            MyApp, SettingsProvider, Toast])
    ], Page1Page);
    return Page1Page;
}());
export { Page1Page };
//# sourceMappingURL=page1.js.map