import { Component,ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-advanced-search',
  templateUrl: 'advanced-search.html',
  providers:[HomePage],
  encapsulation: ViewEncapsulation.None,
  styles:[`
  ion-searchbar {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
    left: 0%;
}


  `]
})
export class AdvancedSearchPage {
  public genre:string;
  public quality:string;
  public minimum_rating:string;
  public sort_by : string;
  public order_by:string;
  public moviename:string;
  shouldShowCancel: boolean = true;
  cancelButtonText: string = 'Cancel';
  animated: boolean = true;
  options: any = {language : "en-US",matches: 5, prompt: "Speak now !!!", showPopup: "true"};
  hasMicAccess:boolean = false;
  hasRecognitionAvailable:boolean = false;
  darkui:boolean=true;
  


  constructor(public navCtrl: NavController, 
    public speechRecognition: SpeechRecognition, 
    public navParams: NavParams,public homepage : HomePage,public alertcontroller:AlertController) {
    this.isRecognitionAvailable();
  }

  advancedSearch(){
    
    let qstring = this.getQueryStringForAdvancedSearch();
    this.navCtrl.push('AdvanceSearchResultsPage', { qstring });

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



  getQueryStringForAdvancedSearch(){
        let qstring = '';
       
        if(this.genre != undefined && this.genre != null && this.genre !=''){
          qstring = qstring.concat('genre='+this.genre)
          qstring = qstring.concat('&')
        }
        if(this.quality != undefined && this.quality != null && this.quality !=''){
          qstring = qstring.concat('quality='+this.quality)
          qstring = qstring.concat('&')
        }
        if(this.minimum_rating != undefined && this.minimum_rating != null && this.minimum_rating !=''){
          qstring = qstring.concat('minimum_rating='+this.minimum_rating)
          qstring.concat('&')
        }
        if(this.sort_by != undefined && this.sort_by != null && this.sort_by !=''){
          qstring = qstring.concat('sort_by='+this.sort_by)
          qstring = qstring.concat('&')
        }
        if(this.order_by != undefined && this.order_by != null && this.order_by !=''){
          qstring = qstring.concat('order_by='+this.order_by)
          qstring = qstring.concat('&')
        }
        if(this.moviename != undefined && this.moviename != null && this.moviename !=''){
          qstring = qstring.concat('query_term='+this.moviename)
          qstring = qstring.concat('&')
        }

        if (qstring != '' && qstring.charAt(qstring.length - 1) == '&') {
          qstring = qstring.substr(0, qstring.length - 1);
        }
        
        return qstring;

    }


  getItems(val:string){
    console.log(this.moviename);
     if (val && val.trim() != '') {

     } else {

     }
  }

  listenmic() {
    
        if(this.hasMicAccess){
          this.startListening();
        }else
        {
          this.presentConfirm();
        }
      }


      presentConfirm() {

        this.requestPermission();
      }

  startListening() {
    this.speechRecognition.startListening(this.options)
      .subscribe(
      (matches: Array<string>) =>{
        console.log(matches);
        this.moviename = matches[0];

      } ,
      (onerror) => {
        console.log('error:', onerror);
      }
      )

  }

  shareApp(){
    this.homepage.shareApp();
  }

  openSettings(){
    this.navCtrl.push('AppSettingsPage');
  }

  

}
