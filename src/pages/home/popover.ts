import {Component} from '@angular/core';
import {ViewController,NavController} from 'ionic-angular';
import {HomePage} from './home';
import { EmailComposer } from '@ionic-native/email-composer';



@Component({
 
    template: `
      <ion-list no-lines style="margin: 0px 0 0px;">
        <button ion-item (click)="shareApp()"><i class="fa fa-share-alt" aria-hidden="true"></i> <span style="padding-left: 15px;">Share</span></button>
       
      </ion-list>
    `,
    providers:[HomePage,EmailComposer]
  })
  export class PopoverPage {
    rootNavCtrl: NavController;
    email = {
      app: 'gmail',
      to: 'storm7breaker@gmail.com',
      subject: 'Feedback',
      body: 'Attach some screenshots or type the details of the issue you are facing and send it...!!!',
      isHtml: true
    };
  

    constructor(public viewCtrl: ViewController,private homepage:HomePage,
      public navCtrl: NavController,  private emailComposer: EmailComposer) {

    }
  
    close() {
      this.viewCtrl.dismiss();
    }

    search(){
      this.navCtrl.push('SearchPage');
     // this.viewCtrl.dismiss();
      
    }

    report(){
      this.emailComposer.addAlias('gmail', 'com.google.android.gm');
      this.emailComposer.open(this.email);
    }

    shareApp(){
      this.homepage.shareApp();
    }


  }