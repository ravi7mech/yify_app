import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Page1Page } from "./page1";
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    Page1Page
  ],
  imports: [
    IonicPageModule.forChild(Page1Page),LazyLoadImageModule
   
  ]
})
export class Module {}
