<template>
  <div class="newslist_container">
    <van-loading v-if="isShow" :vertical="true" type="spinner" color="#ccc" size="30px">加载中...</van-loading>

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="newslist">
        <div class="item" v-for="item in newslist" :key="item.id" @click = jump(item.id) >
          <div class="img_container">
            <img v-lazy="item.img_url" alt>
          </div>
          <div class="text">
            <div class="title">{{ item.title }}</div>
            <div class="info">
              <span>发布时间：{{ item.add_time | dateFormat('YYYY-MM-DD') }}</span>
              <span>点击次数：{{ item.click }}</span>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <van-button
      :loading="isMore"
      v-if="hasButton"
      type="info"
      @click="loadMore"
      block
      loading-text="加载中....."
    >加载更多</van-button>
  </div>
</template>

<script>
import { getNewsListData } from "@/api/index.js";
import { PullRefresh, Toast, Button, Loading } from "vant";
// import moment from 'moment';
export default {
  name: "newslist-component",
  data() {
    return {
      newslist: [],
      isLoading: false,
      isMore: false,
      page: 1,
      pagesize: 10,
      hasData: true,
      isShow: false,
      hasButton: true
    };
  },
  methods: {
        jump(id){
            this.$router.push(`/newsDetail/${id}`);
        },
    async getNewsList() {
      this.hasButton = true; // 显示下面的加载更多按钮
      if (this.hasData == false) {
        Toast("亲，已经没数据了");
        this.isMore = false;
        return;
      }

      var { message } = await getNewsListData(this.page, this.pagesize);
      this.isMore  = this.isShow = false;
      if (message.length == 0) {
        Toast("加载完所有的数据");
        this.hasData = false;
        return;
      }
      this.newslist = this.newslist.concat(message);
    },
    onRefresh() {
      this.page = 1;
      this.newslist = [];
      this.hasData = this.isShow = true;
      this.hasButton = false;
      setTimeout(() => {
        this.isLoading = false;
        this.getNewsList();
        Toast("加载成功");
      }, 500);
    },
    loadMore() {
      this.page++;
      this.isMore = true;
      this.getNewsList();
    }
  },
  created() {
    this.$parent.title = "新闻列表";
    this.$parent.active = -1;
    this.getNewsList();
  },
  components: {
    "van-pull-refresh": PullRefresh,
    "van-button": Button,
    "van-loading": Loading
  }
};
</script>

<style lang="scss" scoped>
.newslist_container {
  .newslist {
    padding: 4px;
    background-color: rgb(241, 235, 235);
    .item {
      display: flex;
      justify-content: center;
      border-bottom: 1px solid #ccc;
      margin-top: 8px;

      .img_container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2px;
        width: 100px;
        height: 100px;

        img {
          width: 100px;
          height: 100%;
        }
      }

      .text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 2px;

        .title {
          color: #000;
          font-size: 14px;
          margin-top: 10px;
          font-weight: 700;

          overflow: hidden;

          // 限制两行文本，超出显示省略号
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .info {
          display: flex;
          justify-content: space-between;
          color: #888;
          font-size: 12px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
