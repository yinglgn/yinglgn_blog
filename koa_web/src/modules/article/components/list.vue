<template>
  <div id="article" class="container row">
    <div class="col-md-10 offset-md-1">
      <ul class="list-unstyled">
        <li v-for="(item, index) in dataList" :key="index">
          <h2>
            <router-link :to="'/article/' + item.id">{{ item.title }}</router-link>
          </h2>
          <small>
            <span class="date" v-text="item.createAt"></span>by
            <span class="author" v-text="item.author"></span>
            阅读 {{ item.viewcount }} 次
          </small>
          <div class="entry">
            <img src="https://image.zhangxinxu.com/image/blog/201902/column-combin.png" width="161" height="100" alt="列选择符" class="pull-right">
            <p v-text="item.metaDescription"></p>
            <p>
              <router-link :to="item.id">阅读全文...</router-link>
            </p>
          </div>
          <div class="tag">
            <span>标签：</span>
            <router-link :to="item.id">col</router-link>
          </div>
          <div class="release">
            <span>发布在&nbsp;&nbsp;</span>
            <router-link :to="item.id">col</router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getArticle } from '../api/articles.js'
export default {
  mounted() {
    this.search();
  },
  methods: {
    search({ currentPage = 1, pageSize = 10 } = {}) {
      this.currentPage = currentPage;
      this.pageSize = pageSize;
      let url = `?page=${currentPage}&size=${pageSize}`;
      getArticle(url).then(res => {
        this.dataList = res.data.data;
        this.total = res.data.count;
      });
    }
  },
  data() {
    return {
      currentPage: 0,
      pageSize: 0,
      total: 0,
      dataList: []
    };
  }
};
</script>

<style lang="scss">
#article {
  ul li {
    margin: 0 0 40px;
    text-align: justify;
    text-justify: inter-ideograph;
    font-size: medium;
    .entry {
      padding: 5px 0;
      line-height: 1.7;
      font-size: medium;
      > img {
        padding: 4px;
        margin: 0 0 2px 7px;
        display: inline;
      }
      p {
        margin: 6px 0;
        word-break: break-all;
      }
    }
    .tag, .release {
      padding-top: 5px;
      font-size: 1.4rem;
    }
  }
}
</style>
