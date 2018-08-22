import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage,Content } from 'ionic-angular';
import { YifyMoviesProvider } from '../../providers/yify-movies/yify-movies';
import { Response, Movies, ResponseData, Torrents } from '../../models/moviesjson';
import { LazyLoadImageDirective } from 'ng-lazyload-image';
import { HomePage } from '../home/home';
import { Toast } from '@ionic-native/toast';






@IonicPage()
@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html',
  providers:[LazyLoadImageDirective,Toast],
  styles: [`
  .ng-lazyloaded {
      animation: fadein .5s;
  }
  @keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }
  
`]
})
export class Page2Page {
  @ViewChild(Content) content: Content;
  rootNavCtrl: NavController;
  movielimit: number = 50;
  moviepage: number = 1;
  response: Response;
  resdata: ResponseData;
  movielist: Movies[] = [];
  torrents: Torrents;
  viewmovie: Movies;
  badge: number = 0;
  color: string = 'primary';
  mode: string = 'determinate';
  value: number = 50;
  asyncCall: boolean = false;
  defaultImage = 'https://i.imgur.com/DLkGimY.png';
  errorImage = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
  isScrolled = false;
  offset=800;
  darkui:boolean = true;
  sitecount:number=-1;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private yifyprovider: YifyMoviesProvider,public homepage :HomePage,public toast:Toast) {
    this.rootNavCtrl = navParams.get('rootNavCtrl');
      this.sitecount++;
    this.loadMovies(this.movielimit, this.moviepage, null);
  }

  loadMovies(limit: number, page: number, infiniteScroll: any) {

    try {
      if (!this.asyncCall) {
        if (this.movielist.length == 0) 
        this.asyncCall = true;
        this.yifyprovider.loadYifyTopRatedMovies(limit, page,this.sitecount).subscribe(res => {
          console.log(res);
          if (res.status == 'ok') {
            if (this.movielist.length == 0) {
              this.yifyprovider.setUrl(this.sitecount);
              this.movielist = res.data.movies;
              this.asyncCall = false;
              if (infiniteScroll != null) infiniteScroll.complete();
              this.moviepage = this.moviepage + 1;
              this.loadMovies(this.movielimit, this.moviepage, null);
            }
            else {
              let list = res.data.movies;
              for (let i = 0; i < list.length; i++) {
                this.movielist.push(list[i]);
              }
              this.asyncCall = false;
              if (infiniteScroll != null) {
                infiniteScroll.complete();
              }
            }
          }
        },error =>{
          this.asyncCall=false;
          if (this.sitecount < this.yifyprovider.yifysites.length) {
            this.sitecount++
            this.loadMovies(this.movielimit, this.moviepage, null);
          } else {
            this.toast.show(`Server issue please try again later!`, '5000', 'bottom').subscribe(
              toast => {
                console.log(toast);
              })
          }
          throw error;

        })
      }


    } catch (error) {
      if (infiniteScroll != null) infiniteScroll.complete();
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
    this.viewmovie = movie;
    this.rootNavCtrl.push('MoviedetailsPage', { movie });

  }


  doRefresh(refresher) {
    this.moviepage = 1;
    this.movielist=[];
    refresher.complete();
    this.loadMovies(this.movielimit, this.moviepage, null);

  }


  scrollToTop(){
    this.isScrolled = false;
    this.content.scrollToTop(1000);
  }

  shareApp(){
    this.homepage.shareApp();
  }


ngAfterViewInit() {
  this.content.ionScroll.subscribe((data)=>{
   if(data != null && data != undefined && data.scrollTop == 0){
    this.isScrolled = false;
   }else{
     if(data == null || data == undefined)
     this.isScrolled = false;
     else
     this.isScrolled = true;

   }
  });
}


openSettings(){
  this.rootNavCtrl.push('AppSettingsPage');
}








}
