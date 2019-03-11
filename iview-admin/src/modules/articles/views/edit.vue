<template>
  <articles-form @on-sumbit="goUrl" :form="form"></articles-form>
</template>

<script>
import ArticlesForm from '../components/articles'
import { getById } from '../api/articles'
import { jumpRouter } from '@/libs/util'
export default {
  components: {
    ArticlesForm
  },
  mounted() {
    this.seach(this.id)
  },
  methods: {
    goUrl(name) {
      jumpRouter(this.$router, name)
    },
    seach(id) {
      getById(id).then( res => {
        this.form = res.data.data;
      })
    }
  },
  data () {
    return {
      id: this.$route.params.id,
      form: {}
    }
  }
}
</script>

<style>

</style>
