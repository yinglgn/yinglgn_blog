<template>
  <Row>
    <Form ref="articleForm" :model="form" :rules="rules" :label-width="80">
      <Col span="24">
        <FormItem label="文章标题">
          <Input v-model="form.title" placeholder="Enter something..."></Input>
        </FormItem>
      </Col>
      <Col span="24">
        <FormItem label="文章副标题">
          <Input v-model="form.subtitle" placeholder="Enter something..."></Input>
        </FormItem>
      </Col>
      <Col span="24">
        <FormItem label="文章描述">
          <Input v-model="form.metaDescription" placeholder="Enter something..."></Input>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="分类">
          <Select v-model="form.categoryId">
            <Option value="1">New York</Option>
            <Option value="2">London</Option>
            <Option value="3">Sydney</Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="标签">
          <Select v-model="form.select">
            <Option value="1">New York</Option>
            <Option value="2">London</Option>
            <Option value="3">Sydney</Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="是否原创">
          <i-switch v-model="form.isOriginal" size="large">
            <span slot="1">On</span>
            <span slot="0">Off</span>
          </i-switch>
        </FormItem>
      </Col>
      <Col span="24">
        <FormItem label="文章内容">
          <markdown-editor v-model="form.markdownContent"/>
        </FormItem>
      </Col>
      <Col span="24">
        <Button type="info" style="margin-left: 8px" @click="handleSubmit()">新增</Button>
      </Col>
    </Form>
  </Row>
</template>

<script>
  import MarkdownEditor from '_c/markdown'
  export default {
    components: {
      MarkdownEditor,
    },
    props: {
      usernameRules: {
        type: Array,
        default: () => {
          return [{
            required: true,
            message: '账号不能为空',
            trigger: 'blur'
          }]
        }
      },
      passwordRules: {
        type: Array,
        default: () => {
          return [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }]
        }
      }
    },
    data() {
      return {
        form: {
          categoryId: '',
          title: '',
          subtitle: '',
          pageImage: null,
          metaDescription: '',
          status: 1,
          isOriginal: 0,
          isDraft: 0,
          viewCount: 0,
          tag: [],
          markdownContent: ''
        },
        markdownContent: ''
      }
    },
    computed: {
      rules() {
        return {
          username: this.usernameRules,
          password: this.passwordRules
        }
      }
    },
    methods: {
      handleSubmit() {
        // this.$refs.articleForm.validate((valid) => {
          // if (valid) {
            this.$emit('on-sumbit', this.form)
          // }
        // })
      }
    }
  }
</script>
