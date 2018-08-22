import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,Searchbar,AlertController } from 'ionic-angular';
import { YifyMoviesProvider } from '../../providers/yify-movies/yify-movies';
import { Movies } from '../../models/moviesjson';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { LazyLoadImageDirective } from 'ng-lazyload-image';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
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
export class SearchPage {
  @ViewChild('searchbar') searchbar:Searchbar;
  movielist: Movies[] = [];
  asyncCall: boolean = false;
  shouldShowCancel: boolean = true;
  cancelButtonText: string = 'Cancel';
  animated: boolean = true;
  options: any = {language : "en-US",matches: 5, prompt: "Speak now !!!", showPopup: "true"};
  hasMicAccess:boolean = false;
  hasRecognitionAvailable:boolean = false;
  textinput:string="";
  showText:boolean=false;
  defaultImage = 'https://i.imgur.com/DLkGimY.png';
  darkui:boolean = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private yifyprovider: YifyMoviesProvider,
    public speechRecognition: SpeechRecognition,
    public toastCtrl: ToastController,public homepage:HomePage,
    public alertcontroller :AlertController) {
      this.isRecognitionAvailable();

  }

  presentToast(msg:string) {
    const toast = this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      closeButtonText:'Ok',
      showCloseButton:true,
      duration:4000
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
}
  

  startListening() {
    this.speechRecognition.startListening(this.options)
      .subscribe(
      (matches: Array<string>) =>{
        console.log(matches);
        this.textinput = matches[0];
        this.getItems(this.textinput);
      } ,
      (onerror) => {
        console.log('error:', onerror);
      }
      )

  }


  presentConfirm() {
    this.requestPermission();
  }


 

retryVoiceMessage(msg:string) {
  const toast = this.toastCtrl.create({
    message: msg,
    position: 'bottom',
    closeButtonText:'Ok',
    showCloseButton:false,
    duration:3000
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
    this.startListening();
  });

  toast.present();
}



  listenmic() {

    if(this.hasMicAccess){
      this.startListening();
    }else
    {
      this.presentConfirm();
    }
  }
    

  getSupportedLanguages() {
    this.speechRecognition.getSupportedLanguages()
      .then(
      (languages: Array<string>) => console.log(languages),
      (error) => console.log(error)
      )
  }


  hasPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean)=>{
        if(!hasPermission){
          this.hasMicAccess = false;
        
        }else{
          this.hasMicAccess = true;
        }
      })
  }

  requestPermission() {
    this.speechRecognition.requestPermission()
      .then(
      () => {
        this.hasMicAccess = true;
        this.startListening();

      },
      () => {
        this.hasMicAccess= false;
      }
      )

  }

  isRecognitionAvailable() {
    this.speechRecognition.isRecognitionAvailable()
      .then((available: boolean) => {
        if(available){
          this.hasRecognitionAvailable = true;
           this.hasPermission();
        }else{
          this.hasRecognitionAvailable = false;
        }
      })
  }




  getItems(val:any) {
   
   this.showText = false;
    if (val && val.trim() != '') {
      this.asyncCall = true;
      this.yifyprovider.searchYifyMovies(val).subscribe(res => {
        this.asyncCall = false;
       
        if (res.status == 'ok') {
          this.movielist = res.data.movies;
          this.searchbar.setFocus();
        }
        if(res.data.movie_count == 0)
        this.showText = true;
        else
        this.showText = false;

      });
    } else {
      this.movielist = [];
      this.showText = false;
    }
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }


  openMoviePage(movie: Movies): void {
    this.navCtrl.push('MoviedetailsPage', { movie });

  }

  shareApp(){
    this.homepage.shareApp();
  }


  openSettings(){
    this.navCtrl.push('AppSettingsPage');
  }


}
