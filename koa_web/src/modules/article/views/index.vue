<template>
  <div class="article">
    <img alt="Vue logo" src="../../../assets/logo.png">
    <data-list></data-list>
  </div>
</template>

<script>
// @ is an alias to /src
import { getArticle } from '../api/articles.js'
import DataList from "../components/list";

export default {
  components: {
    DataList
  },
};
</script>
