import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { YifyMoviesProvider } from '../providers/yify-movies/yify-movies';
import { IonicStorageModule } from '@ionic/storage';
import { enableProdMode } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {PopoverPage} from '../pages/home/popover';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FormsModule } from '@angular/forms';
import { SettingsProvider } from '../providers/settings/settings';
import { SubtitlesListPage } from '../pages/subtitles-list/subtitles-list';
import { SubsceneListPage } from '../pages/subscene-list/subscene-list';
import { DomSanitizer } from '@angular/platform-browser';
//import { ScrollHideDirective } from '../directives/scroll-hide/scroll-hide';
import { ElasticHeaderModule } from "ionic2-elastic-header/dist";

enableProdMode();

@NgModule({
  declarations: [
    MyApp,PopoverPage,SubtitlesListPage,SubsceneListPage
  ],
  imports: [
    BrowserModule,ElasticHeaderModule,
    BrowserAnimationsModule,
    HttpModule,
    SuperTabsModule.forRoot(),
    IonicStorageModule.forRoot(),LazyLoadImageModule,FormsModule,
    IonicModule.forRoot(MyApp,{pageTransition: 'md-transition'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,PopoverPage,SubtitlesListPage,SubsceneListPage
  ],
  providers: [
    SplashScreen,
    StatusBar,InAppBrowser,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    YifyMoviesProvider,SocialSharing,SpeechRecognition,
    SettingsProvider
  ]
})
export class AppModule {}

