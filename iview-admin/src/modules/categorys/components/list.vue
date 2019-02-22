<template>
  <section>
    <header class="markdown-editor">
      <input type="text" v-model="form.title" placeholder="输入文章标题...">
      <div class="right-box">
        <div title="最近保存于 2019/2/21 下午7:29:05" class="status-text status-text with-padding" style="">
          已保存至<a href="/editor/drafts">草稿</a>
        </div>
        <div class="editor-draft">
          <span>发布</span>
          <Icon :size="24" type="md-arrow-dropdown"></Icon>
          <div class="dropdown draft-btn">
            <div class="title">发布文章</div>
            <div class="category-box">
              <div class="sub-title"></div>
              <div class="category-list"></div>
            </div>
          </div>
        </div>
        <div class="user-avator-dropdown">
          <Dropdown trigger="click"  @on-click="handleClick">
            <Badge :dot="!!messageUnreadCount">
              <Avatar :src="userAvator"/>
            </Badge>
            <Icon :size="18" type="md-arrow-dropdown"></Icon>
            <DropdownMenu slot="list">
              <DropdownItem name="message">
                消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
              </DropdownItem>
              <DropdownItem name="logout">退出登录</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
    <markdown-editor v-model="form.markdownContent"/>
  </section>
</template>

<script>
  import MarkdownEditor from '_c/markdown'
  export default {
    components: {
      MarkdownEditor,
    },
    props: {
      rows: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      rows (newVal, oldVal) {
        this.form = newVal
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

<style lang="less">
  header.markdown-editor {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 1.4rem;
    height: 4rem;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    z-index: 10000;
    .left-box {
      display: flex;
      align-items: center;
    }
    > input {
      margin: 0;
      padding: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: #000;
      border: none;
      outline: none;
      flex: 1 1 auto;
      height: 100%;
    }
    .right-box {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      > div {
        padding: 0 1rem;
      }
      .editor-draft {
        font-size: 1rem;
        white-space: nowrap;
        color: #007fff;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        position: relative;
        .dropdown {
          position: absolute;
          right: 0;
          top: 1rem;
          margin: 1.75rem -3rem 0 0;
          padding: 1.3125rem;
          border: 1px solid #ddd;
          border-radius: 2px;
          white-space: normal;
          width: 25rem;
          font-size: .875rem;
          color: #999;
          background: #fff;
          box-shadow: 0 1px 2px #f1f1f1;
          cursor: default;
          user-select: none;
          z-index: 100;
          &::before {
            content: '';
            width: 1rem;
            height: 1rem;
            position: absolute;
            top: -.51rem;
            right: 5.7rem;
            background: #fff;
            border: 1px solid #ddd;
            border-right: none;
            border-bottom: none;
            transform: rotate(45deg);
            z-index: 10000;
          }
        }
        .draft-btn {
          .title {
            margin-bottom: 1.125rem;
            font-size: 1.1875rem;
            font-weight: 700;
            color: hsla(218,9%,51%,.8);
          }
        }
      }
    }
  }
</style>
