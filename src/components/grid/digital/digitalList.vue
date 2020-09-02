<template>
    <div class="goodList">
        <!-- {{goodList}} -->
        <div class="item" v-for="item in goodList" :key="item.id">
            <img :src="item.img_url" alt="" />
            <div class="text">
                {{ item.title }}
                <div class="price">
                    <span class="now">${{ item.sell_price }}</span>
                    <del class="old">${{ item.market_price }}</del>
                </div>
                <div class="status">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </div>
            </div>
        </div>
        <van-button type="info" block @click="getGoodListDate()"
            >加载更多</van-button
        >
    </div>
</template>

<script>
import { getGoodList } from "@/api/index.js";
import { Button, Toast } from "vant";
export default {
    data() {
        return {
            goodList: [],
            page: 1,
            isDate: true
        };
    },
    methods: {
        async getGoodListDate() {
            if (this.hasData == false) {
                Toast("亲，已经没数据了");
                return;
            }
            var { message } = await getGoodList(this.page);
            if (message.length == 0) {
                Toast("已获取所有商品");
                isDate = false;
                return;
            }

            var _this = this;
            message.map(v => {
                _this.goodList.push(v);
            });
            _this.page++;
            // console.log(this.goodList);
        }
    },
    components: {
        "van-button": Button
    },
    created() {
        this.$parent.title = "商品列表";
        this.$parent.active = -1;
        this.getGoodListDate(1);
    }
};
</script>

<style lang="scss" scoped>
.goodList {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow: hidden;
    background-color: #ccc;
    padding: 0 5px;
    .item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 48%;
        background-color: #fff;
        margin: 4px 0;
        border-radius: 5px;
        overflow: hidden;
        img {
            width: 100%;
        }
        .text {
            // display: flex;
            // flex-direction: column;
            // justify-content: space-between;
            margin-top: 5px;
            font-size: 12px;
            color: #565252;
            .price {
                .now {
                    color: red;
                    font-weight: 700;
                }
                .old {
                    margin-left: 10px;
                    font-size: 12px;
                    color: #ccc;
                }
            }
            .status {
                font-size: 14px;
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
</style>
