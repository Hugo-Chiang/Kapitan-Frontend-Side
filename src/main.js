// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
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
import './components/eventBus';
import Vue from 'vue';
// 導入驗證套件 vee-validate 相關內容開始
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';
// 導入驗證套件 vee-validate 相關內容結束
import App from './App';
import router from './router';

window.$ = $;

Vue.config.productionTip = false;
Vue.use(VueAxios, axios, $, Bootstrap, DatePicker, Vue2Leaflet);

// 導出驗證套件 vee-validate 的所有規則
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

// 驗證套件 vee-validate 的語言本地化（正體中文）
localize('zh_TW', zhTW);

// 導入驗證套件 vee-validate 的兩大元件：單一 input 驗證、和整份 form 的驗證
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

// 驗證套件 vee-validate 的 class-name 設定檔
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
