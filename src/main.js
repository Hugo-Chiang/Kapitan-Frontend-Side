import axios from 'axios';
import VueAxios from 'vue-axios';
import $ from 'jquery';
import Bootstrap from 'bootstrap';
// 導入圖標套件 fontawesome 相關內容開始
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
// 導入圖標套件 fontawesome 相關內容結束
// 導入月曆套件 vue2-datepicker 相關內容開始
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
// 導入月曆套件 vue2-datepicker 相關內容結束
// 導入地圖套件 vue2-leaflet 相關內容開始 
import * as Vue2Leaflet from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
// 導入地圖套件 vue2-leaflet 相關內容結束 
import Vue from 'vue';
// 導入驗證套件 vee-validate 相關內容開始
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';
// 導入驗證套件 vee-validate 相關內容結束
import App from './App';
import router from './router';
import eventBus from "./eventBus"
// 導入雲端圖庫套件 cloudinary-vue 相關內容開始
import Cloudinary, { CldImage, CldTransformation } from "cloudinary-vue";
// 導入雲端圖庫套件 cloudinary-vue 相關內容結束
// 導入 HTML 編輯器套件 vue2-editor 相關內容開始
import { VueEditor } from "vue2-editor";
// 導入 HTML 編輯器套件 vue2-editor 相關內容結束

window.$ = $;

Vue.config.productionTip = false;
Vue.use(VueAxios, axios, $, Bootstrap, DatePicker, Vue2Leaflet, eventBus, Cloudinary, {
  configuration: { cloudName: "demo" },
  components: {
    CldImage,
    CldTransformation
  }
}, VueEditor);

// 導出驗證套件 vee-validate 的所有規則
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

// 驗證套件 vee-validate 的語言本地化（正體中文）
localize('zh_TW', zhTW);

// 導入驗證套件 vee-validate 的兩大元件：單一 input 驗證、和整份 form 的驗證
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

// 驗證套件 vee-validate 的設定檔
configure({
  events: 'input|blur|change',
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});

// 全域註冊：用以修飾全站金額樣式的過濾器，套上錢字符前綴與千分號
Vue.filter("currency", function (n) {
  return n.toFixed(0).replace(/./g, function (c, i, a) {
    return i && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
  });
});
Vue.filter("dollarSign", function (n) {
  return `$ ${n}`;
});

// 於原型下創立時間格式化方法，以利資料庫內容與 input 間銜接順利
Date.prototype.Format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? o[k]
          : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

// 我們熟悉的 Vue 實體
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});