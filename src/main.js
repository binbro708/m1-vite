/* eslint-disable vue/no-reserved-component-names */
import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";

// Import component
import Loading from "vue3-loading-overlay";
// Import stylesheet
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";
import App from "./App.vue";
import router from "./router";
import { currency, date } from "./methods/filters";
import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";
import $httpMessageState from "./methods/pushMessageState";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
// import './assets/main.css'
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
const app = createApp(App);
app.config.globalProperties.$filters = { currency, date };
app.config.globalProperties.$httpMessageState = $httpMessageState;
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale("zh_TW");
app.use(createPinia());
app.use(router);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Form", Form);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Field", Field);
app.component("ErrorMessage", ErrorMessage);
app.use(VueAxios, axios);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Loading", Loading);
app.mount("#app");
