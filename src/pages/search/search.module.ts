import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPage } from './search';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),LazyLoadImageModule
  ],
})
export class SearchPageModule {}
