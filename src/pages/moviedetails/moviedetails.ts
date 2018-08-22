import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Content } from 'ionic-angular';
import { Movies, Torrents, Response, Cast } from '../../models/moviesjson';
import { YifyMoviesProvider } from '../../providers/yify-movies/yify-movies';
import { Storage } from "@ionic/storage";
import { SocialSharing } from '@ionic-native/social-sharing';
import { LazyLoadImageDirective } from 'ng-lazyload-image';
import { HomePage } from '../home/home';
import { Clipboard } from '@ionic-native/clipboard';
import { MyApp } from '../../app/app.component';




@IonicPage()
@Component({
  selector: 'page-moviedetails',
  templateUrl: 'moviedetails.html',
  providers: [LazyLoadImageDirective, HomePage, Clipboard],
  styles: [`
  .ng-lazyloaded {
      animation: fadein .1s;
  }
  @keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }
  
`]
})

export class MoviedetailsPage {
  @ViewChild(Content) content: Content;
  movie: Movies;
  yt_code: string;
  description_full: string;
  movietitle: string;
  tileimage: string;
  runtime: number;
  genres: string;
  rating: number;
  date_uploaded_unix: number;
  mpa_rating: string;
  slug: string;
  imdb_code: string;
  imdb_url: string = 'https://m.imdb.com/title/';
  imdb_cast_url: string = 'https://m.imdb.com/name/nm';
  imdb_cast_url1: string = 'https://m.imdb.com/name/';
  torrents: Torrents[] = [];
  format: string;
  testRadioOpen = false;
  testRadioResult: any;
  large_screenshot: string;
  sub_sceneurl: string = 'https://subscene.com/subtitles/release?q=';
  yify_subtitle_url: string = 'http://www.yifysubtitles.com/movie-imdb/';
  title: string;
  year: number;
  moviedetailsonly: Response;
  asyncCall: boolean = false;
  castinglist: Cast[] = [];
  like_count: number;
  url: string;
  download_count: number;
  moreorless: string = "More";
  magnet_url: string = "magnet:?xt=urn:btih:TORRENT_HASH&dn=MNNAME&tr=http://track.one:1234/announce&tr=udp://track.two:80";
  bookmarkcolor: string;
  youtube_link: string = "https://www.youtube.com/watch?v=";
  errorAvtImage: string = "https://s.ynet.me/assets/images/actors/thumb/default_avatar.jpg";
  darkui: boolean = true;
  public position: string = 'bottom';
  public icon: string = 'more';
  public enableBackdropDismiss: boolean = false;
  public buttonColor: string = 'dark';
  imdb_review_url: string = 'https://m.imdb.com/title/####/reviews';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alert: AlertController,
    private yifyProvider: YifyMoviesProvider, private localstorage: Storage,
    public toastCtrl: ToastController, private socialSharing: SocialSharing,
    public homepage: HomePage, private clipboard: Clipboard, private myapp: MyApp) {
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

  public buttons = [
    {
      title: 'YTS',
      color: 'dark',
      handler: () => {
        this.openYts()
      }
    },
    {
      title: 'IMDB',
      color: 'dark',
      handler: () => {
        this.openimdb()
      }
    },
    {
      title: 'REVIEWS',
      color: 'dark',
      handler: () => {
        this.routetoReview()
      }
    },
    {
      title: 'SUBTITLES',
      color: 'dark',
      handler: () => {
        this.browsesubtitles()
      }
    },
    {
      icon: 'close',
      color: 'dark',
      handler: () => {
      }
    }
  ];

  ionViewWillEnter() {
    this.myapp.checkTorrentsAppAvailability();
  }


  routetoReview() {
    let url = this.imdb_review_url.replace("####", this.imdb_code);
    this.download(url);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MoviedetailsPage');
  }
  getGenreStringFromArray(genre: Array<string>): string {
    let genres = '';
    if (genre != undefined && genre.length > 0) {
      for (let i = 0; i < genre.length; i++) {
        genres += genre[i] + ' ';

      }

    }
    return genres;
  }

  loadMovieInfo(movie_id: number) {
    try {
      this.asyncCall = true;
      this.yifyProvider.loadYifyMovieDetails(movie_id).subscribe(res => {

        this.asyncCall = false;
        if (res.status == 'ok') {
          this.castinglist = (res.data.movie != undefined && res.data.movie != null) ? res.data.movie.cast : res.data.cast;
          this.download_count = (res.data.movie != undefined && res.data.movie != null) ? res.data.movie.download_count : res.data.download_count;
          this.description_full = (this.description_full == undefined) ? res.data.description_full : this.description_full;
          this.like_count = (res.data.movie != undefined && res.data.movie != null) ? res.data.movie.like_count : res.data.like_count;
          this.yt_code = (this.yt_code == undefined) ? res.data.yt_trailer_code : this.yt_code;
        }
      })
    } catch (e) {
      this.asyncCall = false;
      console.log(e);
    }





  }
  watchtrailer() {
    this.localstorage.get('hasytapp').then((value) => {
      if (value) {
        //this.youtube.openVideo(this.movie.yt_trailer_code);
        if (this.movie.yt_trailer_code != undefined) {
          this.download(this.youtube_link + this.movie.yt_trailer_code);
        }
        else if (this.yt_code != undefined) {
          this.download(this.youtube_link + this.yt_code);
        }

      } else {
        //this.youtube.openVideo(this.movie.yt_trailer_code);
        if (this.movie.yt_trailer_code != undefined) {
          this.download(this.youtube_link + this.movie.yt_trailer_code);
        }
        else if (this.yt_code != undefined) {
          this.download(this.youtube_link + this.yt_code);
        }
      }
    });




  }
  openimdb() {
    this.download(this.imdb_url + this.imdb_code);
  }

  presentConfirm(mgurl: string) {
    let alert = this.alert.create({
      title: 'No torrent downloader found !!',
      message: 'No torrent downloader installed in your device ! Are you wish to copy the magnet link in clip board !?',
      buttons: [
        {
          text: 'CANCEL',
          handler: () => {

          }
        },
        {
          text: 'COPY LINK',
          handler: () => {
            this.clipboard.copy(mgurl);
            this.presentToast('Copied!!');

          }
        }
      ]
    });
    alert.present();
  }


  getAvailableTorrentFormats(torrents: any, alert: any): any {
    for (var i = 0; i < torrents.length; i++) {
      let element = {
        type: 'radio',
        label: torrents[i].quality + ' / ' + torrents[i].size + ' (P/S : ' + torrents[i].peers + '/' + torrents[i].seeds + ')',
        value: torrents[i].url,
        checked: false
      }
      if (i == 0) {
        element.checked = true;
      }
      alert.addInput(element);
    }
    return alert;
  }

  getAvailableSubTitleSites(alert: any): any {

    let element = {
      type: 'radio',
      label: 'Yify Subtitles',
      value: 'Y'
    }

    alert.addInput(element);

    element = {
      type: 'radio',
      label: 'Subscene',
      value: 'S'
    }
    alert.addInput(element);

    return alert;
  }

  chooseTorrents() {
    let alert = this.alert.create();
    alert = this.getAvailableTorrentFormats(this.torrents, alert);
    alert.setTitle('Choose Formats');
    alert.addButton('Cancel');
    alert.setCssClass('my-alert');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('Radio data:', data);
        if (data != undefined && data != null) {
          this.testRadioOpen = false;
          this.testRadioResult = data;
          this.download(data);
        } else {

        }

      }
    });
    alert.present();
  }

  chooseMagnet() {
    this.myapp.checkTorrentsAppAvailability();
    let alert = this.alert.create();
    alert = this.getAvailableMagnetFormats(this.torrents, alert);
    alert.setTitle('Choose Formats');
    alert.addButton('Cancel');
    alert.setCssClass('my-alert');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('Radio data:', data);
        if (data != undefined && data != null) {
          this.testRadioOpen = false;
          this.testRadioResult = data;
          this.magnet_download(data);
        } else {

        }

      }
    });
    alert.present();

  }

  magnet_download(namedata: string) {
    let namearr = namedata.split("$#@$%");
    let mgurl = this.magnet_url.replace("TORRENT_HASH", namearr[1]);
    mgurl = mgurl.replace("MNNAME", encodeURIComponent(namearr[0]));
    this.localstorage.get('hastorapp').then((value) => {
      if (value) {
        window.open(mgurl, '_system', "location=yes");
      } else {
        this.presentConfirm(mgurl);


      }
    });


  }

  getAvailableMagnetFormats(torrents: any, alert: any): any {

    for (var i = 0; i < torrents.length; i++) {
      let element = {
        type: 'radio',
        label: torrents[i].quality + ' / ' + torrents[i].size + ' (P/S : ' + torrents[i].peers + '/' + torrents[i].seeds + ')',
        value: this.movietitle + "$#@$%" + torrents[i].hash,
        checked: false
      }

      if (i == 0) {
        element.checked = true;
      }
      alert.addInput(element);
    }
    return alert;
  }

  download(url: string) {
    window.open(url, '_system', "location=yes");
  }

  browsesubtitles() {

    let movie = this.title.replace(/[^\w\s]/gi, ".");
    let openurl = this.sub_sceneurl + movie + "." + this.year + ".720p.BluRay.x264&l=";
    let imdb = { imdbcode: this.imdb_code, suburl: openurl };
    const ANIMATION = { animate: true, direction: 'forward' };
    this.navCtrl.push('SubtitleTabsPage', { imdb }, ANIMATION);

  }

  openSubTitleSites(siteflag: String) {
    if (siteflag == 'Y') {
      let openurl = this.yify_subtitle_url + this.imdb_code;
      window.open(openurl, '_system', "location=yes");

    } else {


      let movie = this.title.replace(/[^\w\s]/gi, ".");
      let openurl = this.sub_sceneurl + movie + "." + this.year + ".720p.BluRay.x264&l=";
      window.open(openurl, '_system', "location=yes");

    }

  }


  scrollToTop() {
    this.content.scrollToTop(1000);
  }

  ScrollToBottom() {
    var element = document.getElementById("myLabel");
    setTimeout(() => { element.scrollIntoView(true) }, 100);
    if (this.moreorless == 'More') {
      this.moreorless = 'Less';
    } else {
      this.moreorless = 'More';
    }
  }

  viewcastImdb(imdbcode: string) {
    if (imdbcode != null && imdbcode.startsWith("nm")) {
      this.download(this.imdb_cast_url1 + imdbcode);
    } else {
      this.download(this.imdb_cast_url + imdbcode);
    }

  }

  openYts() {
    this.download(this.url);
  }

  errorHandler(event) {
    console.debug(event);
    event.target.src = "http://img.youtube.com/vi/" + this.yt_code + "/maxresdefault.jpg";
  }

  bookmarkMovie() {
    this.localstorage.get('bookmarklist').then((value) => {
      if (value == undefined || value == null || value.length == 0) {
        let bmklist = [];
        bmklist.push(this.movie);
        this.localstorage.set('bookmarklist', bmklist);
        this.bookmarkcolor = '#0045b9';
        this.presentToast('Added to Bookmark Successfully!!');

      } else {
        let bmklist = <Array<Movies>>value;
        if (this.havingtheMovieId(bmklist)) {
          this.removeFromBookmark(this.imdb_code, bmklist);
        } else {
          this.addToBookmark(bmklist);
        }
      }
    });


  }

  havingtheMovieId(bmklist: Array<Movies>): boolean {

    for (var i = 0; i < bmklist.length; i++) {
      if (bmklist[i].imdb_code == this.imdb_code)
        return true;
    }
    return false;
  }

  removeFromBookmark(imdb_code: string, bmklist: Array<Movies>) {
    for (var i = 0; i < bmklist.length; i++) {
      if (bmklist[i].imdb_code == this.imdb_code)
        bmklist.splice(i, 1);
    }
    this.localstorage.set('bookmarklist', bmklist);
    this.bookmarkcolor = '#a9a9a9';
    this.presentToast('Removed from Bookmark Successfully !!');

  }

  addToBookmark(bmklist: Array<Movies>) {
    bmklist.push(this.movie);
    this.localstorage.set('bookmarklist', bmklist);
    this.bookmarkcolor = '#0045b9';
    this.presentToast('Added to Bookmark Successfully !!');

  }

  presentToast(msg: string) {
    const toast = this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      closeButtonText: 'Ok',
      showCloseButton: false,
      duration: 3000
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  bookMarkListContains(imdb_code: string) {

    this.localstorage.get('bookmarklist').then((value) => {
      if (value == undefined || value == null || value.length == 0) {
        this.bookmarkcolor = '#a9a9a9';
      } else {
        let bmklist = <Array<Movies>>value;
        this.bookmarkcolor = (this.havingtheMovieId(bmklist)) ? '#0045b9' : '#a9a9a9';
      }
    });

  }



  shareTorrent() {
    let alert = this.alert.create();
    alert = this.getAvailableTorrentFormats(this.torrents, alert);
    alert.setTitle('Choose Formats');
    alert.addButton('Cancel');
    alert.setCssClass('my-alert');
    alert.addButton({
      text: 'Share',
      handler: (data: any) => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.socialShare(data);
      }
    });
    alert.present();
  }

  socialShare(data) {

    let message = this.movie.title_long;
    let subject = this.getSubjectContent(data);
    let file = [this.movie.large_cover_image];
    let url = data;
    this.socialSharing.share(subject, message, file, url).then((res) => {
      console.log(res);
      console.log("shared");
    }).catch((e) => {
      console.log(e);
    });



  }

  getSubjectContent(data): string {
    let content = '';

    for (var i = 0; i < this.torrents.length; i++) {
      if (this.torrents[i].url == data) {
        content += "Download " + this.movie.title_long + ' ' + this.torrents[i].quality + ' / ' +
          this.torrents[i].size + ' (P/S : ' + this.torrents[i].peers + '/' + this.torrents[i].seeds + ')' +
          ' by clicking the below torrent link.';
      }

    }

    return content;
  }


  shareApp() {
    this.homepage.shareApp();
  }


  openSettings() {
    this.navCtrl.push('AppSettingsPage');
  }



}
