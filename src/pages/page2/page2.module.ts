import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Page2Page } from "./page2";
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    Page2Page
  ],
  imports: [
    IonicPageModule.forChild(Page2Page),
    LazyLoadImageModule
   
  ]
})
export class Module {}
