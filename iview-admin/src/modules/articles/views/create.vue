<template>
  <articles-form @on-sumbit="goUrl" :form="form"></articles-form>
</template>

<script>
import ArticlesForm from '../components/articles'
import { addArticleData } from '../api/articles'
import { jumpRouter } from '@/libs/util'
export default {
  components: {
    ArticlesForm
  },
  methods: {
    goUrl(name, id) {
      jumpRouter(this.$router, name, id)
    }
  },
  data () {
    return {
      form: {
        categoryId: '',
        title: '',
        metaDescription: '',
        tag: [],
        markdownContent: ''
      },
    }
  }
}
</script>

<style>

</style>
