var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
var YifyMoviesProvider = /** @class */ (function () {
    /* https://api.themoviedb.org/3/find/tt5997666?api_key=fa286812af448bf2745c5c960c7b964e&language=en-US&external_source=imdb_id */
    function YifyMoviesProvider(http) {
        this.http = http;
        this.yifysites = ['https://yts.am/api/v2', 'https://yts.unblocked.lat/api/v2', 'https://yts.bypassed.org/api/v2', 'https://yts.pe/api/v2/',
            'https://yifymovie.co/api/v2', 'https://yifytorrent.to/api/v2/', 'https://yts.me/api/v2', 'https://yts.gs/api/v2'];
        this.sitecount = -1;
        this.yifysubUrl = 'https://www.yifysubtitles.com/movie-imdb/';
        this.storeurl = '/storeurl';
        this.queryjson = { "rating_list": [{ "elem": ".container .row .table-responsive .other-subs tbody .rating-cell ", "rating": "text" }], "lang_list": [{ "elem": ".container .row .table-responsive .other-subs tbody .flag-cell .sub-lang ", "lang": "text" }], "sub_links": [{ "elem": ".container .row .table-responsive .other-subs tbody  .download-cell a", "download_link": "href" }], "sub_names": [{ "elem": ".container .row .table-responsive .other-subs tbody td", "subname": "text" }] };
        this.subscene_queryjson = { "down_links": [{ "elem": ".a1 > a:first-of-type", "link": "href" }], "langs_names": [{ "elem": ".a1 > a:first-of-type span", "link": "href", "lang_name": "text" }] };
        this.subscene_download_json = { "downlink": [{ "elem": ".download > a:first-of-type", "link": "href" }] };
        this.Tmdburl = 'https://api.themoviedb.org/3/search/movie?include_adult=false&api_key=fa286812af448bf2745c5c960c7b964e';
        this.ServerIp = 'http://18.217.205.247:7070/';
    }
    YifyMoviesProvider.prototype.loadYifyMovies = function (limit, page, sitecount) {
        return this.http.get(this.yifysites[sitecount] + "/list_movies.jsonp?limit=" + limit + "&page=" + page)
            .map(function (res) { return res.json(); })
            .catch(function (error) {
            return Observable.throw(new Error(error.status));
        });
    };
    YifyMoviesProvider.prototype.loadYifyTopRatedMovies = function (limit, page, sitecount) {
        return this.http.get(this.yifysites[sitecount] + "/list_movies.jsonp?sort_by=rating&limit=" + limit + "&page=" + page)
            .map(function (res) { return res.json(); })
            .catch(function (error) {
            return Observable.throw(new Error(error.status));
        });
    };
    YifyMoviesProvider.prototype.setUrl = function (index) {
        this.Url = this.yifysites[index];
        console.log(this.Url);
    };
    YifyMoviesProvider.prototype.getUrl = function () {
        return this.Url;
    };
    YifyMoviesProvider.prototype.loadYifyMovieDetails = function (movie_id) {
        return this.http.get(this.Url + "/movie_details.json?movie_id=" + movie_id + "&with_images=true&with_cast=true")
            .map(function (res) { return res.json(); })
            .catch(function (error) {
            return Observable.throw(new Error(error.status));
        });
    };
    YifyMoviesProvider.prototype.searchYifyMovies = function (query_term) {
        return this.http.get(this.Url + "/list_movies.jsonp?sort_by=rating&limit=30&query_term=" + query_term)
            .map(function (res) { return res.json(); })
            .catch(function (error) {
            return Observable.throw(new Error(error.status));
        });
    };
    YifyMoviesProvider.prototype.advancedSearchYifyMovies = function (limit, page, criteria) {
        return this.http.get(this.Url + "/list_movies.jsonp?limit=" + limit + "&page=" + page + "&" + criteria)
            .map(function (res) { return res.json(); })
            .catch(function (error) {
            return Observable.throw(new Error(error.status));
        });
    };
    YifyMoviesProvider.prototype.getYifySUbTitles = function (imdb_code) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' });
        var options = new RequestOptions({
            headers: headers
        });
        var body = new URLSearchParams();
        body.set('url', "" + this.yifysubUrl + imdb_code);
        body.set('json_data', JSON.stringify(this.queryjson));
        return this.http.post("" + this.ServerIp, body, options).
            map(function (res) { return res.json(); })
            .catch(function (error) {
            return Observable.throw(new Error(error.status));
        });
    };
    YifyMoviesProvider.prototype.getSubSceneSubTitles = function (suburl) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' });
        var options = new RequestOptions({
            headers: headers
        });
        var body = new URLSearchParams();
        body.set('url', suburl);
        body.set('json_data', JSON.stringify(this.subscene_queryjson));
        return this.http.post("" + this.ServerIp, body, options).
            map(function (res) { return res.json(); })
            .catch(function (error) {
            return Observable.throw(new Error(error.status));
        });
    };
    YifyMoviesProvider.prototype.downloadSubsceneSubs = function (suburl) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' });
        var options = new RequestOptions({
            headers: headers
        });
        var body = new URLSearchParams();
        body.set('url', suburl);
        body.set('json_data', JSON.stringify(this.subscene_download_json));
        return this.http.post("" + this.ServerIp, body, options).
            map(function (res) { return res.json(); })
            .catch(function (error) {
            return Observable.throw(new Error(error.status));
        });
    };
    YifyMoviesProvider.prototype.searchTMDbQueryData = function (query_term, page) {
        return this.http.get(this.Tmdburl + "&query=" + query_term + "&page=" + page)
            .map(function (res) { return res.json(); })
            .catch(function (error) {
            return Observable.throw(new Error(error.status));
        });
    };
    YifyMoviesProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], YifyMoviesProvider);
    return YifyMoviesProvider;
}());
export { YifyMoviesProvider };
//# sourceMappingURL=yify-movies.js.map