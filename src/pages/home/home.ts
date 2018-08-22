import { Component} from '@angular/core';
import { IonicPage, NavController, PopoverController} from 'ionic-angular';
import { PopoverPage } from '../home/popover';
import { Storage } from "@ionic/storage";
import { SocialSharing } from '@ionic-native/social-sharing';


@IonicPage({
  segment: 'home/:type'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[SocialSharing],
  styles:[
    `.mypopover-content{
      box-shadow: 0 3px 0px 2px rgba(0, 0, 0, 0.3) !important;
      top: 52px !important;
      left: 70px !important;
      transform-origin: right top 0px !important;
      transform: scale(1) !important;
      width: 252px !important;
    
    }`
  ]
})



export class HomePage {
  
  selectedTheme: String;
  rootNavCtrl: NavController;
  page1: any = 'Page1Page';
  page2: any = 'Page2Page';
  page3: any = 'Page3Page';
  playstoreappurl:string="https://play.google.com/store/apps/details?id=com.project.yifybrowserandsubs";
  badgecount:any;
  bookmarkcount:any;
  domain:string='ytsam';


  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, 
    public localstorage: Storage,public socialSharing: SocialSharing) {
     
  }
  setBadgeCount(count: any): void {
    this.badgecount = count;
  }

  search(){
    this.navCtrl.push('SearchPage');    
  }
  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });

   
  }

  setBookMarkCount(count: any): void{
      this.bookmarkcount = count;
  }

  shareApp(){
     
        this.socialSharing.share(null,null,null,this.playstoreappurl).then((res) => {
          console.log("shared");
          this.localstorage.set('shared', 'Y');
    
        }).catch((e) => {
          this.localstorage.set('shared', 'N');
          this.localstorage.set('tried', 1);
        });
        
      }

  



}
