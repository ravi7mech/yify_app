import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';
import { SubtitlesListPage } from '../subtitles-list/subtitles-list';
import { SubsceneListPage } from '../subscene-list/subscene-list';
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-subtitle-tabs',
  templateUrl: 'subtitle-tabs.html'
})
export class SubtitleTabsPage {
  subdata :any;
  imdb_code:any;
  suburl:any;
  yifySubs = SubtitlesListPage;
  subsceneSubs = SubsceneListPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, private localstorage: Storage) {
    this.subdata = navParams.get('imdb');
    this.imdb_code = this.subdata.imdbcode;
    this.suburl = this.subdata.suburl;
    this.localstorage.set("suburl", this.suburl);
  }

}
