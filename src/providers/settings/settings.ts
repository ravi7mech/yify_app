import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class SettingsProvider {
  savedTheme:String; // = this.getSavedTheme();
  private theme: BehaviorSubject<String>;
  
     constructor() {
         this.theme = new BehaviorSubject('light-theme');
     }
  
     setActiveTheme(val) {
         this.theme.next(val);
     }
  
     getActiveTheme() {
         return this.theme.asObservable();
     }
     getSavedTheme(){


       return '';
     }


}
