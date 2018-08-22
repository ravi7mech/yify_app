import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage,ToastController,Content } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Movies } from '../../models/moviesjson';
import { Storage } from "@ionic/storage";
import { LazyLoadImageDirective } from 'ng-lazyload-image';


@IonicPage()
@Component({
  selector: 'page-page3',
  templateUrl: 'page3.html',
  providers:[LazyLoadImageDirective],
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
export class Page3Page {
  @ViewChild(Content) content: Content;
  rootNavCtrl: NavController;
  movielist: Movies[] = [];
  badge: number = 0;
  color: string = 'primary';
  mode: string = 'determinate';
  value: number = 50;
  asyncCall: boolean = false;
  showText:boolean = false;
  defaultImage = 'https://i.imgur.com/DLkGimY.png';
  errorImage = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
  isScrolled = false;
  offset=1000;
  darkui:boolean = true;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private homepage: HomePage, private localstorage: Storage,
    public toastCtrl: ToastController) {
    this.rootNavCtrl = navParams.get('rootNavCtrl');
    this.loadMovies();
  }

  
  loadMovies() {

    try {
      if (!this.asyncCall) {
        this.asyncCall = true;


        this.localstorage.get('bookmarklist').then((value) => {
          if (value == undefined || value == null || value.length == 0) {
            this.asyncCall = false;
            this.showText = true;
          } else {
            let bmklist = <Array<Movies>>value;
            this.movielist = bmklist.reverse();
            this.asyncCall = false;
            this.showText = false;
            this.homepage.setBookMarkCount(this.movielist.length);


          }
        });
  }


    } catch (error) {

      console.log(error);

    }

  }



  shareApp(){
    this.homepage.shareApp();
  }

  scrollToTop(){
    this.isScrolled = false;
    this.content.scrollToTop(1000);
  }



  doRefresh(refresher) {

    this.movielist = [];
    refresher.complete();
    this.loadMovies();

  }


  openMoviePage(movie: Movies): void {
    this.rootNavCtrl.push('MoviedetailsPage', { movie });

  }

  presentToast(msg:string) {
    const toast = this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      closeButtonText:'Ok',
      showCloseButton:true
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
}


ionViewWillEnter() {
  this.loadMovies();
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
