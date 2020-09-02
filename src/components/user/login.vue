<template>
    <div class="login_container">
        <van-form @submit="onSubmit">
            <br>

            <van-field
                v-model="username"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                提交
                </van-button>
            </div>
        </van-form>
        <router-link tag="div" to="/registered" class="registered">新用户注册</router-link>
    </div>
</template>

<script>
import { Button,Field ,Form } from 'vant';
    export default {
        data() {
            return {
            username: '',
            password: '',
            };
        },
        methods: {
            onSubmit(values) {
            console.log('submit', values);
            },
        },
        components:{
            "van-form":Form,
            "van-field" :Field,
            "van-button" : Button

        },
        created(){
            this.$parent.title = "登陆";
            this.$parent.active = -1;
        }
    }
</script>

<style lang="scss" scoped>
    .registered{
        text-align:center;
        color: #666;
    }
</style>
