import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content,ToastController } from 'ionic-angular';
import { Response, Movies, ResponseData, Torrents } from '../../models/moviesjson';
import { YifyMoviesProvider } from '../../providers/yify-movies/yify-movies';
import { LazyLoadImageDirective } from 'ng-lazyload-image';
import {HomePage} from '../home/home';

@IonicPage()
@Component({
  selector: 'page-advance-search-results',
  templateUrl: 'advance-search-results.html',
  providers:[LazyLoadImageDirective,HomePage],
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
export class AdvanceSearchResultsPage {
  @ViewChild(Content) content: Content;
  querystring:string;
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
  youtube_ios='youtube://';
  isScrolled=false;
  offset = 100;
  darkui:boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private yifyprovider: YifyMoviesProvider,public toastCtrl:ToastController,public homepage :HomePage) {
    this.querystring = navParams.get('qstring');
    this.loadMovies(this.movielimit,this.moviepage,null,this.querystring);


  }

  loadMovies(limit: number, page: number, infiniteScroll: any,querystring:string) {
    
        try {
          if (!this.asyncCall) {
            if (this.movielist.length == 0) 
            this.asyncCall = true;
            this.yifyprovider.advancedSearchYifyMovies(limit, page,querystring).subscribe(res => {
              console.log(res);
              if (res.status == 'ok') {
                if(res.data.movies != undefined && res.data.movies != null){
                  if (this.movielist.length == 0) {
                    this.movielist = res.data.movies;
                    this.asyncCall = false;
                    if (infiniteScroll != null) infiniteScroll.complete();
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
                }else{
                  this.asyncCall = false;
                  if (infiniteScroll != null) {
                    infiniteScroll.complete();
                  }
                  
                  if(this.movielist.length > 0)
                  this.presentToast('No more movies found !!');
                  else
                  this.presentToast('No movies found releated to your queries.')
                }
               

              }
            },error =>{
              console.log(error);
              throw error;
    
            },
    
            )
          }
    
    
        } catch (error) {
          this.asyncCall = false;
          console.log(error);
          if (infiniteScroll != null) infiniteScroll.complete();
        }
    
      }

      presentToast(msg:string) {
        const toast = this.toastCtrl.create({
          message: msg,
          position: 'bottom',
          closeButtonText:'Ok',
          showCloseButton:false,
          duration:3000
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
      
        toast.present();
    }
      
    
      doInfinite(infiniteScroll) {
        console.log('Begin async operation');
    
        if (!this.asyncCall) {
          this.moviepage = this.moviepage + 1;
          this.loadMovies(this.movielimit, this.moviepage, infiniteScroll,this.querystring);
        } else {
          infiniteScroll.complete();
        }
    
      }
    
    
      openMoviePage(movie: Movies): void {
        this.navCtrl.push('MoviedetailsPage', { movie });
    
      }


  doRefresh(refresher) {
    this.moviepage = 1;
    this.movielist=[];
    refresher.complete();
    this.loadMovies(this.movielimit, this.moviepage, null,this.querystring);

  }


  scrollToTop(){
    this.isScrolled = false;
    this.content.scrollToTop(1000);
  }

  shareApp(){
    this.homepage.shareApp();
  }

  openSettings(){
    this.navCtrl.push('AppSettingsPage');
  }


    

}
