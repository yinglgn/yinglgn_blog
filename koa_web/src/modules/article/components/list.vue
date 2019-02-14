<template>
  <section>
    <ul>
      <li v-for="(item, index) in dataList">
        <span v-html="item.content"></span>
      </li>
    </ul>
  </section>
</template>

<script>
  import { getArticle } from '../api/articles.js'
  export default {
    mounted() {
      this.search()
    },
    methods: {
      search({
        currentPage = 1,
        pageSize = 20
      } = {}) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        let url = `?page=${currentPage}&size=${pageSize}`
        getArticle(url).then(res => {
          this.dataList = res.data.data
          this.total = res.data.count
        })
      },
    },
    data() {
      return {
        currentPage: 0,
        pageSize: 0,
        total: 0,
        dataList: []
      }
    },
  }
</script>

<style scoped>

</style>
