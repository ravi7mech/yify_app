import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvanceSearchResultsPage } from './advance-search-results';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    AdvanceSearchResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdvanceSearchResultsPage),LazyLoadImageModule
  ],
})
export class AdvanceSearchResultsPageModule {}
