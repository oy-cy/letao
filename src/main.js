import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { Lazyload } from "vant";
Vue.use(Lazyload, {
    lazyComponent: true,
});
import '@/util/filter.js';

Vue.config.productionTip = false
import store from "@/store/carStore";


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
