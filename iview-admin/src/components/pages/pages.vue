<template>
  <Page
    :current="current"
    :total="total"
    :pageSize="pageSize"
    :pageSizeOpts="pageSizeOpts"
    :placement="placement"
    :size="size"
    :simple="simple"
    :transfer="transfer"
    :show-total="showTotal"
    :show-elevator="showElevator"
    :show-sizer="showSizer"
    :prev-text="prevText"
    :next-text="nextText"
    :class-name="className"
    :styles="styles"
    @on-change="onChange"
    @on-page-size-change="onPageSizeChange">
  </Page>
</template>
<script>
export default {
  name: 'pages',
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 20
    },
    pageSizeOpts: {
      type: Array,
      default () {
        return [1, 40, 60, 80]
      }
    },
    placement: {
      type: String,
      default: 'top'
    },
    size: {
      type: String,
      default: null
    },
    simple: {
      type: Boolean,
      default: false
    },
    transfer: {
      type: Boolean,
      default: true
    },
    showTotal: {
      type: Boolean,
      default: true
    },
    showElevator: {
      type: Boolean,
      default: false
    },
    showSizer: {
      type: Boolean,
      default: true
    },
    prevText: {
      type: String,
      default: ''
    },
    nextText: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: null
    },
    styles: {
      type: Object,
      default () {
        return {
          "text-align" : "right"
        }
      }
    },
  },
  methods: {
    onChange (currentPage) {
      let pageSize = this.pageSize
      this.$emit('on-change', { currentPage, pageSize })
    },
    onPageSizeChange (pageSize) {
      let currentPage = this.current
      this.$emit('on-page-size-change', { currentPage, pageSize })
    }
  }
}
</script>


