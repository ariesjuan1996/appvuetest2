import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import es from 'vuetify/es5/locale/es'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
Vue.use(Vuetify);
 
export default new Vuetify({
    icons: {
        iconfont: 'md', // default - only for display purposes
    },
    lang: {
        locales: { es },
        current: 'es',
    }
});
