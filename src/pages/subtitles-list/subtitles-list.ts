import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController , AlertController} from 'ionic-angular';
import { Response, YifySubtitleResultJson, SubNames, FinalYifySubList } from '../../models/moviesjson';
import { YifyMoviesProvider } from '../../providers/yify-movies/yify-movies';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Clipboard } from '@ionic-native/clipboard';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Diagnostic } from '@ionic-native/diagnostic';
import { SubtitleTabsPage } from '../subtitle-tabs/subtitle-tabs';
import index from 'ng-lazyload-image';


@IonicPage()
@Component({
  selector: 'page-subtitles-list',
  templateUrl: 'subtitles-list.html',
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
export class SubtitlesListPage {
  imdb_code: string;
  asynccall: boolean;
  msg: boolean;
  fileTransfer: FileTransferObject;
  yifyresult: YifySubtitleResultJson;
  filteredsubnames: Array<SubNames> = [];
  sublist: Array<FinalYifySubList> = [];
  url:string;
  filename:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private yifyProvider: YifyMoviesProvider, private transfer: FileTransfer, private file: File
    , public toastCtrl: ToastController, private clipboard: Clipboard, private socialSharing: SocialSharing,
   public subtabs:SubtitleTabsPage
    ,public alert :AlertController,private diagnostic: Diagnostic) {
   this.imdb_code = subtabs.imdb_code;
   this.fileTransfer = this.transfer.create();;
   this.loadSubtitle();

  }

  /* showBanner() {

    let interaddConfig: AdMobFreeBannerConfig = {
      autoShow: true,
      id: 'ca-app-pub-8173350460907694/2714806253'

    };

    this.admob.interstitial.config(interaddConfig);
    this.admob.interstitial.prepare();
    this.admob.interstitial.show();

  } */

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

  


  loadSubtitle() {
    try {
      this.asynccall = true;
      this.yifyProvider.getYifySUbTitles(this.imdb_code).subscribe(res => {
        this.yifyresult = res;
        console.log(this.yifyresult);
        if (this.yifyresult.lang_list.length > 0) {
          for (let i = 0; i < this.yifyresult.sub_names.length; i++) {
            if (this.yifyresult.sub_names[i].subname.includes('subtitle')) {
              let subname = { subname: this.yifyresult.sub_names[i].subname.substring(9, this.yifyresult.sub_names[i].subname.length) };
              this.filteredsubnames.push(subname);
            };
          }

          for (let i = 0; i < this.yifyresult.rating_list.length; i++) {
            let subobj = {
              lang: this.yifyresult.lang_list[i].lang,
              link: 'https://www.yifysubtitles.com' + this.yifyresult.sub_links[i].download_link.replace('subtitles', 'subtitle') + '.zip',
              rating: this.yifyresult.rating_list[i].rating,
              name: this.filteredsubnames[i].subname,
              downstart:false,
              downcomplete:false
            }
            this.sublist.push(subobj);

          }
          this.asynccall = false;


        } else {
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
      this.fileTransfer.download(this.url, this.file.externalRootDirectory+'YIFY_Torrent_Browser/' + this.filename).then((entry) => {
        this.sublist[index].downstart = false;
        this.sublist[index].downcomplete = true;
        this.presentToast("File saved in : "+this.file.externalRootDirectory.replace('file:///','')+"YIFY_Torrent_Browser/"+this.filename);
      },error =>{
        this.showOpenSettingsAlert()
      });
    
  }

  downloadfile(file: FinalYifySubList,index:number) {
    this.url = file.link;
    this.filename = this.url.split("/").pop();
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

  copylink(file: FinalYifySubList) {
    this.clipboard.copy(file.link);
    this.presentToast('Copied!!');
   
  }

  sharelink(file: FinalYifySubList) {
    let message = file.link;
    this.socialSharing.share(null, null, null, message).then((res) => {
      // this.showBanner();
    }).catch((e) => {
      console.log(e);
    });
  }

  presentToast(msg: string) {
    const toast = this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      closeButtonText: 'OK',
      showCloseButton: true
    })

    toast.onDidDismiss(() => {
      // this.showBanner();
    })

    toast.present()
  }

}
