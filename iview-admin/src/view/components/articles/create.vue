<template>
  <div>
    <markdown-editor v-model="content"/>
  </div>
</template>

<script>
import MarkdownEditor from '_c/markdown'
export default {
  name: 'articles',
  components: {
    MarkdownEditor
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
