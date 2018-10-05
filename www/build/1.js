webpackJsonp([1],{

/***/ 615:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoviedetailsPageModule", function() { return MoviedetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__moviedetails__ = __webpack_require__(628);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_fab_toolbar_fab_toolbar__ = __webpack_require__(629);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var MoviedetailsPageModule = (function () {
    function MoviedetailsPageModule() {
    }
    return MoviedetailsPageModule;
}());
MoviedetailsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__moviedetails__["a" /* MoviedetailsPage */], __WEBPACK_IMPORTED_MODULE_4__pages_fab_toolbar_fab_toolbar__["a" /* FabToolbar */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__moviedetails__["a" /* MoviedetailsPage */]), __WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image__["LazyLoadImageModule"]
        ],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_4__pages_fab_toolbar_fab_toolbar__["a" /* FabToolbar */]]
    })
], MoviedetailsPageModule);

//# sourceMappingURL=moviedetails.module.js.map

/***/ }),

/***/ 628:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MoviedetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_yify_movies_yify_movies__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_social_sharing__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_lazyload_image__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_lazyload_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng_lazyload_image__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_clipboard__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_app_component__ = __webpack_require__(288);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MoviedetailsPage = (function () {
    function MoviedetailsPage(navCtrl, navParams, alert, yifyProvider, localstorage, toastCtrl, socialSharing, homepage, clipboard, myapp) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alert = alert;
        this.yifyProvider = yifyProvider;
        this.localstorage = localstorage;
        this.toastCtrl = toastCtrl;
        this.socialSharing = socialSharing;
        this.homepage = homepage;
        this.clipboard = clipboard;
        this.myapp = myapp;
        this.imdb_url = 'https://m.imdb.com/title/';
        this.imdb_cast_url = 'https://m.imdb.com/name/nm';
        this.imdb_cast_url1 = 'https://m.imdb.com/name/';
        this.torrents = [];
        this.testRadioOpen = false;
        this.sub_sceneurl = 'https://subscene.com/subtitles/release?q=';
        this.yify_subtitle_url = 'http://www.yifysubtitles.com/movie-imdb/';
        this.asyncCall = false;
        this.castinglist = [];
        this.moreorless = "More";
        this.magnet_url = "magnet:?xt=urn:btih:TORRENT_HASH&dn=MNNAME&tr=http://track.one:1234/announce&tr=udp://track.two:80";
        this.youtube_link = "https://www.youtube.com/watch?v=";
        this.errorAvtImage = "https://s.ynet.me/assets/images/actors/thumb/default_avatar.jpg";
        this.darkui = true;
        this.position = 'bottom';
        this.icon = 'more';
        this.enableBackdropDismiss = false;
        this.buttonColor = 'dark';
        this.imdb_review_url = 'https://m.imdb.com/title/####/reviews';
        this.buttons = [
            {
                title: 'YTS',
                color: 'dark',
                handler: function () {
                    _this.openYts();
                }
            },
            {
                title: 'IMDB',
                color: 'dark',
                handler: function () {
                    _this.openimdb();
                }
            },
            {
                title: 'REVIEWS',
                color: 'dark',
                handler: function () {
                    _this.routetoReview();
                }
            },
            {
                title: 'SUBTITLES',
                color: 'dark',
                handler: function () {
                    _this.browsesubtitles();
                }
            },
            {
                icon: 'close',
                color: 'dark',
                handler: function () {
                }
            }
        ];
        this.localstorage.set("hastorapp", false);
        this.movie = navParams.get('movie');
        this.large_screenshot = this.movie.small_cover_image.replace("small-cover.jpg", "medium-screenshot1.jpg");
        console.log(this.movie);
        this.slug = this.movie.slug.replace(/-/g, '_');
        this.movietitle = this.movie.title_long;
        this.title = this.movie.title;
        this.year = this.movie.year;
        this.yt_code = this.movie.yt_trailer_code;
        this.description_full = this.movie.synopsis;
        this.tileimage = this.movie.medium_cover_image;
        this.runtime = this.movie.runtime;
        this.genres = this.getGenreStringFromArray(this.movie.genres);
        this.rating = this.movie.rating;
        this.date_uploaded_unix = this.movie.date_uploaded_unix;
        this.mpa_rating = this.movie.mpa_rating;
        this.imdb_code = this.movie.imdb_code;
        this.torrents = this.movie.torrents;
        this.url = this.movie.url;
        this.bookMarkListContains(this.imdb_code);
        this.loadMovieInfo(this.movie.id);
    }
    MoviedetailsPage.prototype.ionViewWillEnter = function () {
        this.myapp.checkTorrentsAppAvailability();
    };
    MoviedetailsPage.prototype.routetoReview = function () {
        var url = this.imdb_review_url.replace("####", this.imdb_code);
        this.download(url);
    };
    MoviedetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MoviedetailsPage');
    };
    MoviedetailsPage.prototype.getGenreStringFromArray = function (genre) {
        var genres = '';
        if (genre != undefined && genre.length > 0) {
            for (var i = 0; i < genre.length; i++) {
                genres += genre[i] + ' ';
            }
        }
        return genres;
    };
    MoviedetailsPage.prototype.loadMovieInfo = function (movie_id) {
        var _this = this;
        try {
            this.asyncCall = true;
            this.yifyProvider.loadYifyMovieDetails(movie_id).subscribe(function (res) {
                _this.asyncCall = false;
                if (res.status == 'ok') {
                    _this.castinglist = (res.data.movie != undefined && res.data.movie != null) ? res.data.movie.cast : res.data.cast;
                    _this.download_count = (res.data.movie != undefined && res.data.movie != null) ? res.data.movie.download_count : res.data.download_count;
                    _this.description_full = (_this.description_full == undefined) ? res.data.description_full : _this.description_full;
                    _this.like_count = (res.data.movie != undefined && res.data.movie != null) ? res.data.movie.like_count : res.data.like_count;
                    _this.yt_code = (_this.yt_code == undefined) ? res.data.yt_trailer_code : _this.yt_code;
                }
            });
        }
        catch (e) {
            this.asyncCall = false;
            console.log(e);
        }
    };
    MoviedetailsPage.prototype.watchtrailer = function () {
        var _this = this;
        this.localstorage.get('hasytapp').then(function (value) {
            if (value) {
                //this.youtube.openVideo(this.movie.yt_trailer_code);
                if (_this.movie.yt_trailer_code != undefined) {
                    _this.download(_this.youtube_link + _this.movie.yt_trailer_code);
                }
                else if (_this.yt_code != undefined) {
                    _this.download(_this.youtube_link + _this.yt_code);
                }
            }
            else {
                //this.youtube.openVideo(this.movie.yt_trailer_code);
                if (_this.movie.yt_trailer_code != undefined) {
                    _this.download(_this.youtube_link + _this.movie.yt_trailer_code);
                }
                else if (_this.yt_code != undefined) {
                    _this.download(_this.youtube_link + _this.yt_code);
                }
            }
        });
    };
    MoviedetailsPage.prototype.openimdb = function () {
        this.download(this.imdb_url + this.imdb_code);
    };
    MoviedetailsPage.prototype.presentConfirm = function (mgurl) {
        var _this = this;
        var alert = this.alert.create({
            title: 'No torrent downloader found !!',
            message: 'No torrent downloader installed in your device ! Are you wish to copy the magnet link in clip board !?',
            buttons: [
                {
                    text: 'CANCEL',
                    handler: function () {
                    }
                },
                {
                    text: 'COPY LINK',
                    handler: function () {
                        _this.clipboard.copy(mgurl);
                        _this.presentToast('Copied!!');
                    }
                }
            ]
        });
        alert.present();
    };
    MoviedetailsPage.prototype.getAvailableTorrentFormats = function (torrents, alert) {
        for (var i = 0; i < torrents.length; i++) {
            var element = {
                type: 'radio',
                label: torrents[i].quality + ' / ' + torrents[i].size + ' (P/S : ' + torrents[i].peers + '/' + torrents[i].seeds + ')',
                value: torrents[i].url,
                checked: false
            };
            if (i == 0) {
                element.checked = true;
            }
            alert.addInput(element);
        }
        return alert;
    };
    MoviedetailsPage.prototype.getAvailableSubTitleSites = function (alert) {
        var element = {
            type: 'radio',
            label: 'Yify Subtitles',
            value: 'Y'
        };
        alert.addInput(element);
        element = {
            type: 'radio',
            label: 'Subscene',
            value: 'S'
        };
        alert.addInput(element);
        return alert;
    };
    MoviedetailsPage.prototype.chooseTorrents = function () {
        var _this = this;
        var alert = this.alert.create();
        alert = this.getAvailableTorrentFormats(this.torrents, alert);
        alert.setTitle('Choose Formats');
        alert.addButton('Cancel');
        alert.setCssClass('my-alert');
        alert.addButton({
            text: 'Ok',
            handler: function (data) {
                console.log('Radio data:', data);
                if (data != undefined && data != null) {
                    _this.testRadioOpen = false;
                    _this.testRadioResult = data;
                    _this.download(data);
                }
                else {
                }
            }
        });
        alert.present();
    };
    MoviedetailsPage.prototype.chooseMagnet = function () {
        var _this = this;
        this.myapp.checkTorrentsAppAvailability();
        var alert = this.alert.create();
        alert = this.getAvailableMagnetFormats(this.torrents, alert);
        alert.setTitle('Choose Formats');
        alert.addButton('Cancel');
        alert.setCssClass('my-alert');
        alert.addButton({
            text: 'Ok',
            handler: function (data) {
                console.log('Radio data:', data);
                if (data != undefined && data != null) {
                    _this.testRadioOpen = false;
                    _this.testRadioResult = data;
                    _this.magnet_download(data);
                }
                else {
                }
            }
        });
        alert.present();
    };
    MoviedetailsPage.prototype.magnet_download = function (namedata) {
        var _this = this;
        var namearr = namedata.split("$#@$%");
        var mgurl = this.magnet_url.replace("TORRENT_HASH", namearr[1]);
        mgurl = mgurl.replace("MNNAME", encodeURIComponent(namearr[0]));
        this.localstorage.get('hastorapp').then(function (value) {
            if (value) {
                window.open(mgurl, '_system', "location=yes");
            }
            else {
                _this.presentConfirm(mgurl);
            }
        });
    };
    MoviedetailsPage.prototype.getAvailableMagnetFormats = function (torrents, alert) {
        for (var i = 0; i < torrents.length; i++) {
            var element = {
                type: 'radio',
                label: torrents[i].quality + ' / ' + torrents[i].size + ' (P/S : ' + torrents[i].peers + '/' + torrents[i].seeds + ')',
                value: this.movietitle + "$#@$%" + torrents[i].hash,
                checked: false
            };
            if (i == 0) {
                element.checked = true;
            }
            alert.addInput(element);
        }
        return alert;
    };
    MoviedetailsPage.prototype.download = function (url) {
        window.open(url, '_system', "location=yes");
    };
    MoviedetailsPage.prototype.browsesubtitles = function () {
        var movie = this.title.replace(/[^\w\s]/gi, ".");
        var openurl = this.sub_sceneurl + movie + "." + this.year + ".720p.BluRay.x264&l=";
        var imdb = { imdbcode: this.imdb_code, suburl: openurl };
        var ANIMATION = { animate: true, direction: 'forward' };
        this.navCtrl.push('SubtitleTabsPage', { imdb: imdb }, ANIMATION);
    };
    MoviedetailsPage.prototype.openSubTitleSites = function (siteflag) {
        if (siteflag == 'Y') {
            var openurl = this.yify_subtitle_url + this.imdb_code;
            window.open(openurl, '_system', "location=yes");
        }
        else {
            var movie = this.title.replace(/[^\w\s]/gi, ".");
            var openurl = this.sub_sceneurl + movie + "." + this.year + ".720p.BluRay.x264&l=";
            window.open(openurl, '_system', "location=yes");
        }
    };
    MoviedetailsPage.prototype.scrollToTop = function () {
        this.content.scrollToTop(1000);
    };
    MoviedetailsPage.prototype.ScrollToBottom = function () {
        var element = document.getElementById("myLabel");
        setTimeout(function () { element.scrollIntoView(true); }, 100);
        if (this.moreorless == 'More') {
            this.moreorless = 'Less';
        }
        else {
            this.moreorless = 'More';
        }
    };
    MoviedetailsPage.prototype.viewcastImdb = function (imdbcode) {
        if (imdbcode != null && imdbcode.startsWith("nm")) {
            this.download(this.imdb_cast_url1 + imdbcode);
        }
        else {
            this.download(this.imdb_cast_url + imdbcode);
        }
    };
    MoviedetailsPage.prototype.openYts = function () {
        this.download(this.url);
    };
    MoviedetailsPage.prototype.errorHandler = function (event) {
        console.debug(event);
        event.target.src = "http://img.youtube.com/vi/" + this.yt_code + "/maxresdefault.jpg";
    };
    MoviedetailsPage.prototype.bookmarkMovie = function () {
        var _this = this;
        this.localstorage.get('bookmarklist').then(function (value) {
            if (value == undefined || value == null || value.length == 0) {
                var bmklist = [];
                bmklist.push(_this.movie);
                _this.localstorage.set('bookmarklist', bmklist);
                _this.bookmarkcolor = '#0045b9';
                _this.presentToast('Added to Bookmark Successfully!!');
            }
            else {
                var bmklist = value;
                if (_this.havingtheMovieId(bmklist)) {
                    _this.removeFromBookmark(_this.imdb_code, bmklist);
                }
                else {
                    _this.addToBookmark(bmklist);
                }
            }
        });
    };
    MoviedetailsPage.prototype.havingtheMovieId = function (bmklist) {
        for (var i = 0; i < bmklist.length; i++) {
            if (bmklist[i].imdb_code == this.imdb_code)
                return true;
        }
        return false;
    };
    MoviedetailsPage.prototype.removeFromBookmark = function (imdb_code, bmklist) {
        for (var i = 0; i < bmklist.length; i++) {
            if (bmklist[i].imdb_code == this.imdb_code)
                bmklist.splice(i, 1);
        }
        this.localstorage.set('bookmarklist', bmklist);
        this.bookmarkcolor = '#a9a9a9';
        this.presentToast('Removed from Bookmark Successfully !!');
    };
    MoviedetailsPage.prototype.addToBookmark = function (bmklist) {
        bmklist.push(this.movie);
        this.localstorage.set('bookmarklist', bmklist);
        this.bookmarkcolor = '#0045b9';
        this.presentToast('Added to Bookmark Successfully !!');
    };
    MoviedetailsPage.prototype.presentToast = function (msg) {
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
    MoviedetailsPage.prototype.bookMarkListContains = function (imdb_code) {
        var _this = this;
        this.localstorage.get('bookmarklist').then(function (value) {
            if (value == undefined || value == null || value.length == 0) {
                _this.bookmarkcolor = '#a9a9a9';
            }
            else {
                var bmklist = value;
                _this.bookmarkcolor = (_this.havingtheMovieId(bmklist)) ? '#0045b9' : '#a9a9a9';
            }
        });
    };
    MoviedetailsPage.prototype.shareTorrent = function () {
        var _this = this;
        var alert = this.alert.create();
        alert = this.getAvailableTorrentFormats(this.torrents, alert);
        alert.setTitle('Choose Formats');
        alert.addButton('Cancel');
        alert.setCssClass('my-alert');
        alert.addButton({
            text: 'Share',
            handler: function (data) {
                console.log('Radio data:', data);
                _this.testRadioOpen = false;
                _this.testRadioResult = data;
                _this.socialShare(data);
            }
        });
        alert.present();
    };
    MoviedetailsPage.prototype.socialShare = function (data) {
        var message = this.movie.title_long;
        var subject = this.getSubjectContent(data);
        var file = [this.movie.large_cover_image];
        var url = data;
        this.socialSharing.share(subject, message, file, url).then(function (res) {
            console.log(res);
            console.log("shared");
        }).catch(function (e) {
            console.log(e);
        });
    };
    MoviedetailsPage.prototype.getSubjectContent = function (data) {
        var content = '';
        for (var i = 0; i < this.torrents.length; i++) {
            if (this.torrents[i].url == data) {
                content += "Download " + this.movie.title_long + ' ' + this.torrents[i].quality + ' / ' +
                    this.torrents[i].size + ' (P/S : ' + this.torrents[i].peers + '/' + this.torrents[i].seeds + ')' +
                    ' by clicking the below torrent link.';
            }
        }
        return content;
    };
    MoviedetailsPage.prototype.shareApp = function () {
        this.homepage.shareApp();
    };
    MoviedetailsPage.prototype.openSettings = function () {
        this.navCtrl.push('AppSettingsPage');
    };
    return MoviedetailsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
], MoviedetailsPage.prototype, "content", void 0);
MoviedetailsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-moviedetails',template:/*ion-inline-start:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/moviedetails/moviedetails.html"*/'<ion-header class="ripple">\n\n  <ion-navbar>\n    <ion-title>{{movietitle}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content #pageContent padding>\n\n  <div class="tileimage" [lazyLoad]="large_screenshot" [defaultImage]="large_screenshot" (tap)="watchtrailer()" style="height: 30%;width: 100%;background-size: cover;background-repeat: no-repeat;">\n    <div style="position: absolute; left: 42%;top: 10%;z-index: 10;">\n      <i class="fa fa-youtube-play" style="font-size: 60px; color: #ec5539;" aria-hidden="true"></i>\n    </div>\n  </div>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col col-50>\n        <button class="ripple" ion-button block (tap)="chooseTorrents()">\n          <i class="fa fa-cloud-download" style="font-size: 18px;" aria-hidden="true"></i>\n          <span style="padding: 15px;">TORRENT</span>\n        </button>\n\n      </ion-col>\n      <ion-col col-50>\n        <button class="ripple" ion-button block (tap)="chooseMagnet()">\n          <ion-icon style="font-size: 20px;" ios="ios-magnet" md="md-magnet"></ion-icon>\n          <span style="padding: 15px;">MAGNET</span>\n        </button>\n\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col col-50 class="ripple" (tap)="bookmarkMovie()" style="height: 304px;">\n        <div class="tileimage" [lazyLoad]="tileimage" style="background-repeat: no-repeat;height: 100%;background-size: contain;width: 100%;">\n        </div>\n\n        <span class="bookmark" [ngStyle]="{\'color\': bookmarkcolor}">\n          <i class="fa fa-bookmark fa-lg" aria-hidden="true"></i>\n        </span>\n      </ion-col>\n      <ion-col col-50>\n        <ion-row class="ripple">\n          <ion-col col-20 style="max-width: 20%;">\n            <i class="fa fa-clock-o cus" aria-hidden="true"></i>\n          </ion-col>\n          <ion-col col-50 class="msum">\n            <span> {{runtime}} mins</span>\n          </ion-col>\n        </ion-row>\n        <ion-row class="ripple" *ngIf="genres != null && genres !=\'\'">\n          <ion-col col-20 style="max-width: 20%;">\n            <i class="fa fa-film cus" aria-hidden="true"></i>\n          </ion-col>\n          <ion-col col-50 class="msum">\n            <span> {{genres}}</span>\n          </ion-col>\n        </ion-row>\n        <ion-row class="ripple">\n          <ion-col col-20 style="max-width: 20%;">\n            <i class="fa fa-imdb cus" aria-hidden="true"></i>\n          </ion-col>\n          <ion-col col-50 class="msum">\n            <span> {{rating}}/10</span>\n          </ion-col>\n        </ion-row>\n        <ion-row class="ripple">\n          <ion-col col-20 style="max-width: 20%;">\n            <i class="fa fa-calendar cus" aria-hidden="true"></i>\n          </ion-col>\n          <ion-col col-50 class="msum">\n            <span> {{date_uploaded_unix * 1000 | date: \'mediumDate\'}} </span>\n          </ion-col>\n        </ion-row>\n        <ion-row class="ripple" *ngIf="mpa_rating != null && mpa_rating !=\'\'">\n          <ion-col col-20 style="max-width: 20%;">\n            <i class="fa fa-eye cus" aria-hidden="true"></i>\n\n          </ion-col>\n          <ion-col col-50 class="msum">\n            <span> {{mpa_rating}} </span>\n          </ion-col>\n        </ion-row>\n\n\n\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <!--  <ion-grid>\n        <ion-row>\n            <ion-col col-50 class="ripple">\n                <button ion-button block (tap)="openYts()">YTS</button>\n            </ion-col>\n            <ion-col col-50 class="ripple">\n                <button ion-button block (tap)="browsesubtitles()" >SUBTITLES</button>\n            </ion-col>\n        </ion-row>\n    </ion-grid> -->\n\n  <ion-spinner name="crescent" *ngIf="asyncCall == true" color="spinner" style="left: 50%;">\n  </ion-spinner>\n\n  <ion-card>\n\n    <ion-item>\n      <h2 style="font-size: 18px;">Storyline</h2>\n    </ion-item>\n\n\n\n    <ion-card-content class="ripple">\n      <p style="white-space: pre-wrap;">\n        <span class="moviedes">{{description_full}}</span>\n      </p>\n    </ion-card-content>\n\n    <ion-row>\n      <ion-col class="ripple">\n\n        <i class="fa fa-download fa-lg cus " aria-hidden="true">\n          <span style="padding:15px;">{{download_count}}</span>\n        </i>\n\n\n      </ion-col>\n      <ion-col class="ripple">\n        <i class="fa fa-thumbs-up fa-lg cus " aria-hidden="true">\n          <span style="padding:15px;">{{like_count}}</span>\n        </i>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-list id="myLabel" *ngIf="castinglist != undefined && castinglist != null && castinglist.length > 0 ">\n      <ion-item>\n\n        <h2>\n          <span>Cast</span>\n        </h2>\n\n      </ion-item>\n      <ion-item class="ripple" *ngFor="let cast of castinglist" (tap)="viewcastImdb(cast.imdb_code)">\n        <ion-avatar item-start>\n          <div class="avatarimg" *ngIf="cast.url_small_image != undefined" [ngStyle]="{\'background-image\': \'url(\' + cast.url_small_image + \')\'}"></div>\n          <div class="avatarimg" *ngIf="cast.url_small_image == undefined" [ngStyle]="{\'background-image\': \'url(\' + errorAvtImage + \')\'}"></div>\n\n        </ion-avatar>\n        <h2>{{cast.name}}</h2>\n        <p>{{cast.character_name}}</p>\n        <button ion-button clear item-end>\n          <i class="fa fa-imdb imdbc fa-4x" aria-hidden="true">\n          </i>\n        </button>\n      </ion-item>\n    </ion-list>\n\n  </ion-card>\n\n  <fab-toolbar ion-fixed [enableBackdropDismiss]="enableBackdropDismiss" [color]="color" [icon]="icon" [position]="position"\n    [buttons]="buttons">\n  </fab-toolbar>\n\n\n  <!--  <ion-fab bottom right>\n        \n                <button ion-fab (tap) = "openSettings()" class="animated zoomIn">\n                    <ion-icon ios="ios-settings" md="md-settings"></ion-icon>\n                </button>\n        \n            </ion-fab> -->\n\n\n</ion-content>\n\n<style>\n  .imdbc {\n    color: yellow;\n    background-color: black;\n  }\n\n\n  .cus {\n    color: #ec5539;\n    font-size: 24px;\n    padding: 2px;\n  }\n\n  .msum {\n    font-size: 18px;\n  }\n\n\n  .alert-title {\n    font-size: 18px;\n  }\n\n  .my-alert {\n    text-align: left;\n    text-align: start;\n    padding: 15px 14px 20px;\n  }\n\n  .bookmark {\n    position: absolute;\n    left: 83%;\n    top: 4%;\n    z-index: 10;\n    font-size: 23px;\n  }\n\n</style>\n'/*ion-inline-end:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/moviedetails/moviedetails.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_5_ng_lazyload_image__["LazyLoadImageDirective"], __WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_clipboard__["a" /* Clipboard */]],
        styles: ["\n  .ng-lazyloaded {\n      animation: fadein .1s;\n  }\n  @keyframes fadein {\n      from { opacity: 0; }\n      to   { opacity: 1; }\n  }\n  \n"]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_yify_movies_yify_movies__["a" /* YifyMoviesProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_social_sharing__["a" /* SocialSharing */],
        __WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_clipboard__["a" /* Clipboard */], __WEBPACK_IMPORTED_MODULE_8__app_app_component__["a" /* MyApp */]])
], MoviedetailsPage);

//# sourceMappingURL=moviedetails.js.map

/***/ }),

/***/ 629:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FabToolbar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * @name FabToolbar
 * @description
 * FabToolbar is Ionic v2 component which uses ionic fab buttons, buttons. Inspired by Google's Material Design
 *
 * On click Fab button will transform into tab like area with provided buttons
 *
 * @usage
 * *html - simply add the 'fab-toolbar' tag to your page and bind the properties.
 * ```
 * <fab-toolbar  [color]="'light'" [icon]="'more'" [enableBackdropDismiss]="'false'" [position]="'left" [buttons]="buttons"></fab-toolbar>
 * ```
 *
 * *javascript - starting from Ionic 2 RC0.0 (AoT) you should provide all components inside app.module.ts
 *                 after adding them into app.module.ts import FabToolbar
 *  ```
 * import { FabToolbar } from './fab-toolbar/fab-toolbar';
 *
 * public buttons = [
 *  {
 *      icon: 'add',
 *      title: 'Add',
 *      color: 'dark',
 *      handler: () => {console.log('added');}
 *  },
 *  {
 *      icon: 'cart',
 *      title: 'Products',
 *      color: 'dark',
 *      handler: () => {console.log('Products');}
 *  }
 * ]
 * ```
 *
 * @see {@link https://github.com/ekhmoi/Ionic-Component-fab-toolbar Ionic-Component-fab-toolbar}
 *
 */
var FabToolbar = (function () {
    function FabToolbar(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.active = false;
        this.position = 'left';
        this.color = 'secondary';
        this.icon = 'more';
        this.cssClass = '';
        this.enableBackdropDismiss = true;
        this.buttons = [];
    }
    FabToolbar.prototype.ngOnInit = function () {
        this.renderer.setElementClass(this.el.nativeElement, this.position, true);
    };
    FabToolbar.prototype.onClick = function (event, button) {
        var _this = this;
        // We are listening to click event on document in order to be able to close button on backdrop click
        // Therefore we need to check if user clicked on our component or outside
        if (!event && !button) {
            // clicked on backdrop
            if (this.enableBackdropDismiss === true && this.active) {
                this.closeButton();
                return;
            }
        }
        if (this.el.nativeElement.contains(event.target)) {
            // User has clicked on our component. Check if he clicked on sub button or no.
            if (button) {
                var shouldDismiss = true;
                if (button.handler) {
                    // a handler has been provided, execute it
                    if (button.handler() === false) {
                        // if the return value of the handler is false then do not dismiss
                        shouldDismiss = false;
                    }
                }
                if (shouldDismiss) {
                    setTimeout(function () {
                        _this.closeButton();
                    }, 10);
                }
            }
            else {
                if (!this.active)
                    this.openButton();
            }
        }
        else {
            // User has clicked outside our component.
            // Check if `enableBackdropDismiss` is true and if component is opened.
            if (this.enableBackdropDismiss === true && this.active) {
                this.closeButton();
            }
        }
    };
    Object.defineProperty(FabToolbar.prototype, "width", {
        get: function () {
            var width = window.innerWidth / 56 * 2;
            return 'scale(' + width + ')';
        },
        enumerable: true,
        configurable: true
    });
    FabToolbar.prototype.openButton = function () {
        var _this = this;
        this.renderer.setElementClass(this.el.nativeElement, 'activated', true);
        setTimeout(function () {
            _this.renderer.setElementClass(_this.el.nativeElement, 'closed', false);
            _this.renderer.setElementClass(_this.el.nativeElement, 'opened', true);
        }, 400);
        this.renderer.setElementStyle(this.el.nativeElement, 'width', '100%');
        this.active = true;
    };
    FabToolbar.prototype.closeButton = function () {
        var _this = this;
        this.renderer.setElementClass(this.el.nativeElement, 'activated', false);
        setTimeout(function () {
            _this.renderer.setElementClass(_this.el.nativeElement, 'opened', false);
            _this.renderer.setElementClass(_this.el.nativeElement, 'closed', true);
            _this.renderer.setElementStyle(_this.el.nativeElement, 'width', '68px');
        }, 400);
        this.active = false;
    };
    return FabToolbar;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], FabToolbar.prototype, "position", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], FabToolbar.prototype, "color", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], FabToolbar.prototype, "icon", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], FabToolbar.prototype, "cssClass", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], FabToolbar.prototype, "enableBackdropDismiss", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], FabToolbar.prototype, "buttons", void 0);
FabToolbar = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'fab-toolbar',
        template: "\n        <div tappable class=\"backdrop\" (click)=\"onClick(false, false)\"></div>\n        <div class=\"fab-toolbar\">\n            <ion-row [style.transform]=\"\">\n                <ion-col *ngFor=\"let b of buttons\">\n                    <button (click)=\"onClick($event, b)\" ion-button clear [color]=\"b.color ? b.color : 'light'\">\n                        <div>\n                            <ion-icon style=\"color: white;\" *ngIf=\"b.icon\" [name]=\"b.icon\"></ion-icon>\n                                <br *ngIf=\"b.title && b.icon\">\n                            <label *ngIf=\"b.title\" style=\"color: white;\">{{b.title}}</label>\n                        </div>\n                    </button>\n                </ion-col>\n            </ion-row>\n           \n            <button (click)=\"onClick($event, false)\" [style.transform]=\"active ? width: 'scale(1)' \" \n            ion-fab color=\"{{color}}\"><ion-icon name=\"{{icon}}\"></ion-icon></button>\n\n\n        </div>\n        "
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
], FabToolbar);

//# sourceMappingURL=fab-toolbar.js.map

/***/ })

});
//# sourceMappingURL=1.js.map