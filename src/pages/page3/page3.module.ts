import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {Page3Page} from "./page3";
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    Page3Page
  ],
  imports: [
    IonicPageModule.forChild(Page3Page),LazyLoadImageModule
  ]
})
export class Module {}
