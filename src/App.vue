<template>
    <div class="app_container">
        <!-- 头部 -->
        <van-sticky>
            <div class="nav_bar" >
                    <div class="header" v-show="isHeader">
                    <img src="./assets/images/logo.png" alt />
                    <van-search placeholder="请输入搜索关键词"></van-search>
                    </div>
                    <van-nav-bar
                        :title="title"
                        left-arrow
                        @click-left="onClickLeft"
                        v-show="!isHeader"
                    />
            </div>
        </van-sticky>
        <!-- 中间 -->
        <router-view></router-view>

        <!-- 底部 -->
        <van-tabbar v-model="active" v-show="isTable" >
            <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
                <van-tabbar-item to="/mycar" icon="cart-o" :badge="$store.getters.carTotal">
                    我的购物车
                </van-tabbar-item>
            <van-tabbar-item to="/user" icon="user-o">我的乐淘</van-tabbar-item>
        </van-tabbar>


        <van-button type="default" class="logOut" block v-show="isButton" @click="loginOut" >退出登录</van-button>
    </div>
</template>

<script>
import {
    Search,
    Tabbar,
    TabbarItem,
    Button ,
    Divider,
    Sticky,
    NavBar,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    Dialog
} from "vant";
import shouyeHeader from "@/components/slots/shouyeHeader.vue";
export default {
    data() {
        return {
            active: 0,
            title: "",
            isTable:true,
            isButton:true,
            isHeader:true,
        };
    },
    methods: {
        onClickLeft() {
            // 跳转
            this.$router.go(-1);
        },
        loginOut() {
            Dialog.confirm({
                title: '是否确认退出',

                })
                .then(() => {
                    // on confirm
                    this.$router.push("/login");
                })
                .catch(() => {
                    // on cancel
            });
        },
        changeButtom(){
            this.isButtom = !isButtom;
        },

        getPath(){
            var path = this.$route.path
            var header = /home/
            var goodsDetail = /goodsDetail/
            var user = /user/
            if(goodsDetail.test(path)){
                this.isTable = this.isButton = false;
            }else if(user.test(path)){
                this.isTable = false;
                this.isButton = true;
            }else{
                this.isButton = false;
                this.isTable = true;

            }
            if(header.test(path)){
                this.isHeader = true;
            }else{
                this.isHeader = false;

            }

        }
    },
    components: {
        "van-search": Search,
        "van-tabbar": Tabbar,
        "van-tabbar-item": TabbarItem,
        "van-sticky": Sticky,
        "van-nav-bar": NavBar,
        "van-goods-action": GoodsAction,
        "van-goods-action-icon": GoodsActionIcon,
        "van-goods-action-button": GoodsActionButton,
        "van-button":Button
    },
    watch:{
        $route : "getPath"
    },
    created(){
        this.getPath();
    }
};
</script>

<style lang="scss">
    body{
        background-color: #eee;
    }
.app_container {
    min-width: 320px;
    max-width: 750px;
    margin: 0 auto;
    margin-bottom: 50px;
    background-color: #eee;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2px;
        background-color: #fff;
        max-width: 750px;
        margin: 0 auto;
        img {
            height: 44px;
        }
        .van-search {
            flex: 1;
        }
        .van-sticky--fixed {
            max-width: 750px;
            margin: 0 auto;
        }
    }
        .logOut{
            position: fixed;
            left: 0;
            bottom: 0;
        }
}
</style>
