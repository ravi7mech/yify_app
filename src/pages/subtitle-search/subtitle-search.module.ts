import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubtitleSearchPage } from './subtitle-search';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    SubtitleSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SubtitleSearchPage),LazyLoadImageModule
  ],
})
export class SubtitleSearchPageModule {}
