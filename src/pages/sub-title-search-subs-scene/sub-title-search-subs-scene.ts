

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,AlertController } from 'ionic-angular';
import { Response, SubsceneResults,SubsceneSubtitlesLinks} from '../../models/moviesjson';
import { YifyMoviesProvider } from '../../providers/yify-movies/yify-movies';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Clipboard } from '@ionic-native/clipboard';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage } from "@ionic/storage";
import { Diagnostic } from '@ionic-native/diagnostic';


@IonicPage()
@Component({
  selector: 'page-sub-title-search-subs-scene',
  templateUrl: 'sub-title-search-subs-scene.html',
  providers: [YifyMoviesProvider, FileTransfer, File, Clipboard,Diagnostic],
  styles: [
    `ion-badge {
      padding: 8px 11px;
      text-align: center;
      display: inline-block;
      min-width: 10px;
      font-size: 1.3rem;
      font-weight: bold;
      line-height: 1;
      white-space: nowrap;
      vertical-align: baseline;
  }`
  ]

})
export class SubTitleSearchSubsScenePage {
  suburl: string;
  asynccall: boolean;
  msg: boolean;
  fileTransfer: FileTransferObject;
  subtitelist:SubsceneResults;
  sublist:Array<SubsceneSubtitlesLinks> = [];
  url:string;
  filename:string;
  showheader:boolean = false;
  params:any = {showheader:false};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private yifyProvider: YifyMoviesProvider, private transfer: FileTransfer, private file: File
    , public toastCtrl: ToastController, private clipboard: Clipboard, private socialSharing: SocialSharing,
    private localstorage: Storage,
    public alert :AlertController,private diagnostic: Diagnostic) {
    this.fileTransfer = this.transfer.create();
    this.params = navParams.get('params');
    if(this.params != null && this.params != undefined)
    this.showheader = this.params.showheader;
    this.localstorage.get('suburl').then((value) => {
       this.suburl = value;
        this.loadSubtitle();
       
    });
   
  }

  loadSubtitle() {
    try {
      this.asynccall = true;
       this.yifyProvider.getSubSceneSubTitles(this.suburl).subscribe(res => {
       this.subtitelist = res;
       if(this.subtitelist.langs_names.length > 0){
        var j = 0;
        for (let i = 0; i < this.subtitelist.langs_names.length; i++) {
          if(i%2 === 0){
            this.subtitelist.down_links[j].lang = this.subtitelist.langs_names[i].lang_name;
          }else{
            this.subtitelist.down_links[j].name = this.subtitelist.langs_names[i].lang_name;
            j++;
          }
        }
        this.asynccall = false;
        this.sublist = this.subtitelist.down_links;


       }else{
        this.asynccall = false;
        this.msg = true;
       }      

      }) 
      
    } catch (e) {
      console.log(e);
      this.asynccall = false;
      this.msg = true;
    }
  }

  handleSubDownload(index:number){
    this.sublist[index].downstart = true;
      this.yifyProvider.downloadSubsceneSubs(this.url).subscribe(res => {
        this.fileTransfer.download('https://subscene.com' + res.downlink[0].link, this.file.externalRootDirectory+'YIFY_Torrent_Browser/' + this.filename).then((entry) => {
          this.sublist[index].downstart = false;
          this.sublist[index].downcomplete = true;
          this.presentToast("File saved in : "+this.file.externalRootDirectory.replace('file:///','')+"YIFY_Torrent_Browser/"+this.filename);
        }, (error) => {
         this.showOpenSettingsAlert()
        })

       })  
    
  }

  showOpenSettingsAlert(){
    let alert = this.alert.create({
      title: 'Permission needed!',
      message: 'This permission is needed to save the downloaded subtitle to disk!',
      buttons: [
        {
          text: 'OPEN SETTINGS',
          handler: () => {
            this.diagnostic.switchToSettings();
          }
        }
      ]
    });
    alert.present();
  }

  downloadfile(file: SubsceneSubtitlesLinks,index:number) {
    this.url = 'https://subscene.com'+file.link;
    this.filename = file.name+'.zip';   
    this.diagnostic.isExternalStorageAuthorized().then(res =>{
      if(res) this.handleSubDownload(index)
      else this.requestExternalStorageAuthorization(index)
    })
  }

  requestExternalStorageAuthorization(index:number){
    this.diagnostic.requestExternalStorageAuthorization().then(res =>{
      console.log("requestExternalStorageAuthorization ",res)
      if(res) this.handleSubDownload(index)
      else this.showOpenSettingsAlert()
    },err => {
      this.showOpenSettingsAlert()
    })
  }

 
  presentToast(msg: string) {
    const toast = this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      closeButtonText: 'OK',
      showCloseButton: true
    })

    toast.onDidDismiss(() => {
      // this.showBanner()
    })

    toast.present()
  }

}

