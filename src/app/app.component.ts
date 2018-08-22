import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from "@ionic/storage";
import { SplashScreen } from '@ionic-native/splash-screen';
import { EmailComposer } from '@ionic-native/email-composer';
import { Device } from '@ionic-native/device';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AppRate } from '@ionic-native/app-rate';
import { AppAvailability } from '@ionic-native/app-availability';
import { SettingsProvider } from './../providers/settings/settings';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';
import { Toast } from '@ionic-native/toast';
import { Market } from '@ionic-native/market';
import { Network } from '@ionic-native/network';


const updateUrl = 'https://s3.us-east-2.amazonaws.com/yifyupdateconfig/update.xml';

@Component({
  templateUrl: 'app.html',
  providers: [SettingsProvider, EmailComposer, Device, SocialSharing, AppRate, AppAvailability, Push,
    FirebaseAnalytics, Toast, Market, Network]
})
export class MyApp {
  isPurchased: boolean = false;
  @ViewChild(Nav) nav: Nav;
  selectedTheme: String;
  platform: Platform;
  stb: StatusBar;
  rootPage: any;
  rootParams: any;
  backButtonPressedOnceToExit: boolean = false;
  playstoreappurl: string = "https://play.google.com/store/apps/details?id=com.project.yifybrowserandsubs";
  torrentapps: Array<String> = ['com.utorrent.client', 'com.mobilityflow.torrent', 'com.bittorrent.client',
    'com.napolovd.piratecat', 'com.delphicoder.flud', 'com.frostwire.android', 'com.gabordemko.torrnado',
    'org.transdroid.lite', 'com.vuze.torrent.downloader', 'com.teeonsoft.ztorrent', 'com.bittorrent.client.pro'];
  version: string = 'v1.0.0';


  email = {
    app: 'gmail',
    to: 'phoenixcoders777@gmail.com',
    subject: 'Feedback',
    body: 'Attach some screenshots or type the details of the issue you are facing and send it...!!!',
    isHtml: true
  };

  menuItems: any[] = [
    {
      name: 'Home',
      page: 'HomePage',
      faclass: 'fa fa-home fa-lg',
      params: { type: 'all' }
    },
    {
      name: 'Subtitles',
      page: 'SubtitleSearchPage',
      faclass: 'fa fa-file-archive-o fa-lg'
    },
    {
      name: 'Advanced Search',
      page: 'AdvancedSearchPage',
      faclass: 'fa fa-search-plus fa-lg'
    },
    {
      name: 'Share',
      page: 'SharePage',
      faclass: 'fa fa-share-alt fa-lg'
    },
    {
      name: 'Settings',
      page: 'AppSettingsPage',
      faclass: 'fa fa-cog fa-lg'
    },
    {
      name: 'Rate Us',
      page: 'RateUs',
      faclass: 'fa fa-star fa-lg'
    },

    {
      name: 'Privacy Policy',
      page: 'PrivacyPolicy',
      faclass: 'fa fa-file-text fa-lg'
    },

    {
      name: 'About',
      page: 'AboutPage',
      faclass: 'fa fa-info-circle fa-lg'
    }
  ];

  constructor(platform: Platform, splashScreen: SplashScreen, statusBar: StatusBar,
    private emailComposer: EmailComposer,
    private device: Device, private toastCtrl: ToastController,
    public localstorage: Storage, public socialSharing: SocialSharing, public appRate: AppRate,
    private appAvailability: AppAvailability, public settings: SettingsProvider,
    public alert: AlertController, public push: Push, private firebaseAnalytics: FirebaseAnalytics,
     private market: Market, public toast: Toast, private network: Network) {

    this.rootPage = this.menuItems[0].page
    this.rootParams = this.menuItems[0].params
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val)
    this.checkAppThemeMode()
    this.platform = platform
    this.stb = statusBar
    platform.ready().then(() => {


      splashScreen.hide()
      statusBar.backgroundColorByHexString('#3F51B5')

      platform.registerBackButtonAction(() => {

        if (this.backButtonPressedOnceToExit) {
          this.platform.exitApp();
        } else if (this.nav.canGoBack()) {
          this.nav.pop({});
        } else {
          this.showToast();
          this.backButtonPressedOnceToExit = true;
          setTimeout(() => {
            this.backButtonPressedOnceToExit = false;
          }, 2000)
        }


      });

      this.appRate.preferences = {
        displayAppName: 'this app',
        usesUntilPrompt: 5,
        promptAgainForEachNewVersion: false,
        storeAppURL: {
          android: 'market://details?id=com.project.yifybrowserandsubs'
        },
        customLocale: {
          title: "Would you mind rating %@?",
          message: "It won’t take more than a minute and helps to promote our app. Thanks for your support!",
          cancelButtonLabel: "No,Thanks",
          laterButtonLabel: "Later",
          rateButtonLabel: "Rate Now",
          yesButtonLabel: "Yes!",
          noButtonLabel: "Not really",
          appRatePromptTitle: 'Do you like using %@',
          feedbackPromptTitle: 'Mind giving us some feedback?',
        },
        callbacks: {
          handleNegativeFeedback: function () {
            this.appRate.promptForRating(false)
          },
          onRateDialogShow: function (callback) {
            this.appRate.promptForRating(false)
          },
          onButtonClicked: function (buttonIndex) {
            this.appRate.promptForRating(false)
          }
        }
      }

      this.appRate.promptForRating(false)
    


    })



    this.localstorage.set("hastorapp", false);
    this.checkTorrentsAppAvailability();
    this.pushsetup();
    this.firebaseAnalytics.logEvent('page_view', { page: "dashboard" })
      .then((res: any) => console.log(res))
      .catch((error: any) => console.error(error))

    this.registerNetworkEvents();





  }

  registerNetworkEvents() {
    this.network.onDisconnect().subscribe(() => {
      this.showNetworkError("Disconnected!");
    })

    this.network.onConnect().subscribe(() => {
      this.showNetworkError("Connected!");
      this.showBanner()
    })



  }



  showNetworkError(msg: string) {

    this.toast.show("Network " + msg + "!", '3000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      })
  }

  setPurchased(val: boolean) {
    this.isPurchased = val;
  }



  showBanner() {

  
  }


  pushsetup() {
    const options: PushOptions = {
      android: {
        sound: true,
        icon: 'icon',
        senderID: '923651047024'
      }
    }

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      if (notification.additionalData.foreground) {
        let youralert = this.alert.create({
          title: 'New Push notification',
          message: notification.message,
          buttons: ['Dismiss']
        });
        youralert.present();
      }
    });

    pushObject.on('registration').subscribe((registration: any) => {
      this.localstorage.set("regid", registration);

    });

    pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }



  setStatusBarColor(color: string) {
    this.stb.backgroundColorByHexString(color);
  }

  showRestartAlert() {
    let alert = this.alert.create({
      title: 'Thank you !!',
      message: 'Apps needs to get restarted to apply changes!!',
      buttons: [
        {
          text: 'LATER',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'RESTART',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  }
  checkTorrentsAppAvailability(): void {

    for (var i = 0; i < this.torrentapps.length; i++) {

      this.appAvailability.check(this.torrentapps[i].toString())
        .then(
          (yes) => this.localstorage.set('hastorapp', true),
          (no) => console.log("not available")
        );

    }

  }

  checkAppThemeMode() {
    this.localstorage.get("mode").then(res => {
      if (res == null || res == undefined || res == '') {
        this.setModeTheme("off")
      } else {
        this.setModeTheme(res)
      }
    })
  }

  setModeTheme(mode: string) {
    if (mode == "on") {
      this.selectedTheme = 'dark-theme'
      this.setStatusBarColor('#060a1f')
    } else if (mode == "off") {
      this.selectedTheme = 'light-theme'
      this.setStatusBarColor('#3F51B5')
    } else if (mode == "auto") {
      let d = new Date();
      if (d.getHours() >= 18 || (6 >= d.getHours())) {
        this.selectedTheme = 'dark-theme'
        this.setStatusBarColor('#060a1f')
      } else {
        this.selectedTheme = 'light-theme'
        this.setStatusBarColor('#3F51B5')
      }
    }

  }

  showToast() {
    let toast = this.toastCtrl.create({
      message: 'Press Again to exit',
      duration: 2000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }



  openPage(page) {
    if (page.page == 'HomePage' || page.page == 'AdvancedSearchPage'
      || page.page == 'SettingsPage' || page.page == 'AboutPage'
      || page.page == 'SubtitleSearchPage' || page.page == 'AppSettingsPage') {
      this.nav.setRoot(page.page, page.params);
    } else if (page.page == 'ReportPage') {
      this.emailComposer.addAlias('gmail', 'com.google.android.gm');
      this.loadDeviceInfo();
      this.emailComposer.open(this.email);
    } else if (page.page == 'PrivacyPolicy') {
      window.open('https://sites.google.com/view/yifyhdmovies/home', '_system', "location=yes");
    } else if (page.page == 'SharePage') {
      this.shareApp();
    } else if (page.page == 'RateUs') {
      this.market.open('com.project.yifybrowserandsubs')
    }

  }

  shareApp() {

    this.socialSharing.share(null, null, null, this.playstoreappurl).then((res) => {
      console.log("shared");
      this.localstorage.set('shared', 'Y');

    }).catch((e) => {
      this.localstorage.set('shared', 'N');
      this.localstorage.set('tried', 1);
    });

  }


  loadDeviceInfo() {
    let model = this.device.model;
    let platform = this.device.platform;
    let manufacturer = this.device.manufacturer;
    let version = this.device.version;
    let content = model + " " + platform + " " + manufacturer + " " + version;
    this.email.body = content;
  }

  promptRatingDialog() {
    this.appRate.promptForRating(true);
  }





}
