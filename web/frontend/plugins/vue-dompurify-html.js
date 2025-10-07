import Vue from 'vue';
// 取代v-html 預防xss攻擊 (vue2和vue3用的版本不同 要注意)
import VueDOMPurifyHTML from 'vue-dompurify-html';

Vue.use(VueDOMPurifyHTML);
