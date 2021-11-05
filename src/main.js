import Vue from 'vue'
import App from '@/App.vue';
//import App from './App.vue'

import routerStorePanel from './router/storePanel';

import vuetify from '@/plugins/vuetify';





import ZoomOnHover from "vue-zoom-on-hover";
Vue.use(ZoomOnHover);
//import GAuth from 'vue-google-oauth2'
import Notifications from 'vue-notification';
Vue.use(Notifications);
import VueConfirmDialog from 'vue-confirm-dialog'
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);
Vue.use(VueConfirmDialog);

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
const VueScrollTo = require('vue-scrollto')
Vue.use(VueScrollTo);



Vue.component('vue-confirm-dialog', VueConfirmDialog.default);
Vue.config.productionTip = false
import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:routerStorePanel,
  //router:routerStore,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')