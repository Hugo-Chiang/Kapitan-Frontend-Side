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
// 導入自定義全域變數開始
import GlobalVariables from '@/library/variables.vue';
// 導入自定義全域變數結束
// 導入自定義全域函式開始
import GlobalFunctions from '@/library/functions.vue';
// 導入自定義全域函式結束

// 掛載 jQuery
window.$ = $;

Vue.config.productionTip = false;

// 掛載上述引用個元件、檔案等等
Vue.use(VueAxios, axios, $, Bootstrap, DatePicker, Vue2Leaflet, eventBus, Cloudinary, {
  configuration: { cloudName: "demo" },
  components: {
    CldImage,
    CldTransformation
  }
}, VueEditor);

// 掛載上述引用的自定義變數和函式等等
Vue.prototype.GlobalVariables = GlobalVariables;
Vue.prototype.GlobalFunctions = GlobalFunctions;
// 於 Date 原型下創立時間格式化方法，以利資料庫內容與 input 間銜接順利
Date.prototype.Format = GlobalFunctions.format;

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
  return Number(n).toFixed(0).replace(/./g, function (c, i, a) {
    return i && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
  });
});
Vue.filter("dollarSign", function (n) {
  return `$ ${n}`;
});
// 全域註冊：翻譯資料庫中各種數字所代表的狀態意涵
Vue.filter("memberStatus", function (n) {
  switch (n) {
    case '0' || 0:
      return '停權';
    case '1' || 1:
      return '警告';
    case '2' || 2:
      return '正常';
  }
});
Vue.filter("orderStatus", function (n) {
  switch (n) {
    case '0' || 0:
      return '已取消';
    case '1' || 1:
      return '進行中';
    case '2' || 2:
      return '已完成';
  }
});
Vue.filter("orderDetailStatus", function (n) {
  switch (n) {
    case '0' || 0:
      return '已取消';
    case '1' || 1:
      return '進行中';
    case '2' || 2:
      return '已完成';
  }
});
Vue.filter("projectStatus", function (n) {
  switch (n) {
    case '0' || 0:
      return '已下線';
    case '1' || 1:
      return '上線中';
  }
});

// 我們熟悉的 Vue 實體
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});