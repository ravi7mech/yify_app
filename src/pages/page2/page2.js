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
import { NavController, NavParams, IonicPage, Content } from 'ionic-angular';
import { YifyMoviesProvider } from '../../providers/yify-movies/yify-movies';
import { LazyLoadImageDirective } from 'ng-lazyload-image';
import { HomePage } from '../home/home';
import { Toast } from '@ionic-native/toast';
var Page2Page = /** @class */ (function () {
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
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], Page2Page.prototype, "content", void 0);
    Page2Page = __decorate([
        IonicPage(),
        Component({
            selector: 'page-page2',
            templateUrl: 'page2.html',
            providers: [LazyLoadImageDirective, Toast],
            styles: ["\n  .ng-lazyloaded {\n      animation: fadein .5s;\n  }\n  @keyframes fadein {\n      from { opacity: 0; }\n      to   { opacity: 1; }\n  }\n  \n"]
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            YifyMoviesProvider, HomePage, Toast])
    ], Page2Page);
    return Page2Page;
}());
export { Page2Page };
//# sourceMappingURL=page2.js.map