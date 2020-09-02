<template>
    <div class="home_container">
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" :indicator-color="color">
            <van-swipe-item v-for="item in lunboData" :key="item.img">
                <img :src="item.img" />
            </van-swipe-item>
        </van-swipe>

        <!-- 8宫格 -->
        <van-grid :column-num="4" :border="false">
            <van-grid-item to="/digitalList">
            <!-- <van-grid-item > -->
                <img src="../../assets/images/menu10.png" alt />
                <div class="text">数码电器</div>
            </van-grid-item>
            <van-grid-item to="/newsList">
                <img src="../../assets/images/menu19.png" alt />
                <div class="text">乐淘头条</div>
            </van-grid-item>
            <van-grid-item to="/photo">
                <img src="../../assets/images/menu18.png" alt />
                <div class="text">美图欣赏</div>
            </van-grid-item>
            <van-grid-item>
                <img src="../../assets/images/menu15.png" alt />
                <div class="text">乐淘服饰</div>
            </van-grid-item>
            <van-grid-item >
                <img src="../../assets/images/menu12.png" alt />
                <div class="text">9.9元拼单</div>
            </van-grid-item>
            <van-grid-item >
                <img src="../../assets/images/menu15.png" alt />
                <div class="text">话费充值</div>
            </van-grid-item>
            <van-grid-item >
                <img src="../../assets/images/menu16.png" alt />
                <div class="text">物流查询</div>
            </van-grid-item>
            <van-grid-item >
                <img src="../../assets/images/menu17.png" alt />
                <div class="text">全部</div>
            </van-grid-item>
        </van-grid>
        <div class="recommend">
            <van-divider style>为你推荐</van-divider>
            <div class="goodList">
                <div class="item" v-for="item in tuijianData" :key="item.id" @click="jump(item.id)" >
                    <!-- <a href=""> -->
                        <img :src="item.img_url" alt="" />
                        <div class="text">
                            {{ item.title }}

                            <div class="price">
                                ${{ item.market_price }}
                                <span class="buy">
                                    {{ item.buy }}人已经购买</span>
                            </div>
                        </div>
                    <!-- </a> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swipe, SwipeItem, Grid, GridItem, Divider } from "vant";
import { getLunBoData, gettuijian } from "@/api/index.js";
// import axios from "axios";
export default {
    name: "HomeComponent",
    data() {
        return {
            lunboData: [],
            tuijianData: [],
            color: "#ccc"
        };
    },
    components: {
        "van-swipe": Swipe,
        "van-swipe-item": SwipeItem,
        "van-grid": Grid,
        "van-grid-item": GridItem,
        "van-divider": Divider
    },
    methods: {
        // 获取轮播图数据
        async getLunbo() {
            var res = await getLunBoData();
            this.lunboData = res.message;
        },
        async gettuijian() {
            var res = await gettuijian();
            this.tuijianData = res.message;
            console.log(this.tuijianData);
        },
        jump(id){
            this.$router.push(`/goodsDetail/${id}`);
        }
    },
    created() {
        this.getLunbo();
        this.gettuijian();
        this.$parent.active = 0;
    }
};
</script>

<style lang="scss" scoped>

.home_container {
    .my-swipe {
        height: 200px;
        .van-swipe-item {
            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .van-grid {

    background: #fff;

        .van-grid-item {
            padding: 8px 2px;

            img {
                width: 50%;
            }

            .text {
                color: #524949;
                font-size: 13px;
            }
        }
    }
    .recommend {
        padding: 0 8px;
        overflow: hidden;

        .van-divider {
            color: #000;
            border-color: #545e6c;
        }
        .goodList {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            overflow: hidden;
            .item {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 48%;
                // height: 300px;
                background-color: #fff;
                margin: 4px 0;
                border-radius: 5px;
                overflow: hidden;
                img {
                    width: 100%;
                    // height: 60%;
                    // border-radius: 6px;
                }
                .text {
                    margin-top: 5px;
                    font-size: 12px;
                }
                .price {
                    font-size: 14px;
                    color: #f50;
                    padding: 10px 0;
                    .buy {
                        margin-left: 10px;
                        font-size: 12px;
                        color: #999;
                    }
                }
            }
        }
    }
}
</style>
