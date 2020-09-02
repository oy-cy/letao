import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from "@/components/tabbar/home.vue";
import mycar from "@/components/tabbar/mycar.vue";
import user from "@/components/tabbar/user.vue";
import digitalList from "@/components/grid/digital/digitalList.vue";
import newsList from "@/components/grid/news/newsList.vue";
import goodsDetail from "@/components/goods/goodsDetail.vue";
import newsDetail from "@/components/grid/news/newsDetail.vue";
import address from "@/components/user/address.vue";
import addressadd from "@/components/user/addressadd.vue";
import photo from "@/components/photo/photo.vue";
import login from "@/components/user/login.vue";
import registered from "@/components/user/registered.vue";
import order from "@/components/user/order.vue";
import addressedit from "@/components/user/addressedit.vue";

const routes = [
    { path: "/", redirect: "/home" },
    { path: "/home", component: home },
    { path: "/mycar", component: mycar },
    { path: "/user", component: user },
    { path: "/digitalList", component: digitalList },
    { path: "/newsList", component: newsList },
    { path: "/goodsDetail/:id", component: goodsDetail },
    { path: "/newsDetail/:id", component: newsDetail },
    { path: "/address", component: address },
    { path: "/addressadd", component: addressadd },
    { path: "/photo", component: photo },
    { path: "/login", component: login },
    { path: "/registered", component: registered },
    { path: "/order", component: order },
    { path: "/addressedit/:item", component: addressedit, props: true },
]

const router = new VueRouter({
    routes
})

export default router
