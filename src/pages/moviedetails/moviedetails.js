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
import { IonicPage, NavController, NavParams, AlertController, ToastController, Content } from 'ionic-angular';
import { YifyMoviesProvider } from '../../providers/yify-movies/yify-movies';
import { Storage } from "@ionic/storage";
import { SocialSharing } from '@ionic-native/social-sharing';
import { LazyLoadImageDirective } from 'ng-lazyload-image';
import { HomePage } from '../home/home';
import { Clipboard } from '@ionic-native/clipboard';
import { MyApp } from '../../app/app.component';
var MoviedetailsPage = /** @class */ (function () {
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
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], MoviedetailsPage.prototype, "content", void 0);
    MoviedetailsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-moviedetails',
            templateUrl: 'moviedetails.html',
            providers: [LazyLoadImageDirective, HomePage, Clipboard],
            styles: ["\n  .ng-lazyloaded {\n      animation: fadein .1s;\n  }\n  @keyframes fadein {\n      from { opacity: 0; }\n      to   { opacity: 1; }\n  }\n  \n"]
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            AlertController,
            YifyMoviesProvider, Storage,
            ToastController, SocialSharing,
            HomePage, Clipboard, MyApp])
    ], MoviedetailsPage);
    return MoviedetailsPage;
}());
export { MoviedetailsPage };
//# sourceMappingURL=moviedetails.js.map