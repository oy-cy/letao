import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { Lazyload } from "vant";
Vue.use(Lazyload, {
    lazyComponent: true,
});
import '@/util/filter.js';

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
