<template>
  <Modal
    v-model="modal6"
    :title="`${title}分类`"
    footer-hide>
    <div>
      <category @on-submit="handleSubmit"></category>
    </div>
    <Spin size="large" fix v-if="isShow"></Spin>
  </Modal>
</template>
<script>
import Category from './category'
import { addCategoryData, editCategoryData } from '../api/categorys';
export default {
  name: 'categoryForm',
  components: {
    Category
  },
  props: {
    apiType: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleSubmit (object) {
      let _this = this
      _this.isShow = true;
      let func = _this.apiType ? editCategoryData : addCategoryData;
      _this.title = _this.apiType ? "修改" : "新增";
      func(object).then(res => {
        if (res.code === 1) {
          _this.$Notice.success({
            title: `${title}分类成功！`
          })
          _this.$emit('on-close')
        } else {
          _this.$Notice.error({
            title: res.data
          });
        }
        _this.isShow = false;
      })
    }
  },
  data () {
    return {
      title: '',
      isShow: false
    }
  },
}
</script>
