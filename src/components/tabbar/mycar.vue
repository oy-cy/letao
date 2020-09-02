<template>
    <div class="car_container">
        <div class="goods_list">
            <van-divider :style="{ color: '#6f7370', borderColor: '#545e6c' , margin: '5px'}">
                收货地址
            </van-divider>
            <van-address-list
                v-model="chosenAddressId"
                :list="list"
                default-tag-text="默认"
            />
            <van-divider :style="{ color: '#6f7370', borderColor: '#545e6c' , margin: '5px'}">
                收货地址
            </van-divider>
        </div>
        <div class="empty" v-show="isShow">
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
import { Divider ,AddressList } from 'vant';
  export default {
      data() {
        return {
            chosenAddressId: '1',
            isShow:false,
            list: [
                {
                id: '1',
                name: '张三',
                tel: '13000000000',
                address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                isDefault: true,
                }
            ]
        }
      },
      components:{
          "van-divider": Divider,
          "van-address-list" : AddressList,
      },
      created(){
        this.$parent.title = "我的购物车";
        // this.$parent.active = -1;
      }
  }
</script>

<style lang="scss" scoped>
.car_container {
    .goods_list{
        .van-address-list{
            padding: 12px 12px 20px;
            .van-address-list__bottom{
                display: none;
            }
        }
    }
    .empty {
        text-align: center;
    }
}
</style>
