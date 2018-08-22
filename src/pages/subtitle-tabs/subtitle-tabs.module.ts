import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubtitleTabsPage } from './subtitle-tabs';
import {SharedModule} from "../../app/shared.module";


@NgModule({
  declarations: [
    SubtitleTabsPage
  ],
  imports: [
    IonicPageModule.forChild(SubtitleTabsPage),SharedModule
  ]
})
export class SubtitleTabsPageModule {}
