import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Content, Platform, ToastController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { YifyMoviesProvider } from '../../providers/yify-movies/yify-movies';
import { Response, Movies, ResponseData, Torrents } from '../../models/moviesjson';
import { HomePage } from '../home/home';
import { LazyLoadImageDirective } from 'ng-lazyload-image';
import { AppAvailability } from '@ionic-native/app-availability';
import { AlertController } from 'ionic-angular';
import { Page2Page } from '../../pages/page2/page2';
import { MyApp } from '../../app/app.component';
import { SettingsProvider } from '../../providers/settings/settings';
import { Toast } from '@ionic-native/toast';
@IonicPage()
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers: [SettingsProvider, LazyLoadImageDirective, AppAvailability, Page2Page, Toast],
  styles: [`
  .ng-lazyloaded {
      animation: fadein .3s;
  }
  @keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }
`]
})
export class Page1Page {
  @ViewChild(Content) content: Content;
  yifyappsub: string = 'Browser for YIFY';
  yifyappmes: string = 'Download YIFY Torrent Browser (YTS) App from playstore to download high quality 720p,1080p,3D movies !!';
  yifyiconurl: string = 'https://i.imgur.com/MvPgeiT.png';
  rootNavCtrl: NavController;
  movielimit: number = 50;
  moviepage: number = 1;
  response: Response;
  resdata: ResponseData;
  movielist: Movies[] = [];
  torrents: Torrents;
  badge: number = 0;
  color: string = 'primary';
  mode: string = 'determinate';
  value: number = 50;
  asyncCall: boolean = false;
  defaultImage = 'https://i.imgur.com/DLkGimY.png';
  errorImage = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
  youtube_android = 'com.google.android.youtube';
  youtube_ios = 'youtube://';
  isScrolled = false;
  offset = 100;
  selectedTheme: String;
  sitecount: number = -1;
  public position: string = 'bottom';
  public icon: string = 'more';
  public enableBackdropDismiss: boolean = true;
  public buttonColor: string = 'dark';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private yifyprovider: YifyMoviesProvider,
    private localstorage: Storage,
    private homepage: HomePage,
    private platform: Platform,
    private appAvailability: AppAvailability,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController, private page2page: Page2Page,
    public myapp: MyApp, public settings: SettingsProvider, private toast: Toast) {
    this.rootNavCtrl = navParams.get('rootNavCtrl');
    this.sitecount++
    this.loadMovies(this.movielimit, this.moviepage, null);
    this.checkApps();
    this.isUpdateAvailable();
    platform.ready().then(() => {
    })
  }
  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }
  isUpdateAvailable() {
  }
  setTheme(theme: any) {
    this.selectedTheme = theme;
  }
  ngAfterViewInit() {
    this.content.ionScroll.subscribe((data) => {
      if (data != null && data != undefined && data.scrollTop == 0) {
        this.isScrolled = false;
      } else {
        if (data == null || data == undefined)
          this.isScrolled = false;
        else
          this.isScrolled = true;
      }
    });
  }
  checkApps(): void {
    let app:string;
    if (this.platform.is('ios')) {
      app = this.youtube_ios;
    } else if (this.platform.is('android')) {
      app = this.youtube_android;
    }
    this.appAvailability.check(app)
      .then(
        (yes) => this.localstorage.set('hasytapp', true),
        (no) => this.localstorage.set('hasytapp', false)
      );
  }
  loadMovies(limit: number, page: number, infiniteScroll: any) {
    try {
      if (!this.asyncCall) {
        if (this.movielist.length == 0)
          this.asyncCall = true;
        this.yifyprovider.loadYifyMovies(limit, page, this.sitecount).subscribe(res => {
          console.log(res);
          if (res.status == 'ok') {
            if (this.movielist.length == 0) {
              this.yifyprovider.setUrl(this.sitecount);
              this.showBadgeCount(res.data.movie_count);
              this.movielist = res.data.movies;
              this.asyncCall = false;
              if (infiniteScroll) infiniteScroll.complete();
              this.moviepage = this.moviepage + 1;
              this.loadMovies(this.movielimit, this.moviepage, null);
            }
            else {
             this.movielist = [...this.movielist,...res.data.movies];
              this.asyncCall = false;
              if (infiniteScroll) infiniteScroll.complete();             
            }
          }
        }, error => {
          this.asyncCall = false;
          if (this.sitecount < this.yifyprovider.yifysites.length) {
            this.sitecount++;
            this.loadMovies(this.movielimit, this.moviepage, null);
          } else {
            this.toast.show(`Server issue please try again later!`, '10000', 'bottom').subscribe(
              toast => {
                console.log(toast);
              })
          }
          throw error;
        })
      }
    } catch (error) {
      if (infiniteScroll) infiniteScroll.complete();
    }
  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    if (!this.asyncCall) {
      this.moviepage = this.moviepage + 1;
      this.loadMovies(this.movielimit, this.moviepage, infiniteScroll);
    } else {
      infiniteScroll.complete();
    }
  }
  openMoviePage(movie: Movies): void {
    this.rootNavCtrl.push('MoviedetailsPage', { movie });
  }
  showBadgeCount(badgecount: number): void {
    this.localstorage.get('badgecount').then((value) => {
      if (value == undefined || value == null) {
        this.localstorage.set('badgecount', badgecount);
        this.homepage.setBadgeCount('');
      } else {
        let badge = (badgecount - value > 0) ? badgecount - value : '';
        this.localstorage.set('badgecount', badgecount);
        this.homepage.setBadgeCount(badge);
      }
    });
  }
  doRefresh(refresher) {
    this.moviepage = 1;
    this.movielist = [];
    refresher.complete();
    this.loadMovies(this.movielimit, this.moviepage, null);
  }
  openSettings() {
    this.rootNavCtrl.push('AppSettingsPage');
  }
  scrollToTop() {
    this.isScrolled = false;
    this.content.scrollToTop(1000);
  }
  shareApp() {
    if (this.myapp.selectedTheme === 'dark-theme') {
      this.myapp.selectedTheme = 'light-theme';
    } else {
      this.myapp.selectedTheme = 'dark-theme';
    }
  }
}
