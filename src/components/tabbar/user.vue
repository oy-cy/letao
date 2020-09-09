<template>
  <div class="person_container">
    <van-cell-group>
        <van-cell class="_flex">
            <div class="img"><img src="@/assets/logo.png" alt=""></div>
            <div class="username">用户名 : {{username}}</div>
        </van-cell>
        <van-cell title="修改密码" is-link />
        <van-cell title="我的订单" is-link  to="/order" />
        <van-cell title="地址管理" is-link  to="/address" />
    </van-cell-group>
    <br>
        <van-cell-group>
        <van-cell title="提交反馈" is-link />
        <van-cell title="关于乐淘" value="v1.0.1" />
    </van-cell-group>
  </div>
</template>

<script>
    import { Cell, CellGroup } from 'vant';
  export default {
      data() {
          return {
              username:'绿藻头'
          }
      },
      components:{
          "van-cell-group" : CellGroup,
          "van-cell" : Cell

      },

      created(){
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.username = userInfo.username;
        this.$parent.title = "我的乐淘";
        // this.$parent.active = -1;
      }
  }
</script>

<style lang="scss" scoped>
    .person_container{
        // ._flex{

        // }
        .van-cell__value--alone{
             display: flex;
            align-items: center;
            .img{
                width: 20%;
                margin-right: 100px;
                img{
                    width: 100%;
                }
            }
            .username{
                font-size: 18px;
                color: #5d5555;
            }
        }
    }
</style>
