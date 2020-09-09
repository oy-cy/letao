<template>
    <div class="car_container">
        <div class="goods_list" v-show="hasGoods">
            <van-divider
                :style="{
                    color: '#6f7370',
                    borderColor: '#545e6c',
                    margin: '5px'
                }"
            >
                收货地址
            </van-divider>
            <van-address-list
                v-model="chosenAddressId"
                :list="list"
                default-tag-text="默认"
            />
            <van-divider
                :style="{
                    color: '#6f7370',
                    borderColor: '#545e6c',
                    margin: '5px'
                }"
            >
                购买的商品
            </van-divider>
            <div class="shoppingList">
                <div
                    class="good_item"
                    v-for="(item,index) in shoppingCar"
                    :key="item.id"
                >
                    <div class="switchButtom">
                        <van-switch
                            v-model="$store.getters.getGoodsSelected[item.id]"
                            @change="switchChange(item.id,$store.getters.getGoodsSelected[item.id])"
                        />
                    </div>
                    <div class="thumbImage">
                        <img :src="item.thumb_path" alt="" />
                    </div>
                    <div class="goodsInfo">
                        <div class="title">{{ item.title }}</div>
                        <div class="row">
                            <span class="price"> ¥{{ item.sell_price }}</span>
                            <van-stepper
                                v-model="$store.getters.getGoodsNumber[item.id]"
                                @change="changeNumber(item.id,$store.getters.getGoodsNumber[item.id])"
                            />
                            <van-button type="danger" @click="del(item.id,index)" >删除</van-button>
                        </div>
                    </div>
                </div>
            </div>

            <van-cell title="卫星支付" icon="peer-pay" />
            <van-submit-bar
                :price="$store.getters.getGoodsSelectedPrice"
                button-text="订单支付"
                @submit="onSubmit"
            >
                <template #default
                    >共
                    {{ $store.getters.getGoodsSelectedNumber }} 件商品</template
                >
                <template #tip>默认只支持卫星支付</template>
            </van-submit-bar>
        </div>
        <div class="empty" v-show="!hasGoods">
            <h3>
                亲，您的购物车为空，去
                <router-link to="/home">首页</router-link>逛逛吧!
            </h3>
            <hr />
            <div class="img">
                <img src="@/assets/images/car.png" alt="" />
            </div>
            <div>
                <router-link to="/login">登陆</router-link>
                后可以同步电脑与手机购物车中的商品
            </div>
        </div>
    </div>
</template>

<script>
import {
    Divider,
    AddressList,
    Switch,
    Stepper,
    Button,
    Cell,
    SubmitBar
} from "vant";
import { getshoppingData } from "@/api/index.js";
export default {
    data() {
        return {
            chosenAddressId: "1",
            isShow: false,
            checked: true,
            value: 0,
            list: [
                {
                    id: "1",
                    name: "张三",
                    tel: "13000000000",
                    address:
                        "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
                    isDefault: true
                }
            ],
            goodList: [],
            shoppingCar: []
        };
    },
    methods: {
        getGoodDate() {
            this.goodList = this.$store.getters.getCarData;
            console.log(this.goodList);
                if(this.goodList.length == 0){ return; }
                console.log("1111");
            var idList = [];
            this.goodList.forEach(v => {
                idList.push(v.id);
            });
            var str = idList.join(",");
            this.getShopping(str);
        },
        async getShopping(str) {
            var { message } = await getshoppingData(str);
            //    console.log(this.shoppingCar);
            this.shoppingCar = message;
        },
        onSubmit() {},
        // 删除购物车商品
        del(goods_id, index) {
            this.$store.commit("delCarGoods", goods_id);
            
            this.shoppingCar.splice(index, 1);
        },
        // 修改商品的选中状态
        switchChange(goods_id, selected) {
            this.$store.commit("changeGoodsSelected", { goods_id, selected });
        },
        // 修改商品的购买数量
        changeNumber(goods_id, number) {
            console.log(number);
            this.$store.commit("changeGoodsNumber", { goods_id, number });
        }
    },
    components: {
        "van-divider": Divider,
        "van-address-list": AddressList,
        "van-switch": Switch,
        "van-stepper": Stepper,
        "van-button": Button,
        "van-cell": Cell,
        "van-submit-bar": SubmitBar
    },
    computeds: {
        // 直接当做普通属性调用不加括号
        // 任何data中数据变化立即重新计算
        // 计算属性会缓存
        //   return 必须retrun结果
    },
    created() {
        this.$parent.title = "我的购物车";
        this.getGoodDate();
    },
    computed: {
        hasGoods: function() {
        return this.shoppingCar.length > 0;
        }
  },
};
</script>

<style lang="scss" scoped>
.car_container {
    .goods_list {
        margin-bottom: 85px;
        .van-address-list {
            padding: 12px 12px 20px;
            .van-address-list__bottom {
                display: none;
            }
        }
        .shoppingList {
            .good_item {
                display: flex;
                justify-content: space-between;
                background-color: #fff;
                margin-bottom: 10px;
                border-radius: 5px;
                padding: 8px;
                align-items: center;
                .thumbImage {
                    img {
                        width: 50px;
                    }
                }
                .goodsInfo {
                    .title {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                    }
                    .row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .price {
                            color: red;
                            font-weight: 700;
                        }
                    }
                }
            }
        }
    }
    .empty {
        text-align: center;
    }
}
</style>
