<template>
  <articles-form @on-sumbit="add"></articles-form>
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
    add(obj) {
      addArticleData(obj).then(res => {
        jumpRouter(this.$router, 'articles_list')
      })
    },
    reset (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  data () {
    return {
      content: ''
    }
  }
}
</script>

<style>

</style>
