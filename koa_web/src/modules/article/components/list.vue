<template>
  <div class="article row">
    <div class="col-md-10 offset-md-1">
      <ul class="list-unstyled">
        <li class="media" v-for="(item, index) in dataList" :key="index">
          <div data-src="https://user-gold-cdn.xitu.io/2019/1/16/16854d3cce53ce9c?imageView2/1/w/120/h/120/q/85/format/webp/interlace/1" class="thumbnail" style="background-image: url(&quot;https://user-gold-cdn.xitu.io/2019/1/16/16854d3cce53ce9c?imageView2/1/w/120/h/120/q/85/format/webp/interlace/1&quot;);/* background-size: cover; */"></div>
          <div class="media-body text-left">
            <div class="info">
              <i class="fa fa-clock-o" aria-hidden="true"></i>
              2017-20-50
              <i class="fa fa-user-circle-o" aria-hidden="true"></i>
              yinglgn
            </div>
            <div class="media-heading">
              <router-link :to="'/article/' + item.id" v-text="item.title"></router-link>
            </div>
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
    search({ currentPage = 1, pageSize = 20 } = {}) {
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
.article ul li.media {
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;
  .thumbnail {
    position: relative;
    flex: 0 0 auto;
    width: 5rem;
    height: 5rem;
    margin-right: 2rem;
    background-color: #fff;
    border-radius: 2px;
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .media-body {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
    .media-heading {
      margin: .5rem 0 1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      > a {
        color: #333;
        font-weight: 700;
        line-height: 1.2;
        font-size: 1.4rem;
      }
    }
  }
}
</style>
