webpackJsonp([9],{534:function(l,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=e(1),u=(e(24),e(50)),i=e(81),a=e(82),o=e(78),s=e(31),r=(e(53),e(83)),d=function(){function l(l,n,e,t,u,i,a,o,s,r,d){var c=this;this.navCtrl=l,this.navParams=n,this.yifyProvider=e,this.transfer=t,this.file=u,this.toastCtrl=i,this.clipboard=a,this.socialSharing=o,this.localstorage=s,this.alert=r,this.diagnostic=d,this.sublist=[],this.showheader=!1,this.params={showheader:!1},this.fileTransfer=this.transfer.create(),this.params=n.get("params"),null!=this.params&&null!=this.params&&(this.showheader=this.params.showheader),this.localstorage.get("suburl").then(function(l){c.suburl=l,c.loadSubtitle()})}return l.prototype.loadSubtitle=function(){var l=this;try{this.asynccall=!0,this.yifyProvider.getSubSceneSubTitles(this.suburl).subscribe(function(n){if(l.subtitelist=n,l.subtitelist.langs_names.length>0){for(var e=0,t=0;t<l.subtitelist.langs_names.length;t++)t%2==0?l.subtitelist.down_links[e].lang=l.subtitelist.langs_names[t].lang_name:(l.subtitelist.down_links[e].name=l.subtitelist.langs_names[t].lang_name,e++);l.asynccall=!1,l.sublist=l.subtitelist.down_links}else l.asynccall=!1,l.msg=!0})}catch(l){console.log(l),this.asynccall=!1,this.msg=!0}},l.prototype.handleSubDownload=function(l){var n=this;this.sublist[l].downstart=!0,this.yifyProvider.downloadSubsceneSubs(this.url).subscribe(function(e){n.fileTransfer.download("https://subscene.com"+e.downlink[0].link,n.file.externalRootDirectory+"YIFY_Torrent_Browser/"+n.filename).then(function(e){n.sublist[l].downstart=!1,n.sublist[l].downcomplete=!0,n.presentToast("File saved in : "+n.file.externalRootDirectory.replace("file:///","")+"YIFY_Torrent_Browser/"+n.filename)},function(l){n.showOpenSettingsAlert()})})},l.prototype.showOpenSettingsAlert=function(){var l=this;this.alert.create({title:"Permission needed!",message:"This permission is needed to save the downloaded subtitle to disk!",buttons:[{text:"OPEN SETTINGS",handler:function(){l.diagnostic.switchToSettings()}}]}).present()},l.prototype.downloadfile=function(l,n){var e=this;this.url="https://subscene.com"+l.link,this.filename=l.name+".zip",this.diagnostic.isExternalStorageAuthorized().then(function(l){l?e.handleSubDownload(n):e.requestExternalStorageAuthorization(n)})},l.prototype.requestExternalStorageAuthorization=function(l){var n=this;this.diagnostic.requestExternalStorageAuthorization().then(function(e){console.log("requestExternalStorageAuthorization ",e),e?n.handleSubDownload(l):n.showOpenSettingsAlert()},function(l){n.showOpenSettingsAlert()})},l.prototype.presentToast=function(l){var n=this.toastCtrl.create({message:l,position:"bottom",closeButtonText:"OK",showCloseButton:!0});n.onDidDismiss(function(){}),n.present()},l}(),c=function(){return function(){}}(),f=e(20),b=e(39),h=e(147),m=e(247),_=e(248),g=e(249),p=e(250),R=e(251),v=e(252),w=e(58),k=e(27),y=e(23),S=e(2),E=e(34),x=e(44),I=e(146),C=e(55),D=e(43),T=e(79),O=e(49),P=e(25),M=e(149),q=e(8),B=e(539),F=e(54),A=e(10),L=e(26),z=e(540),N=e(145),V=e(73),j=e(108),K=e(29),Y=e(7),$=e(12),Z=e(30),G=e(61),J=e(19),H=e(51),Q=e(56),U=e(52),W=t["ɵcrt"]({encapsulation:0,styles:["ion-badge[_ngcontent-%COMP%] {\n      padding: 8px 11px;\n      text-align: center;\n      display: inline-block;\n      min-width: 10px;\n      font-size: 1.3rem;\n      font-weight: bold;\n      line-height: 1;\n      white-space: nowrap;\n      vertical-align: baseline;\n  }"],data:{}});function X(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,null,null,6,"div",[["class","subspinner"]],null,null,null,null,null)),(l()(),t["ɵted"](null,["\n  "])),(l()(),t["ɵeld"](0,null,null,3,":svg:svg",[["class","spinner"],["height","55px"],["viewBox","0 0 66 66"],["width","55px"],["xmlns","http://www.w3.org/2000/svg"]],null,null,null,null,null)),(l()(),t["ɵted"](null,["\n  "])),(l()(),t["ɵeld"](0,null,null,0,":svg:circle",[["class","path"],["cx","33"],["cy","33"],["fill","none"],["r","30"],["stroke-linecap","round"],["stroke-width","6"]],null,null,null,null,null)),(l()(),t["ɵted"](null,["\n"])),(l()(),t["ɵted"](null,["\n"]))],null,null)}function ll(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,null,null,6,"ion-item",[["class","item item-block"],["text-wrap",""]],null,null,null,w.b,w.a)),t["ɵdid"](1097728,null,3,k.a,[y.a,S.a,t.ElementRef,t.Renderer,[2,E.a]],null,null),t["ɵqud"](335544320,1,{contentLabel:0}),t["ɵqud"](603979776,2,{_buttons:1}),t["ɵqud"](603979776,3,{_icons:1}),t["ɵdid"](16384,null,0,x.a,[],null,null),(l()(),t["ɵted"](2,["Subtitles not found for this movie, Try after some times !!!"]))],null,null)}function nl(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,null,null,1,"ion-spinner",[["class","spinner-dark"],["icon","dots"],["style","color: #387ef5;"]],[[2,"spinner-paused",null]],null,null,I.b,I.a)),t["ɵdid"](114688,null,0,C.a,[S.a,t.ElementRef,t.Renderer],null,null)],function(l,n){l(n,1,0)},function(l,n){l(n,0,0,t["ɵnov"](n,1)._paused)})}function el(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,null,null,1,"ion-icon",[["ios","ios-checkmark"],["md","md-checkmark"],["role","img"],["style","font-size: 28px; color: green;"]],[[2,"hide",null]],null,null,null,null)),t["ɵdid"](147456,null,0,D.a,[S.a,t.ElementRef,t.Renderer],{ios:[0,"ios"],md:[1,"md"]},null)],function(l,n){l(n,1,0,"ios-checkmark","md-checkmark")},function(l,n){l(n,0,0,t["ɵnov"](n,1)._hidden)})}function tl(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,null,null,1,"span",[["style"," color: green;"]],null,null,null,null,null)),(l()(),t["ɵted"](null,["Downloaded!"]))],null,null)}function ul(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,null,null,58,"ion-card",[],null,null,null,null,null)),t["ɵdid"](16384,null,0,T.a,[S.a,t.ElementRef,t.Renderer],null,null),(l()(),t["ɵted"](null,["\n  \n    "])),(l()(),t["ɵeld"](0,null,null,12,"ion-item",[["class","item item-block"]],null,null,null,w.b,w.a)),t["ɵdid"](1097728,null,3,k.a,[y.a,S.a,t.ElementRef,t.Renderer,[2,E.a]],null,null),t["ɵqud"](335544320,4,{contentLabel:0}),t["ɵqud"](603979776,5,{_buttons:1}),t["ɵqud"](603979776,6,{_icons:1}),t["ɵdid"](16384,null,0,x.a,[],null,null),(l()(),t["ɵted"](2,["\n      "])),(l()(),t["ɵeld"](0,null,0,1,"ion-icon",[["item-start",""],["large",""],["name","map"],["role","img"],["style","color: #387ef5;"]],[[2,"hide",null]],null,null,null,null)),t["ɵdid"](147456,[[6,4]],0,D.a,[S.a,t.ElementRef,t.Renderer],{name:[0,"name"]},null),(l()(),t["ɵted"](2,["\n      "])),(l()(),t["ɵeld"](0,null,2,1,"h2",[],null,null,null,null,null)),(l()(),t["ɵted"](null,["","  "])),(l()(),t["ɵted"](2,["\n    "])),(l()(),t["ɵted"](null,["\n  \n\n    "])),(l()(),t["ɵeld"](0,null,null,12,"ion-item",[["class","item item-block"]],null,null,null,w.b,w.a)),t["ɵdid"](1097728,null,3,k.a,[y.a,S.a,t.ElementRef,t.Renderer,[2,E.a]],null,null),t["ɵqud"](335544320,7,{contentLabel:0}),t["ɵqud"](603979776,8,{_buttons:1}),t["ɵqud"](603979776,9,{_icons:1}),t["ɵdid"](16384,null,0,x.a,[],null,null),(l()(),t["ɵted"](2,["\n      "])),(l()(),t["ɵeld"](0,null,0,1,"ion-icon",[["item-left",""],["large",""],["name","document"],["role","img"],["style","color: #387ef5;"]],[[2,"hide",null]],null,null,null,null)),t["ɵdid"](147456,[[9,4]],0,D.a,[S.a,t.ElementRef,t.Renderer],{name:[0,"name"]},null),(l()(),t["ɵted"](2,["\n      "])),(l()(),t["ɵeld"](0,null,2,1,"h2",[],null,null,null,null,null)),(l()(),t["ɵted"](null,["",""])),(l()(),t["ɵted"](2,["\n     \n    "])),(l()(),t["ɵted"](null,["\n\n    "])),(l()(),t["ɵeld"](0,null,null,26,"ion-item",[["class","item item-block"]],null,null,null,w.b,w.a)),t["ɵdid"](1097728,null,3,k.a,[y.a,S.a,t.ElementRef,t.Renderer,[2,E.a]],null,null),t["ɵqud"](335544320,10,{contentLabel:0}),t["ɵqud"](603979776,11,{_buttons:1}),t["ɵqud"](603979776,12,{_icons:1}),t["ɵdid"](16384,null,0,x.a,[],null,null),(l()(),t["ɵted"](2,["\n        "])),(l()(),t["ɵeld"](0,null,0,11,"button",[["clear",""],["icon-left",""],["ion-button",""],["item-start",""]],null,null,null,O.b,O.a)),t["ɵdid"](1097728,[[11,4]],0,P.a,[[8,""],S.a,t.ElementRef,t.Renderer],{clear:[0,"clear"]},null),(l()(),t["ɵted"](0,["\n            "])),(l()(),t["ɵand"](16777216,null,0,1,null,nl)),t["ɵdid"](16384,null,0,f.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["ɵted"](0,["\n            "])),(l()(),t["ɵand"](16777216,null,0,1,null,el)),t["ɵdid"](16384,null,0,f.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["ɵted"](0,[" "])),(l()(),t["ɵand"](16777216,null,0,1,null,tl)),t["ɵdid"](16384,null,0,f.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["ɵted"](0,["\n          \n          "])),(l()(),t["ɵted"](2,[" \n\n      "])),(l()(),t["ɵeld"](0,null,4,5,"button",[["clear",""],["icon-left",""],["ion-button",""],["item-end",""]],null,[[null,"click"]],function(l,n,e){var t=!0;"click"===n&&(t=!1!==l.component.downloadfile(l.context.$implicit,l.context.index)&&t);return t},O.b,O.a)),t["ɵdid"](1097728,[[11,4]],0,P.a,[[8,""],S.a,t.ElementRef,t.Renderer],{clear:[0,"clear"]},null),(l()(),t["ɵted"](0,["\n          "])),(l()(),t["ɵeld"](0,null,0,1,"ion-icon",[["name","download"],["role","img"]],[[2,"hide",null]],null,null,null,null)),t["ɵdid"](147456,null,0,D.a,[S.a,t.ElementRef,t.Renderer],{name:[0,"name"]},null),(l()(),t["ɵted"](0,["\n          Download\n        "])),(l()(),t["ɵted"](2,["\n    "])),(l()(),t["ɵted"](null,["\n  \n  "]))],function(l,n){l(n,11,0,"map");l(n,25,0,"document");l(n,39,0,""),l(n,42,0,n.context.$implicit.downstart),l(n,45,0,n.context.$implicit.downcomplete),l(n,48,0,n.context.$implicit.downcomplete);l(n,52,0,"");l(n,55,0,"download")},function(l,n){l(n,10,0,t["ɵnov"](n,11)._hidden),l(n,14,0,n.context.$implicit.lang),l(n,24,0,t["ɵnov"](n,25)._hidden),l(n,28,0,n.context.$implicit.name),l(n,54,0,t["ɵnov"](n,55)._hidden)})}function il(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,null,null,10,"ion-header",[],null,null,null,null,null)),t["ɵdid"](16384,null,0,M.a,[S.a,t.ElementRef,t.Renderer,[2,q.a]],null,null),(l()(),t["ɵted"](null,["\n  "])),(l()(),t["ɵeld"](0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,B.b,B.a)),t["ɵdid"](49152,null,0,F.a,[A.a,[2,q.a],[2,L.a],S.a,t.ElementRef,t.Renderer],null,null),(l()(),t["ɵted"](3,["\n    "])),(l()(),t["ɵeld"](0,null,3,2,"ion-title",[],null,null,null,z.b,z.a)),t["ɵdid"](49152,null,0,N.a,[S.a,t.ElementRef,t.Renderer,[2,V.a],[2,F.a]],null,null),(l()(),t["ɵted"](0,["Subtitles"])),(l()(),t["ɵted"](3,["\n  "])),(l()(),t["ɵted"](null,["\n"])),(l()(),t["ɵted"](null,["\n"])),(l()(),t["ɵeld"](0,null,null,11,"ion-content",[["padding",""]],[[2,"statusbar-padding",null],[2,"has-refresher",null]],null,null,j.b,j.a)),t["ɵdid"](4374528,null,0,K.a,[S.a,Y.a,$.a,t.ElementRef,t.Renderer,A.a,Z.a,t.NgZone,[2,q.a],[2,L.a]],null,null),(l()(),t["ɵted"](1,["\n"])),(l()(),t["ɵand"](16777216,null,1,1,null,X)),t["ɵdid"](16384,null,0,f.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["ɵted"](1,["\n"])),(l()(),t["ɵand"](16777216,null,1,1,null,ll)),t["ɵdid"](16384,null,0,f.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["ɵted"](1,["\n\n"])),(l()(),t["ɵand"](16777216,null,1,1,null,ul)),t["ɵdid"](802816,null,0,f.h,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),t["ɵted"](1,["\n\n\n"])),(l()(),t["ɵted"](null,["\n"]))],function(l,n){var e=n.component;l(n,16,0,e.asynccall),l(n,19,0,e.msg),l(n,22,0,e.sublist)},function(l,n){l(n,3,0,t["ɵnov"](n,4)._hidden,t["ɵnov"](n,4)._sbPadding),l(n,12,0,t["ɵnov"](n,13).statusbarPadding,t["ɵnov"](n,13)._hasRefresher)})}var al=t["ɵccf"]("page-sub-title-search-subs-scene",d,function(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,null,null,6,"page-sub-title-search-subs-scene",[],null,null,null,il,W)),t["ɵprd"](512,null,u.a,u.a,[G.e]),t["ɵprd"](512,null,i.a,i.a,[]),t["ɵprd"](512,null,a.a,a.a,[]),t["ɵprd"](512,null,o.a,o.a,[]),t["ɵprd"](512,null,r.a,r.a,[]),t["ɵdid"](49152,null,0,d,[L.a,J.a,u.a,i.a,a.a,H.a,o.a,s.a,Q.a,U.a,r.a],null,null)],null,null)},{},{},[]),ol=e(74);e.d(n,"SubTitleSearchSubsScenePageModuleNgFactory",function(){return dl});var sl,rl=this&&this.__extends||(sl=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(l,n){l.__proto__=n}||function(l,n){for(var e in n)n.hasOwnProperty(e)&&(l[e]=n[e])},function(l,n){function e(){this.constructor=l}sl(l,n),l.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}),dl=new t.NgModuleFactory(function(l){function n(n){return l.call(this,n,[m.a,_.a,g.a,p.a,R.a,v.a,al],[])||this}return rl(n,l),Object.defineProperty(n.prototype,"_NgLocalization_7",{get:function(){return null==this.__NgLocalization_7&&(this.__NgLocalization_7=new f.j(this.parent.get(t.LOCALE_ID))),this.__NgLocalization_7},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_ɵi_8",{get:function(){return null==this.__ɵi_8&&(this.__ɵi_8=new b.k),this.__ɵi_8},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_FormBuilder_9",{get:function(){return null==this.__FormBuilder_9&&(this.__FormBuilder_9=new b.c),this.__FormBuilder_9},enumerable:!0,configurable:!0}),n.prototype.createInternal=function(){return this._CommonModule_0=new f.b,this._ɵba_1=new b.j,this._FormsModule_2=new b.d,this._ReactiveFormsModule_3=new b.i,this._IonicModule_4=new h.a,this._IonicPageModule_5=new h.b,this._SubTitleSearchSubsScenePageModule_6=new c,this._LAZY_LOADED_TOKEN_10=d,this._SubTitleSearchSubsScenePageModule_6},n.prototype.getInternal=function(l,n){return l===f.b?this._CommonModule_0:l===b.j?this._ɵba_1:l===b.d?this._FormsModule_2:l===b.i?this._ReactiveFormsModule_3:l===h.a?this._IonicModule_4:l===h.b?this._IonicPageModule_5:l===c?this._SubTitleSearchSubsScenePageModule_6:l===f.k?this._NgLocalization_7:l===b.k?this._ɵi_8:l===b.c?this._FormBuilder_9:l===ol.a?this._LAZY_LOADED_TOKEN_10:n},n.prototype.destroyInternal=function(){},n}(t["ɵNgModuleInjector"]),c)},539:function(l,n,e){"use strict";e.d(n,"a",function(){return b}),n.b=h;var t=e(1),u=e(20),i=e(54),a=e(49),o=e(25),s=e(2),r=e(43),d=e(10),c=e(8),f=e(26),b=t["ɵcrt"]({encapsulation:2,styles:[],data:{}});function h(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,null,null,1,"div",[["class","toolbar-background"]],null,null,null,null,null)),t["ɵdid"](278528,null,0,u.g,[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(l()(),t["ɵeld"](0,null,null,8,"button",[["class","back-button"],["ion-button","bar-button"]],[[8,"hidden",0]],[[null,"click"]],function(l,n,e){var t=!0;"click"===n&&(t=!1!==l.component.backButtonClick(e)&&t);return t},a.b,a.a)),t["ɵdid"](278528,null,0,u.g,[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),t["ɵdid"](1097728,null,0,o.a,[[8,"bar-button"],s.a,t.ElementRef,t.Renderer],null,null),(l()(),t["ɵeld"](0,null,0,2,"ion-icon",[["class","back-button-icon"],["role","img"]],[[2,"hide",null]],null,null,null,null)),t["ɵdid"](278528,null,0,u.g,[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),t["ɵdid"](147456,null,0,r.a,[s.a,t.ElementRef,t.Renderer],{name:[0,"name"]},null),(l()(),t["ɵeld"](0,null,0,2,"span",[["class","back-button-text"]],null,null,null,null,null)),t["ɵdid"](278528,null,0,u.g,[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(l()(),t["ɵted"](null,["",""])),t["ɵncd"](null,0),t["ɵncd"](null,1),t["ɵncd"](null,2),(l()(),t["ɵeld"](0,null,null,2,"div",[["class","toolbar-content"]],null,null,null,null,null)),t["ɵdid"](278528,null,0,u.g,[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),t["ɵncd"](null,3)],function(l,n){var e=n.component;l(n,1,0,"toolbar-background","toolbar-background-"+e._mode);l(n,3,0,"back-button","back-button-"+e._mode);l(n,6,0,"back-button-icon","back-button-icon-"+e._mode),l(n,7,0,e._bbIcon);l(n,9,0,"back-button-text","back-button-text-"+e._mode);l(n,15,0,"toolbar-content","toolbar-content-"+e._mode)},function(l,n){var e=n.component;l(n,2,0,e._hideBb),l(n,5,0,t["ɵnov"](n,7)._hidden),l(n,10,0,e._backText)})}t["ɵccf"]("ion-navbar",i.a,function(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,null,null,1,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,h,b)),t["ɵdid"](49152,null,0,i.a,[d.a,[2,c.a],[2,f.a],s.a,t.ElementRef,t.Renderer],null,null)],null,function(l,n){l(n,0,0,t["ɵnov"](n,1)._hidden,t["ɵnov"](n,1)._sbPadding)})},{color:"color",mode:"mode",hideBackButton:"hideBackButton"},{},["[menuToggle],ion-buttons[left]","ion-buttons[start]","ion-buttons[end],ion-buttons[right]","*"])},540:function(l,n,e){"use strict";e.d(n,"a",function(){return r}),n.b=d;var t=e(1),u=e(20),i=e(145),a=e(2),o=e(73),s=e(54),r=t["ɵcrt"]({encapsulation:2,styles:[],data:{}});function d(l){return t["ɵvid"](2,[(l()(),t["ɵeld"](0,null,null,2,"div",[["class","toolbar-title"]],null,null,null,null,null)),t["ɵdid"](278528,null,0,u.g,[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),t["ɵncd"](null,0)],function(l,n){l(n,1,0,"toolbar-title","toolbar-title-"+n.component._mode)},null)}t["ɵccf"]("ion-title",i.a,function(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,null,null,1,"ion-title",[],null,null,null,d,r)),t["ɵdid"](49152,null,0,i.a,[a.a,t.ElementRef,t.Renderer,[2,o.a],[2,s.a]],null,null)],null,null)},{color:"color",mode:"mode"},{},["*"])}});