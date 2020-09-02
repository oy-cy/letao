<template>
    <div class="detail-container">
        <h3 class="title">{{ info.title }}</h3>
        <div class="subtitle">
            <span
                >发布时间: {{ info.add_time | dateFormat("YYYY-MM-DD") }}</span
            >
            <span>阅读:{{ info.click }}</span>
        </div>

        <div class="content" v-html="info.content"></div>
        <div class="comment">
            <van-cell-group>
                <van-field
                    v-model="message"
                    rows="2"
                    autosize
                    type="textarea"
                    maxlength="50"
                    placeholder="请写入好听的话"
                    show-word-limit
                />
            </van-cell-group>
            <van-button type="info" block @click="addComment()">评论</van-button>
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <van-cell v-for="item in Comments" :key="item.id">
                    <div>{{ item.user_name }} : {{ item.content }}</div>
                    <div>{{ item.add_time | dateFormat("YYYY-MM-DD") }}</div>
                </van-cell>
            </van-list>
        </div>
    </div>
</template>

<script>
import { newsDetailInfo, newsDetailComments,addNewsDetailComments } from "@/api/index.js";
import { Cell, CellGroup, Field, Button, List } from "vant";
export default {
    data() {
        return {
            id: this.$route.params.id,
            info: {},
            Comments: [],
            message: "",
            page: 1,
            loading: false,
            finished: false
        };
    },
    components: {
        "van-cell-group": CellGroup,
        "van-cell": Cell,
        "van-field": Field,
        "van-button": Button,
        "van-list": List
    },
    methods: {
        addComment(){
            var content = `content = ${this.message}`
            addNewsDetailComments(this.id,content)
            this.message = "";
        },
        async getNewsDetailInfo() {
            var { message } = await newsDetailInfo(this.id);
            this.info = message[0];
        },
        async getNewsDetailComments() {
            var { message } = await newsDetailComments(this.id, this.page);

            this.Comments = this.Comments.concat(message);
            console.log(this.Comments);
            // this.info  = message[0];
            // 数据全部加载完成
            if (message.length == 0) {
                this.finished = true;
                return;
            }
            this.page++;
            // 加载状态结束
            this.loading = false;
        },
        onLoad() {
            // 异步更新数据
            // setTimeout 仅做示例，真实场景中一般为 ajax 请求
            setTimeout(() => {
                this.getNewsDetailComments();
            }, 1000);
        }
    },
    created() {
        this.getNewsDetailInfo();
        this.getNewsDetailComments();
        this.$parent.title = "新闻详情";
        this.$parent.active = -1;
    }
};
</script>

<style lang="scss">
.detail-container {
    background-color: #faf9f9;
    padding: 0 10px;
    .title {
        font-size: 16px;
        text-align: center;
        padding: 10px 0;
    }
    .subtitle {
        display: flex;
        justify-content: space-between;
        color: #888;
        font-size: 13px;
        padding-bottom: 5px;
        border-bottom: 1px solid #888;
    }
    img {
        width: 100%;
    }
    .comment {
        .van-button {
            margin: 10px 0;
        }
    }
}
</style>
