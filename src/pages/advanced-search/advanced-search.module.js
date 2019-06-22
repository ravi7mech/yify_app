var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvancedSearchPage } from './advanced-search';
var AdvancedSearchPageModule = /** @class */ (function () {
    function AdvancedSearchPageModule() {
    }
    AdvancedSearchPageModule = __decorate([
        NgModule({
            declarations: [
                AdvancedSearchPage,
            ],
            imports: [
                IonicPageModule.forChild(AdvancedSearchPage)
            ],
        })
    ], AdvancedSearchPageModule);
    return AdvancedSearchPageModule;
}());
export { AdvancedSearchPageModule };
//# sourceMappingURL=advanced-search.module.js.map