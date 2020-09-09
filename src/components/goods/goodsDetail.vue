<template>
    <div class="goodsdetail_container">
        <van-swipe class="my-swipe" :autoplay="3000">
            <van-swipe-item v-for="item in goodsDetailImg" :key="item.img">
                <img :src="item.src" />
            </van-swipe-item>
        </van-swipe>
        <div class="text">
            <div class="good-name">{{ goodsDetailInfo.title }}</div>
            <van-divider />

            <div class="price">
                <del class="old">
                    市场价:${{ goodsDetailInfo.market_price }}
                </del>
                <span class="shopPrice">
                    本店价:
                <span class="money">${{ goodsDetailInfo.sell_price }}</span>
                </span>
            </div>
            <div class="good-number">
                <span>购买数量:</span>
                <van-stepper v-model="value" integer />
            </div>
        </div>
        <div class="goodItem">
            <van-divider>其他信息</van-divider>
            <div class="goodInfo">
                <span>商品货号:{{ goodsDetailInfo.goods_no }}</span>
                <span>库存情况:{{ goodsDetailInfo.stock_quantity }}件</span>
                <span>上架时间:{{ goodsDetailInfo.add_time | dateFormat('YYYY-MM-DD') }}</span>
            </div>
        </div>
        <div class="goodItem">
            <van-divider>介绍</van-divider>
            <div class="content" v-html="goodsDetailInfo.content"></div>
        </div>

        <van-goods-action >
             <van-goods-action-icon icon="chat-o" text="客服" dot />
            <van-goods-action-icon
                icon="cart-o"
                text="购物车"
                to="/mycar"
                :badge="$store.getters.carTotal"
            />
            <van-goods-action-button type="warning" @click="addCar" text="加入购物车" />
            <van-goods-action-button
                type="danger"
                text="立即购买"
                @click="onClickButton"
            />
        </van-goods-action>
    </div>
</template>

<script>
import { goodsDetailImg, goodsDetailInfo } from "@/api/index.js";
import { Swipe, SwipeItem, Divider, Stepper,GoodsAction, GoodsActionIcon, GoodsActionButton } from "vant";
export default {
    data() {
        return {
            id: this.$route.params.id,
            goodsDetailImg: [],
            goodsDetailInfo: {},
            value: 1
        };
    },
    components: {
        "van-swipe": Swipe,
        "van-swipe-item": SwipeItem,
        "van-divider": Divider,
        "van-stepper": Stepper,
        "van-goods-action": GoodsAction,
        "van-goods-action-icon": GoodsActionIcon,
        "van-goods-action-button": GoodsActionButton,
    },
    methods: {
        async getGoodsDetailData() {
            var img = await goodsDetailImg(this.id);
            var info = await goodsDetailInfo(this.id);
            console.log(info.message);
            this.goodsDetailImg = img.message;
            this.goodsDetailInfo = info.message;

        },
        addCar(){
        var goods = {
            id: this.goodsDetailInfo.id,
            number: this.value,
            price: this.goodsDetailInfo.sell_price,
            selected: true
        };
        this.$store.commit('addCar',goods)
        },
        onClickButton(){},
    },
    created() {
        this.getGoodsDetailData();
        this.$parent.title = "商品详情";
        this.$parent.active = -1;
    }
};
</script>

<style lang="scss">
.goodsdetail_container {
    padding: 5px 5px 50px 5px;
    img {
        width: 100%;
    }
    .my-swipe {
        width: 100%;
        height: 240px;
        border-radius: 5px;
        background-color: #fff;
        .van-swipe-item {
            text-align: center;
            img {
                height: 100%;
                width: 245px;
            }
        }
    }
    .text {
        padding: 8px;
        border-radius: 5px;
        background-color: #fff;
        margin: 10px 0;
        .price {
            margin-bottom: 15px;
            .old {
                margin-right: 30px;
            }
            .shopPrice {
                .money {
                    color: red;
                    font-weight: 700;
                }
            }
        }
        .good-number {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            span {
                margin-right: 5px;
            }
        }
    }
    .goodItem {
        padding: 8px;
        border-radius: 5px;
        background-color: #fff;
        margin-bottom: 10px;
        .goodInfo {
            color: #333;
            display: flex;
            flex-direction: column;
        }
        .content {
            width: 100%;
            font-size: 16px;
            color: #333;

            table {
                width: 100%;
            }
        }
    }
}
</style>
