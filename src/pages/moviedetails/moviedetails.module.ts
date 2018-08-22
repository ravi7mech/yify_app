import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoviedetailsPage } from './moviedetails';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FabToolbar } from '../../pages/fab-toolbar/fab-toolbar';

@NgModule({
  declarations: [
    MoviedetailsPage,FabToolbar
  ],
  imports: [
    IonicPageModule.forChild(MoviedetailsPage),LazyLoadImageModule
  ],
  entryComponents:[FabToolbar]
})
export class MoviedetailsPageModule {}
