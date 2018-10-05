webpackJsonp([2],{

/***/ 621:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubtitleSearchPageModule", function() { return SubtitleSearchPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__subtitle_search__ = __webpack_require__(634);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SubtitleSearchPageModule = (function () {
    function SubtitleSearchPageModule() {
    }
    return SubtitleSearchPageModule;
}());
SubtitleSearchPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__subtitle_search__["a" /* SubtitleSearchPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__subtitle_search__["a" /* SubtitleSearchPage */]), __WEBPACK_IMPORTED_MODULE_3_ng_lazyload_image__["LazyLoadImageModule"]
        ],
    })
], SubtitleSearchPageModule);

//# sourceMappingURL=subtitle-search.module.js.map

/***/ }),

/***/ 634:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubtitleSearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_yify_movies_yify_movies__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_speech_recognition__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_lazyload_image__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_lazyload_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng_lazyload_image__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SubtitleSearchPage = (function () {
    function SubtitleSearchPage(navCtrl, navParams, yifyprovider, speechRecognition, toastCtrl, homepage, alertcontroller, localstorage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.yifyprovider = yifyprovider;
        this.speechRecognition = speechRecognition;
        this.toastCtrl = toastCtrl;
        this.homepage = homepage;
        this.alertcontroller = alertcontroller;
        this.localstorage = localstorage;
        this.movielist = [];
        this.submovielist = [];
        this.asyncCall = false;
        this.shouldShowCancel = true;
        this.cancelButtonText = 'Cancel';
        this.animated = true;
        this.options = { language: "en-US", matches: 5, prompt: "Speak now !!!", showPopup: "true" };
        this.hasMicAccess = false;
        this.hasRecognitionAvailable = false;
        this.sub_sceneurl = 'https://subscene.com/subtitles/';
        this.textinput = "";
        this.showText = false;
        this.defaultImage = 'https://i.imgur.com/DLkGimY.png';
        this.darkui = true;
        this.moviepage = 1;
        this.langjson = [{ "iso_639_1": "xx", "english_name": "No Language", "name": "No Language" }, { "iso_639_1": "aa", "english_name": "Afar", "name": "" }, { "iso_639_1": "af", "english_name": "Afrikaans", "name": "Afrikaans" }, { "iso_639_1": "ak", "english_name": "Akan", "name": "" }, { "iso_639_1": "an", "english_name": "Aragonese", "name": "" }, { "iso_639_1": "as", "english_name": "Assamese", "name": "" }, { "iso_639_1": "av", "english_name": "Avaric", "name": "" }, { "iso_639_1": "ae", "english_name": "Avestan", "name": "" }, { "iso_639_1": "ay", "english_name": "Aymara", "name": "" }, { "iso_639_1": "az", "english_name": "Azerbaijani", "name": "Azərbaycan" }, { "iso_639_1": "ba", "english_name": "Bashkir", "name": "" }, { "iso_639_1": "bm", "english_name": "Bambara", "name": "Bamanankan" }, { "iso_639_1": "bi", "english_name": "Bislama", "name": "" }, { "iso_639_1": "bo", "english_name": "Tibetan", "name": "" }, { "iso_639_1": "br", "english_name": "Breton", "name": "" }, { "iso_639_1": "ca", "english_name": "Catalan", "name": "Català" }, { "iso_639_1": "cs", "english_name": "Czech", "name": "Český" }, { "iso_639_1": "ce", "english_name": "Chechen", "name": "" }, { "iso_639_1": "cu", "english_name": "Slavic", "name": "" }, { "iso_639_1": "cv", "english_name": "Chuvash", "name": "" }, { "iso_639_1": "kw", "english_name": "Cornish", "name": "" }, { "iso_639_1": "co", "english_name": "Corsican", "name": "" }, { "iso_639_1": "cr", "english_name": "Cree", "name": "" }, { "iso_639_1": "cy", "english_name": "Welsh", "name": "Cymraeg" }, { "iso_639_1": "da", "english_name": "Danish", "name": "Dansk" }, { "iso_639_1": "de", "english_name": "German", "name": "Deutsch" }, { "iso_639_1": "dv", "english_name": "Divehi", "name": "" }, { "iso_639_1": "dz", "english_name": "Dzongkha", "name": "" }, { "iso_639_1": "eo", "english_name": "Esperanto", "name": "Esperanto" }, { "iso_639_1": "et", "english_name": "Estonian", "name": "Eesti" }, { "iso_639_1": "eu", "english_name": "Basque", "name": "euskera" }, { "iso_639_1": "fo", "english_name": "Faroese", "name": "" }, { "iso_639_1": "fj", "english_name": "Fijian", "name": "" }, { "iso_639_1": "fi", "english_name": "Finnish", "name": "suomi" }, { "iso_639_1": "fr", "english_name": "French", "name": "Français" }, { "iso_639_1": "fy", "english_name": "Frisian", "name": "" }, { "iso_639_1": "ff", "english_name": "Fulah", "name": "Fulfulde" }, { "iso_639_1": "gd", "english_name": "Gaelic", "name": "" }, { "iso_639_1": "ga", "english_name": "Irish", "name": "Gaeilge" }, { "iso_639_1": "gl", "english_name": "Gallegan", "name": "Galego" }, { "iso_639_1": "gv", "english_name": "Manx", "name": "" }, { "iso_639_1": "gn", "english_name": "Guarani", "name": "" }, { "iso_639_1": "gu", "english_name": "Gujarati", "name": "" }, { "iso_639_1": "ht", "english_name": "Haitian; Haitian Creole", "name": "" }, { "iso_639_1": "ha", "english_name": "Hausa", "name": "Hausa" }, { "iso_639_1": "sh", "english_name": "Serbo-Croatian", "name": "" }, { "iso_639_1": "hz", "english_name": "Herero", "name": "" }, { "iso_639_1": "ho", "english_name": "Hiri Motu", "name": "" }, { "iso_639_1": "hr", "english_name": "Croatian", "name": "Hrvatski" }, { "iso_639_1": "hu", "english_name": "Hungarian", "name": "Magyar" }, { "iso_639_1": "ig", "english_name": "Igbo", "name": "" }, { "iso_639_1": "io", "english_name": "Ido", "name": "" }, { "iso_639_1": "ii", "english_name": "Yi", "name": "" }, { "iso_639_1": "iu", "english_name": "Inuktitut", "name": "" }, { "iso_639_1": "ie", "english_name": "Interlingue", "name": "" }, { "iso_639_1": "ia", "english_name": "Interlingua", "name": "" }, { "iso_639_1": "id", "english_name": "Indonesian", "name": "Bahasa indonesia" }, { "iso_639_1": "ik", "english_name": "Inupiaq", "name": "" }, { "iso_639_1": "is", "english_name": "Icelandic", "name": "Íslenska" }, { "iso_639_1": "it", "english_name": "Italian", "name": "Italiano" }, { "iso_639_1": "jv", "english_name": "Javanese", "name": "" }, { "iso_639_1": "ja", "english_name": "Japanese", "name": "日本語" }, { "iso_639_1": "kl", "english_name": "Kalaallisut", "name": "" }, { "iso_639_1": "kn", "english_name": "Kannada", "name": "?????" }, { "iso_639_1": "ks", "english_name": "Kashmiri", "name": "" }, { "iso_639_1": "kr", "english_name": "Kanuri", "name": "" }, { "iso_639_1": "kk", "english_name": "Kazakh", "name": "қазақ" }, { "iso_639_1": "km", "english_name": "Khmer", "name": "" }, { "iso_639_1": "ki", "english_name": "Kikuyu", "name": "" }, { "iso_639_1": "rw", "english_name": "Kinyarwanda", "name": "Kinyarwanda" }, { "iso_639_1": "ky", "english_name": "Kirghiz", "name": "??????" }, { "iso_639_1": "kv", "english_name": "Komi", "name": "" }, { "iso_639_1": "kg", "english_name": "Kongo", "name": "" }, { "iso_639_1": "ko", "english_name": "Korean", "name": "한국어/조선말" }, { "iso_639_1": "kj", "english_name": "Kuanyama", "name": "" }, { "iso_639_1": "ku", "english_name": "Kurdish", "name": "" }, { "iso_639_1": "lo", "english_name": "Lao", "name": "" }, { "iso_639_1": "la", "english_name": "Latin", "name": "Latin" }, { "iso_639_1": "lv", "english_name": "Latvian", "name": "Latviešu" }, { "iso_639_1": "li", "english_name": "Limburgish", "name": "" }, { "iso_639_1": "ln", "english_name": "Lingala", "name": "" }, { "iso_639_1": "lt", "english_name": "Lithuanian", "name": "Lietuvikai" }, { "iso_639_1": "lb", "english_name": "Letzeburgesch", "name": "" }, { "iso_639_1": "lu", "english_name": "Luba-Katanga", "name": "" }, { "iso_639_1": "lg", "english_name": "Ganda", "name": "" }, { "iso_639_1": "mh", "english_name": "Marshall", "name": "" }, { "iso_639_1": "ml", "english_name": "Malayalam", "name": "" }, { "iso_639_1": "mr", "english_name": "Marathi", "name": "" }, { "iso_639_1": "mg", "english_name": "Malagasy", "name": "" }, { "iso_639_1": "mt", "english_name": "Maltese", "name": "Malti" }, { "iso_639_1": "mo", "english_name": "Moldavian", "name": "" }, { "iso_639_1": "mn", "english_name": "Mongolian", "name": "" }, { "iso_639_1": "mi", "english_name": "Maori", "name": "" }, { "iso_639_1": "ms", "english_name": "Malay", "name": "Bahasa melayu" }, { "iso_639_1": "my", "english_name": "Burmese", "name": "" }, { "iso_639_1": "na", "english_name": "Nauru", "name": "" }, { "iso_639_1": "nv", "english_name": "Navajo", "name": "" }, { "iso_639_1": "nr", "english_name": "Ndebele", "name": "" }, { "iso_639_1": "nd", "english_name": "Ndebele", "name": "" }, { "iso_639_1": "ng", "english_name": "Ndonga", "name": "" }, { "iso_639_1": "ne", "english_name": "Nepali", "name": "" }, { "iso_639_1": "nl", "english_name": "Dutch", "name": "Nederlands" }, { "iso_639_1": "nn", "english_name": "Norwegian Nynorsk", "name": "" }, { "iso_639_1": "nb", "english_name": "Norwegian Bokmål", "name": "Bokmål" }, { "iso_639_1": "no", "english_name": "Norwegian", "name": "Norsk" }, { "iso_639_1": "ny", "english_name": "Chichewa; Nyanja", "name": "" }, { "iso_639_1": "oc", "english_name": "Occitan", "name": "" }, { "iso_639_1": "oj", "english_name": "Ojibwa", "name": "" }, { "iso_639_1": "or", "english_name": "Oriya", "name": "" }, { "iso_639_1": "om", "english_name": "Oromo", "name": "" }, { "iso_639_1": "os", "english_name": "Ossetian; Ossetic", "name": "" }, { "iso_639_1": "pi", "english_name": "Pali", "name": "" }, { "iso_639_1": "pl", "english_name": "Polish", "name": "Polski" }, { "iso_639_1": "pt", "english_name": "Portuguese", "name": "Português" }, { "iso_639_1": "qu", "english_name": "Quechua", "name": "" }, { "iso_639_1": "rm", "english_name": "Raeto-Romance", "name": "" }, { "iso_639_1": "ro", "english_name": "Romanian", "name": "Română" }, { "iso_639_1": "rn", "english_name": "Rundi", "name": "Kirundi" }, { "iso_639_1": "ru", "english_name": "Russian", "name": "Pусский" }, { "iso_639_1": "sg", "english_name": "Sango", "name": "" }, { "iso_639_1": "sa", "english_name": "Sanskrit", "name": "" }, { "iso_639_1": "si", "english_name": "Sinhalese", "name": "" }, { "iso_639_1": "sk", "english_name": "Slovak", "name": "Slovenčina" }, { "iso_639_1": "sl", "english_name": "Slovenian", "name": "Slovenščina" }, { "iso_639_1": "se", "english_name": "Northern Sami", "name": "" }, { "iso_639_1": "sm", "english_name": "Samoan", "name": "" }, { "iso_639_1": "sn", "english_name": "Shona", "name": "" }, { "iso_639_1": "sd", "english_name": "Sindhi", "name": "" }, { "iso_639_1": "so", "english_name": "Somali", "name": "Somali" }, { "iso_639_1": "st", "english_name": "Sotho", "name": "" }, { "iso_639_1": "es", "english_name": "Spanish", "name": "Español" }, { "iso_639_1": "sq", "english_name": "Albanian", "name": "shqip" }, { "iso_639_1": "sc", "english_name": "Sardinian", "name": "" }, { "iso_639_1": "sr", "english_name": "Serbian", "name": "Srpski" }, { "iso_639_1": "ss", "english_name": "Swati", "name": "" }, { "iso_639_1": "su", "english_name": "Sundanese", "name": "" }, { "iso_639_1": "sw", "english_name": "Swahili", "name": "Kiswahili" }, { "iso_639_1": "sv", "english_name": "Swedish", "name": "svenska" }, { "iso_639_1": "ty", "english_name": "Tahitian", "name": "" }, { "iso_639_1": "ta", "english_name": "Tamil", "name": "தமிழ்" }, { "iso_639_1": "tt", "english_name": "Tatar", "name": "" }, { "iso_639_1": "te", "english_name": "Telugu", "name": "తెలుగు" }, { "iso_639_1": "tg", "english_name": "Tajik", "name": "" }, { "iso_639_1": "tl", "english_name": "Tagalog", "name": "" }, { "iso_639_1": "th", "english_name": "Thai", "name": "ภาษาไทย" }, { "iso_639_1": "ti", "english_name": "Tigrinya", "name": "" }, { "iso_639_1": "to", "english_name": "Tonga", "name": "" }, { "iso_639_1": "tn", "english_name": "Tswana", "name": "" }, { "iso_639_1": "ts", "english_name": "Tsonga", "name": "" }, { "iso_639_1": "tk", "english_name": "Turkmen", "name": "" }, { "iso_639_1": "tr", "english_name": "Turkish", "name": "Türkçe" }, { "iso_639_1": "tw", "english_name": "Twi", "name": "" }, { "iso_639_1": "ug", "english_name": "Uighur", "name": "" }, { "iso_639_1": "uk", "english_name": "Ukrainian", "name": "Український" }, { "iso_639_1": "ur", "english_name": "Urdu", "name": "اردو" }, { "iso_639_1": "uz", "english_name": "Uzbek", "name": "ozbek" }, { "iso_639_1": "ve", "english_name": "Venda", "name": "" }, { "iso_639_1": "vi", "english_name": "Vietnamese", "name": "Tiếng Việt" }, { "iso_639_1": "vo", "english_name": "Volapük", "name": "" }, { "iso_639_1": "wa", "english_name": "Walloon", "name": "" }, { "iso_639_1": "wo", "english_name": "Wolof", "name": "Wolof" }, { "iso_639_1": "xh", "english_name": "Xhosa", "name": "" }, { "iso_639_1": "yi", "english_name": "Yiddish", "name": "" }, { "iso_639_1": "za", "english_name": "Zhuang", "name": "" }, { "iso_639_1": "zu", "english_name": "Zulu", "name": "isiZulu" }, { "iso_639_1": "ab", "english_name": "Abkhazian", "name": "" }, { "iso_639_1": "zh", "english_name": "Mandarin", "name": "普通话" }, { "iso_639_1": "ps", "english_name": "Pushto", "name": "پښتو" }, { "iso_639_1": "am", "english_name": "Amharic", "name": "" }, { "iso_639_1": "ar", "english_name": "Arabic", "name": "العربية" }, { "iso_639_1": "bg", "english_name": "Bulgarian", "name": "български език" }, { "iso_639_1": "cn", "english_name": "Cantonese", "name": "广州话 / 廣州話" }, { "iso_639_1": "mk", "english_name": "Macedonian", "name": "" }, { "iso_639_1": "el", "english_name": "Greek", "name": "ελληνικά" }, { "iso_639_1": "fa", "english_name": "Persian", "name": "فارسی" }, { "iso_639_1": "he", "english_name": "Hebrew", "name": "עִבְרִית" }, { "iso_639_1": "hi", "english_name": "Hindi", "name": "हिन्दी" }, { "iso_639_1": "hy", "english_name": "Armenian", "name": "" }, { "iso_639_1": "en", "english_name": "English", "name": "English" }, { "iso_639_1": "ee", "english_name": "Ewe", "name": "Èʋegbe" }, { "iso_639_1": "ka", "english_name": "Georgian", "name": "ქართული" }, { "iso_639_1": "pa", "english_name": "Punjabi", "name": "ਪੰਜਾਬੀ" }, { "iso_639_1": "bn", "english_name": "Bengali", "name": "বাংলা" }, { "iso_639_1": "bs", "english_name": "Bosnian", "name": "Bosanski" }, { "iso_639_1": "ch", "english_name": "Chamorro", "name": "Finu' Chamorro" }, { "iso_639_1": "be", "english_name": "Belarusian", "name": "беларуская мова" }];
        this.isRecognitionAvailable();
    }
    SubtitleSearchPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            position: 'bottom',
            closeButtonText: 'Ok',
            showCloseButton: false,
            duration: 2000
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    SubtitleSearchPage.prototype.getMoviePoster = function (movie) {
        return "https://image.tmdb.org/t/p/w500" + ((movie.poster_path == null || movie.poster_path == undefined) ? movie.backdrop_path : movie.poster_path);
    };
    SubtitleSearchPage.prototype.getNativeLanguage = function (movie) {
        var lang = movie.original_language;
        var english_name = '';
        for (var i = 0; i < this.langjson.length; i++) {
            if (this.langjson[i].iso_639_1 == lang) {
                english_name = this.langjson[i].english_name;
                break;
            }
        }
        return english_name;
    };
    SubtitleSearchPage.prototype.startListening = function () {
        var _this = this;
        this.speechRecognition.startListening(this.options)
            .subscribe(function (matches) {
            console.log(matches);
            _this.textinput = matches[0];
            _this.submovielist = [];
            _this.getItems(_this.textinput);
        }, function (onerror) {
            console.log('error:', onerror);
        });
    };
    SubtitleSearchPage.prototype.presentConfirm = function () {
        this.requestPermission();
    };
    SubtitleSearchPage.prototype.retryVoiceMessage = function (msg) {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: msg,
            position: 'bottom',
            closeButtonText: 'Ok',
            showCloseButton: false,
            duration: 3000
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
            _this.startListening();
        });
        toast.present();
    };
    SubtitleSearchPage.prototype.listenmic = function () {
        if (this.hasMicAccess) {
            this.startListening();
        }
        else {
            this.presentConfirm();
        }
    };
    SubtitleSearchPage.prototype.getSupportedLanguages = function () {
        this.speechRecognition.getSupportedLanguages()
            .then(function (languages) { return console.log(languages); }, function (error) { return console.log(error); });
    };
    SubtitleSearchPage.prototype.hasPermission = function () {
        var _this = this;
        this.speechRecognition.hasPermission()
            .then(function (hasPermission) {
            if (!hasPermission) {
                _this.hasMicAccess = false;
            }
            else {
                _this.hasMicAccess = true;
            }
        });
    };
    SubtitleSearchPage.prototype.requestPermission = function () {
        var _this = this;
        this.speechRecognition.requestPermission()
            .then(function () {
            _this.hasMicAccess = true;
            _this.startListening();
        }, function () {
            _this.hasMicAccess = false;
        });
    };
    SubtitleSearchPage.prototype.isRecognitionAvailable = function () {
        var _this = this;
        this.speechRecognition.isRecognitionAvailable()
            .then(function (available) {
            if (available) {
                _this.hasRecognitionAvailable = true;
                _this.hasPermission();
            }
            else {
                _this.hasRecognitionAvailable = false;
            }
        });
    };
    SubtitleSearchPage.prototype.getItems = function (val) {
        var _this = this;
        this.showText = false;
        if (val && val.trim() != '') {
            this.asyncCall = true;
            this.textinput = val;
            this.moviepage = 1;
            this.yifyprovider.searchTMDbQueryData(val, this.moviepage).subscribe(function (res) {
                _this.asyncCall = false;
                if (res.results.length > 0)
                    _this.submovielist = res.results;
                else
                    _this.showText = true;
                console.log(_this.submovielist);
                _this.searchbar.setFocus();
            });
        }
        else {
            this.submovielist = [];
            this.showText = false;
        }
    };
    SubtitleSearchPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        if (!this.asyncCall) {
            this.moviepage = this.moviepage + 1;
            this.yifyprovider.searchTMDbQueryData(this.textinput, this.moviepage).subscribe(function (res) {
                infiniteScroll.complete();
                if (res.results.length > 0)
                    res.results.forEach(function (element) {
                        _this.submovielist.push(element);
                    });
                else
                    _this.presentToast("No more results found!");
                console.log(_this.submovielist);
            });
        }
        else {
            infiniteScroll.complete();
        }
    };
    SubtitleSearchPage.prototype.openMoviePage = function (movie) {
        var title = movie.title;
        title = title.toLocaleLowerCase().replace(/[&\/\\#,+()$~%.'":*?!<>{}]/g, '');
        title = title.replace(/\s/g, '-');
        this.localstorage.set("suburl", this.sub_sceneurl + title);
        var params = { showheader: true };
        var ANIMATION = { animate: true, direction: 'forward' };
        this.navCtrl.push('SubTitleSearchSubsScenePage', { params: params }, ANIMATION);
    };
    SubtitleSearchPage.prototype.shareApp = function () {
        this.homepage.shareApp();
    };
    SubtitleSearchPage.prototype.openSettings = function () {
        this.navCtrl.push('AppSettingsPage');
    };
    return SubtitleSearchPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('searchbar'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* Searchbar */])
], SubtitleSearchPage.prototype, "searchbar", void 0);
SubtitleSearchPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-search',template:/*ion-inline-start:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/subtitle-search/subtitle-search.html"*/'\n<ion-header>\n  <ion-navbar>\n      <button ion-button menuToggle style="font-size: 2.4rem;">\n          <ion-icon name="menu"></ion-icon>\n      </button>\n      <ion-buttons start *ngIf="hasRecognitionAvailable==true">\n        <button ion-button style="font-size: 20px;" (click)="listenmic()">\n              <ion-icon name="mic"></ion-icon>\n          </button>\n      </ion-buttons>\n  \n      <ion-searchbar [(ngModel)]="textinput" (ionInput)="getItems($event.target.value)" \n      placeholder="Search movies"\n      [animated]="animated" spellcheck="true"\n        #searchbar>\n  \n  \n      </ion-searchbar>\n  \n    </ion-navbar>\n\n</ion-header>\n\n<ion-content padding #container [ngClass]="(darkui)?\'darkcolor\':\'litecolor\'">\n    <div>\n      <ion-spinner color="spinner" name="crescent" *ngIf="asyncCall == true" \n      style="top: 50%;left: 50%; margin-top: 5px;margin-left: -14px;">\n      </ion-spinner>\n    </div>\n  \n    <ion-list>\n      <div *ngFor="let movie of submovielist" (click)="openMoviePage(movie)">\n          <ion-item *ngIf = "!movie.video">\n                <ion-thumbnail item-start>\n                  <div class="tileimage" [lazyLoad]="getMoviePoster(movie)" \n                   [scrollTarget]="container.getScrollElement()"\n                   [defaultImage]="defaultImage"\n                   [errorImage]="defaultImage" \n                  [scrollObservable]="container.ionScroll"\n                    style="background-repeat: no-repeat;\n                     background-size: contain;\n                     height: 107px;\n                     width: 100%;">        \n                  </div>  \n                </ion-thumbnail>\n                  <h2>{{movie.title}}</h2>\n                  <p>{{movie.vote_average}}</p>\n                  <p>{{movie.release_date | date}}</p> \n                  <p [innerHtml]="getNativeLanguage(movie)"></p>    \n          </ion-item>\n      </div>\n     \n    </ion-list><!-- \n    <ion-item text-wrap *ngIf="showText">No movies found related to your search ,\n       Try again with complete words !!!</ion-item> -->\n    <ion-fab bottom right>\n      \n              <button ion-fab (click) = "openSettings()" class="animated zoomIn">\n                  <ion-icon ios="ios-settings" md="md-settings"></ion-icon>\n              </button>\n      \n          </ion-fab>\n\n          <ion-infinite-scroll (ionInfinite)="doInfinite($event)" threshold="30%">\n              <ion-infinite-scroll-content loadingSpinner="crescent" color="spinner">\n              </ion-infinite-scroll-content>\n          </ion-infinite-scroll>\n\n  </ion-content>'/*ion-inline-end:"/media/ravikumar/Soft_Workspace/My GithHub/yify-browser/src/pages/subtitle-search/subtitle-search.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_4_ng_lazyload_image__["LazyLoadImageDirective"], __WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]],
        styles: ["\n  .ng-lazyloaded {\n      animation: fadein .3s;\n  }\n  @keyframes fadein {\n      from { opacity: 0; }\n      to   { opacity: 1; }\n  }\n\n  \n"]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_yify_movies_yify_movies__["a" /* YifyMoviesProvider */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_speech_recognition__["a" /* SpeechRecognition */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]])
], SubtitleSearchPage);

//# sourceMappingURL=subtitle-search.js.map

/***/ })

});
//# sourceMappingURL=2.js.map