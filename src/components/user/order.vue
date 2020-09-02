<template>
    <div class="order_container">
        <van-tabs v-model="active">
            <van-tab title="全部">
                <van-card
                    num="2"
                    tag="标签"
                    price="444.00"
                    desc="描述信息"
                    title="商品标题"
                    thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
                    origin-price="10.00"
                    />
            </van-tab>
            <van-tab title="待付款">
                <van-card
                    num="1"
                    tag="标签"
                    price="4.00"
                    desc="描述信息"
                    title="商品标题"
                    thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
                    origin-price="10.00"
                />
            </van-tab>
            <van-tab title="待收货">
                <van-card
                    num="4"
                    tag="标签"
                    price="44.00"
                    desc="描述信息"
                    title="商品标题"
                    thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
                    origin-price="10.00"
                />
            </van-tab>
            <van-tab title="已完成">
                <van-card
                    num="3"
                    tag="标签"
                    price="4444.00"
                    desc="描述信息"
                    title="商品标题"
                    thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
                    origin-price="10.00"
                />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import { Tab, Tabs ,Card  } from 'vant';
    export default {
        data() {
            return {
            active: 1,
            };
        },
        components:{
            "van-tabs":Tabs,
            "van-tab":Tab,
            "van-card":Card
        },
        created(){
            this.$parent.title = "地址管理";
            this.$parent.active = -1;
        }
    }
</script>

<style lang="scss" scoped>

</style>
