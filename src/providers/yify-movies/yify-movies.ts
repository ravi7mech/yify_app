import { Injectable, OnInit } from '@angular/core'
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http'
import { Observable, Subject } from 'rxjs/Rx'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Response, YifySubtitleResultJson, SubsceneResults, TMDbResponse } from '../../models/moviesjson'



@Injectable()
export class YifyMoviesProvider {

  yifysites: any = ['https://yts.am/api/v2', 'https://yts.unblocked.lat/api/v2', 'https://yts.bypassed.org/api/v2', 'https://yts.pe/api/v2/',
    'https://yifymovie.co/api/v2', 'https://yifytorrent.to/api/v2/', 'https://yts.me/api/v2']

  sitecount: number = -1
  Url: string
  yifysubUrl: string = 'https://www.yifysubtitles.com/movie-imdb/'
  storeurl: string = '/storeurl'
  queryjson: any = { "rating_list": [{ "elem": ".container .row .table-responsive .other-subs tbody .rating-cell ", "rating": "text" }], "lang_list": [{ "elem": ".container .row .table-responsive .other-subs tbody .flag-cell .sub-lang ", "lang": "text" }], "sub_links": [{ "elem": ".container .row .table-responsive .other-subs tbody  .download-cell a", "download_link": "href" }], "sub_names": [{ "elem": ".container .row .table-responsive .other-subs tbody td", "subname": "text" }] }
  subscene_queryjson: any = { "down_links": [{ "elem": ".a1 > a:first-of-type", "link": "href" }], "langs_names": [{ "elem": ".a1 > a:first-of-type span", "link": "href", "lang_name": "text" }] }
  subscene_download_json: any = { "downlink": [{ "elem": ".download > a:first-of-type", "link": "href" }] }
  Tmdburl: any = 'https://api.themoviedb.org/3/search/movie?include_adult=false&api_key=fa286812af448bf2745c5c960c7b964e'
  ServerIp: any = 'http://18.217.205.247:7070/'
  /* https://api.themoviedb.org/3/find/tt5997666?api_key=fa286812af448bf2745c5c960c7b964e&language=en-US&external_source=imdb_id */

  constructor(public http: Http) {

  }



  loadYifyMovies(limit: number, page: number, sitecount: number): Observable<Response> {
    return this.http.get(`${this.yifysites[sitecount]}/list_movies.jsonp?limit=${limit}&page=${page}`)
      .map((res) => <Response>res.json())
      .catch((error: any) => {
        return Observable.throw(new Error(error.status))
      })
  }

  loadYifyTopRatedMovies(limit: number, page: number, sitecount: number): Observable<Response> {
    return this.http.get(`${this.yifysites[sitecount]}/list_movies.jsonp?sort_by=rating&limit=${limit}&page=${page}`)
      .map(res => <Response>res.json())
      .catch((error: any) => {
        return Observable.throw(new Error(error.status))
      })
  }

  setUrl(index: number) {
    this.Url = this.yifysites[index]
    console.log(this.Url)
  }

  getUrl() {
    return this.Url
  }

  loadYifyMovieDetails(movie_id: number): Observable<Response> {
    return this.http.get(`${this.Url}/movie_details.json?movie_id=${movie_id}&with_images=true&with_cast=true`)
      .map(res => <Response>res.json())
      .catch((error: any) => {
        return Observable.throw(new Error(error.status))
      })

  }



  searchYifyMovies(query_term: string): Observable<Response> {
    return this.http.get(`${this.Url}/list_movies.jsonp?sort_by=rating&limit=30&query_term=${query_term}`)
      .map(res => <Response>res.json())
      .catch((error: any) => {
        return Observable.throw(new Error(error.status))
      })
  }

  advancedSearchYifyMovies(limit: number, page: number, criteria: string): Observable<Response> {
    return this.http.get(`${this.Url}/list_movies.jsonp?limit=${limit}&page=${page}&${criteria}`)
      .map(res => <Response>res.json())
      .catch((error: any) => {
        return Observable.throw(new Error(error.status))
      })
  }

  getYifySUbTitles(imdb_code: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' })
    let options = new RequestOptions({
      headers: headers
    })

    let body = new URLSearchParams()
    body.set('url', `${this.yifysubUrl}${imdb_code}`)
    body.set('json_data', JSON.stringify(this.queryjson))
    return this.http.post(`${this.ServerIp}`, body, options).
      map(res => <YifySubtitleResultJson>res.json())
      .catch((error: any) => {
        return Observable.throw(new Error(error.status))
      })
  }


  getSubSceneSubTitles(suburl: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' })
    let options = new RequestOptions({
      headers: headers
    })

    let body = new URLSearchParams()
    body.set('url', suburl)
    body.set('json_data', JSON.stringify(this.subscene_queryjson))
    return this.http.post(`${this.ServerIp}`, body, options).
      map(res => <SubsceneResults>res.json())
      .catch((error: any) => {
        return Observable.throw(new Error(error.status))
      })
  }


  downloadSubsceneSubs(suburl: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' })
    let options = new RequestOptions({
      headers: headers
    })

    let body = new URLSearchParams()
    body.set('url', suburl)
    body.set('json_data', JSON.stringify(this.subscene_download_json))
    return this.http.post(`${this.ServerIp}`, body, options).
      map(res => <SubsceneResults>res.json())
      .catch((error: any) => {
        return Observable.throw(new Error(error.status))
      })
  }

  searchTMDbQueryData(query_term: string, page: number): Observable<TMDbResponse> {
    return this.http.get(`${this.Tmdburl}&query=${query_term}&page=${page}`)
      .map(res => <TMDbResponse>res.json())
      .catch((error: any) => {
        return Observable.throw(new Error(error.status))
      })
  }








}
