import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import {MyApp} from '../../app/app.component';
import { YifyMoviesProvider } from '../../providers/yify-movies/yify-movies';

@IonicPage()
@Component({
  selector: 'page-app-settings',
  templateUrl: 'app-settings.html'
})
export class AppSettingsPage {
  public mode:string;
  public domain:string;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private localstorage: Storage,public toastCtrl: ToastController,public myapp:MyApp,
      public yifyprovider :YifyMoviesProvider) {
    this.checkAppThemeMode()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppSettingsPage')
  }
  showMode(){
    this.localstorage.set("mode",this.mode)
    this.presentToast("Configured!!")
    this.setModeTheme(this.mode)
  }

  setModeTheme(mode:string){
    if(mode == "on"){
      this.myapp.selectedTheme = 'dark-theme'
      this.myapp.setStatusBarColor('#060a1f')
    }else if(mode =="off"){
      this.myapp.selectedTheme = 'light-theme'
      this.myapp.setStatusBarColor('#3F51B5')
    }else if(mode =="auto"){
      let d = new Date();
      if(d.getHours() >= 18 || (6 >= d.getHours())){
        this.myapp.selectedTheme = 'dark-theme'
        this.myapp.setStatusBarColor('#060a1f')
      }else{
        this.myapp.selectedTheme = 'light-theme'
        this.myapp.setStatusBarColor('#3F51B5')
      }
    }
    
  }

  useAm(){
    this.yifyprovider.Url = 'https://yts.unblocked.lat/api/v2'
  }

  useMe(){
    this.yifyprovider.Url = 'https://yts.me/api/v2'
  }

  checkAppThemeMode(){
    this.localstorage.get("mode").then(res=>{
      if(res == null || res == undefined || res == ''){
        this.mode = "off"
      }else{
        this.mode = res
      }
      this.setModeTheme(this.mode)
    })

    if(this.yifyprovider.Url.includes('yts.unblocked.lat')){
      this.domain = 'yts.unblocked.lat'
    }else{
      this.domain = 'yts.me'
    }
  }

  getYifydomain(){
    if(this.yifyprovider.Url.includes('yts.unblocked.lat')){
      this.domain = 'yts.unblocked.lat'
    }else{
      this.domain = 'yts.me'
    }

    return this.domain;
  }
  

  presentToast(msg:string) {
    const toast = this.toastCtrl.create({
      message:msg,
      position: 'bottom',
      closeButtonText:'Ok',
      showCloseButton:false,
      duration:2000
    })
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast')
    })
  
    toast.present()
}
}
