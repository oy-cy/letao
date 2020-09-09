<template>
    <div class="login_container">
        <van-form @submit="onSubmit">
            <br />

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
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
        <router-link tag="div" to="/registered" class="registered"
            >新用户注册</router-link
        >
    </div>
</template>

<script>
import { Button, Field, Form, Toast } from "vant";
import { login } from "@/api/index.js";
export default {
    data() {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        async onSubmit(values) {
            var { status, message, userInfo, token } = await login(values);
            if (status == 0) {
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
                localStorage.setItem("token", token);
                this.$router.push("/home");
            } else {
                Toast.fail(res.message);
            }
        },
    },
    components: {
        "van-form": Form,
        "van-field": Field,
        "van-button": Button
    },
    created() {
        this.$parent.title = "登陆";
        this.$parent.active = -1;
    }
};
</script>

<style lang="scss" scoped>
.registered {
    text-align: center;
    color: #666;
}
</style>
