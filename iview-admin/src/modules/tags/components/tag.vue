<template>
  <Form ref="categoryForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="name">
      <Input v-model="form.name" placeholder="请输入名称">
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>提交</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'categoryForm',
  props: {
    nameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        name: '',
      }
    }
  },
  computed: {
    rules () {
      return {
        name: this.nameRules,
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-submit', this.form)
        }
      })
    }
  }
}
</script>
