import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import locale from 'element-ui/lib/locale/lang/en'
import Invoice from "vue-invoice";
import VueQRCodeComponent from 'vue-qr-generator'
Vue.component('qr-code', VueQRCodeComponent)
//material icon
import 'material-icons/iconfont/material-icons.css';
//material end icon
Vue.use(Invoice, {store})
import VueHtmlToPaper from 'vue-html-to-paper';
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    '../pos.css'
  ],  // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
}
Vue.use(VueHtmlToPaper, options);
// Vue.use(AdyenCheckout)
//clip
import VueClipboard from 'vue-clipboard2'
 
Vue.use(VueClipboard)
//vuesax
import Vuesax from 'vuesax'
 
import 'vuesax/dist/vuesax.css'
Vue.use(Vuesax)
//end vuesax
import FusionCharts from 'fusioncharts';
import VueFusionCharts from 'vue-fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts'
Vue.use(VueFusionCharts, FusionCharts, Charts)

import VueSession from 'vue-session'
Vue.use(VueSession)
import firebase from 'firebase';
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import Element from 'element-ui';
Vue.use(Element, { locale });
Vue.config.productionTip = false
Vue.use(require('vue-moment'));
import SequentialEntrance from 'vue-sequential-entrance'
import 'vue-sequential-entrance/vue-sequential-entrance.css'
Vue.use(SequentialEntrance);
var firebaseConfig = {
  apiKey: "AIzaSyDl1odIRtpB-HVG9n1ylwHvw5O1P7RBB2w",
  authDomain: "burgermania.com",
  projectId: "capstonefrontend-394b2",
  storageBucket: "capstonefrontend-394b2.appspot.com",
  messagingSenderId: "1092436291258",
  appId: "1:1092436291258:web:14a33bab0404c047b1dc83"
};
firebase.initializeApp(firebaseConfig);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


