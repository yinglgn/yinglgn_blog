<template>
  <div class="markdown-wrapper">
    <textarea ref="editor"></textarea>
  </div>
</template>

<script>
import Simplemde from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
export default {
  name: 'MarkdownEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    localCache: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(val) {
      console.log(val)
      this.editor.value(val)
    }
  },
  data () {
    return {
      editor: null
    }
  },
  methods: {
    addEvents () {
      this.editor.codemirror.on('change', () => {
        let value = this.editor.value()
        // if (this.localCache) localStorage.markdownContent = value
        this.$emit('input', value)
        this.$emit('on-change', value)
      })
      this.editor.codemirror.on('focus', () => {
        this.$emit('on-focus', this.editor.value())
      })
      this.editor.codemirror.on('blur', () => {
        this.$emit('on-blur', this.editor.value())
      })
    }
  },
  mounted () {
    this.editor = new Simplemde(Object.assign(this.options, {
      element: this.$refs.editor,
      autosave: {
        enabled: true,
        uniqueId: "demo",//必须设置
        delay: 10000,//时间间隔默认 10s
      },
    }))
    this.editor.toggleSideBySide()
    /**
     * 事件列表为Codemirror编辑器的事件，更多事件类型，请参考：
     * https://codemirror.net/doc/manual.html#events
     */
    this.addEvents()
    let content = localStorage.markdownContent
    if (!content) this.editor.value(this.value)
  }
}
</script>

<style lang="less">
.markdown-wrapper{
  margin-top: 4rem;
  .editor-toolbar.fullscreen{
    z-index: 9999;
    top: 4rem;
  }
  .CodeMirror-fullscreen{
    z-index: 9999;
    top: 7.125rem;
  }
  .CodeMirror-fullscreen ~ .editor-preview-side{
    z-index: 9999;
    top: 7.125rem;
  }
  .editor-preview-side {
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
