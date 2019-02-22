<template>
  <div id="article-detail" class="row">
    <div class="col-md-10 offset-md-1">
      <div class="editor-preview" v-html="data.content"></div>
    </div>
  </div>
</template>

<script>
import { getArticleDetail } from '../api/articles'
import 'simplemde/dist/simplemde.min.css'
export default {
  mounted() {
    this.search();
  },
  props: {
    id: {
      type: String,
      default: 0
    },
  },
  methods: {
    search() {
      getArticleDetail(this.id).then(res => {
        this.data = res.data.data;
      });
    }
  },
  data() {
    return {
      data: {}
    };
  }
};
</script>

<style lang="scss">
#article-detail {
  .editor-preview {
    display: block;
    position: relative;
    background: #fff;
    font-size: 1rem;
    line-height: 1.7;
    h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
      font-weight: bold;
      line-height: 1.7;
    }
    h1 {
      margin: 2rem 0;
      line-height: 1.2;
      font-size: 2rem;
    }
    h2 {
      margin: 1.25rem 0;
      font-size: 1.5rem;
    }
    h3 {
      margin: 1.1875rem 0;
      font-size: 1.17rem
    }
    h4 {
      margin: 1.3125rem 0;
      font-size: 1rem
    }
    h5 {
      margin: 1.375rem 0;
      font-size: .825rem
    }
    h6 {
      margin: 1.75rem 0;
      font-size: .675rem
    }
    p {
      margin: 1rem 0;
    }
    img, video {
      max-width: 100%;
      max-height: 668px;
    }
    blockquote {
      margin: 1em 0;
      border-left: 4px solid #ddd;
      padding: 0 1em;
      color: #666;
    }
    a {
      color: #259;
      text-decoration: underline;
    }
    code, kbd, pre, samp {
      font-family: Menlo,Monaco,Consolas,Courier New,monospace;
      line-height: 1.4375rem;
      display: block;
      white-space: pre;
      margin: 1em 0px;
    }
    pre > code {
      font-size: .8rem;
      padding: .375rem .75em;
      margin: 0;
      word-break: normal;
      display: block;
      color: #333;
    }
    thead {
      background: #f6f6f6;
      color: #000;
      text-align: left;
    }
    td {
      min-width: 5.625em;
    }
  }
}
</style>
