<template>
    <data-list></data-list>
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
