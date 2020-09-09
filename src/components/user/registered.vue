<template>
    <div class="login_container">
        <van-form @submit="onSubmit">
            <br>

            <van-field
                v-model="username"
                name="username"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
                v-model="Tpassword"
                type="password"
                name="Tpassword"
                label="确认密码"
                placeholder="确认密码"
                :rules="[{ required: true, message: '请填写确认密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                注册
                </van-button>
            </div>
        </van-form>
        <router-link tag="div" to="/login" class="registered">登陆</router-link>
    </div>
</template>

<script>
import { Button,Field ,CellGroup,Form,Toast } from 'vant';
import { addUser } from "@/api/index.js";
    export default {
        data() {
            return {
                username: '',
                password: '',
                Tpassword:'',
            };
        },
        methods: {
            onSubmit(values) {
                console.log(values);
                var username = values.username;
                var password = values.password;
                var Tpassword = values.Tpassword;
                if (password != Tpassword) {
                        Toast('两次密码不一致,请重新输入');
                        this.password = this.Tpassword = "";
                        return;
                }

                this.addUserData(username,password);
            },
            async addUserData(username , password){
                var user = {
                    username,
                    password
                }
            var res = await addUser(user);
                console.log(res);
                if (res.status == 0) {
                    Toast.success(res.message);
                    this.$router.push('/login')
                } else {
                    Toast.fail(res.message);
                    this.password = this.Tpassword = this.username = "";
                }

            }
        },
        components:{
            "van-form":Form,
            "van-field" :Field,
            "van-button" : Button

        },
        created(){
            this.$parent.title = "乐淘注册";
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
