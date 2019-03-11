<template>
  <section>
    <header class="markdown-editor">
      <Input v-model="form.title" placeholder="输入文章标题..." @on-change="handleTitleChange"/>
      <div class="right-box">
        <div class="status-text" v-show="isSaveFlag">
          保存中...
        </div>
        <div :title="'最近保存于 ' + draftTime" class="status-text" v-show="!isSaveFlag">
          已保存至<a href="/editor/drafts">草稿</a>
        </div>
        <div class="editor-draft" >
          <span @click="handleToggleDraft">
            发布
            <Icon :size="20" :type=" isToggleDraft ? 'md-arrow-dropup' : 'md-arrow-dropdown'"></Icon>
          </span>
          <div class="dropdown draft-btn" v-show="isToggleDraft">
            <div class="title">发布文章</div>
            <div class="category-box">
              <div class="sub-title">分类</div>
              <ul>
                <li v-for="(item, index) in categorysList" :class="{'active': form.categoryId == item.id}" @click="handleCategory(index, item)">{{ item.name }}</li>
              </ul>
            </div>
            <div class="tag-box">
              <div class="sub-title">标签</div>
              <ul v-show="tagsArr.length">
                <li v-for="(item, index) in tagsArr" @click="delTag(index, item)" class="tag-li active">{{ item.name }}</li>
              </ul>
              <div class="tag-input" v-show="!tagsArr.length">
                <Input v-model="tagName" placeholder="添加1个标签" @on-change="handleInputChange" />
                <ul>
                  <li v-for="(item, index) in tagsList" @click="handleTagChoose(item)">{{ item.name }}</li>
                </ul>
              </div>
            </div>
            <Button @click="handleSubmit">确定并发布</Button>
          </div>
        </div>
        <!-- <div class="user-avator-dropdown">
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
        </div> -->
      </div>
    </header>
    <div v-show="isLoading">
      <markdown-editor v-model="form.markdownContent" @on-change="handleMarkdown"  />
    </div>
  </section>
</template>

<script>
  import MarkdownEditor from '_c/markdown'
  import { addArticleData, editArticleData } from '../api/articles'
  import { getTagData } from '@@/tags/api/tags'
  import { getCategoryData } from '@@/categorys/api/categorys'
  import { debounce } from '@/libs/util'
  export default {
    components: {
      MarkdownEditor,
    },
    props: {
      form: {
        type: Object,
        default: () => ({})
      }
    },
    watch:{
      "form.id": function(val, oldVal){
        this.tagsArr = this.form.tags;
        // localStorage.markdownContent = this.form.markdownContent;
        this.isLoading = true;
        this.draftTime = new Date(this.form.updatedAt).Format('yyyy-MM-dd hh:mm:ss');
      },
    },
    mounted() {
      this.getCategorys();
      if(!this.form.id) {
        this.isLoading = true;
      }
    },
    methods: {
      addDraft(obj) {
        addArticleData(obj).then(res => {
          this.isSaveFlag = false;
          this.$emit("on-sumbit", "articles_edit", res.data.data.id)
        })
      },
      editDraft(obj) {
        editArticleData(obj).then(res => {
          this.isSaveFlag = false;
          this.draftTime = new Date(res.data.updatedAt).Format('yyyy-MM-dd hh:mm:ss');
        })
      },
      handleSubmit() {
          if(!this.form.title) {
            this.$Notice.error({
              title: '请输入标题',
            })
            return false;
          }
          if(!this.form.categoryId) {
            this.$Notice.error({
              title: '请选择分类',
            })
            return false;
          }
          if(!this.form.tag.length) {
            this.$Notice.error({
              title: '请选择标签',
            })
            return false;
          }
          addArticleData(this.form).then(res => {
            this.$emit('on-sumbit', 'articles_list')
          })
      },
      getCategorys() {
        getCategoryData().then( res => {
          this.categorysList = res.data.data;
          this.form.categoryId = this.categorysList[0].id;
        })
      },
      getTags() {
        let url = `?name=${this.tagName}`;
        getTagData(url).then( res => {
          this.tagsList = res.data.data;
        })
      },
      handleCategory(index, item) {
        this.form.categoryId = item.id;
        this.saveDraft();
      },
      handleToggleDraft() {
        this.isToggleDraft = !this.isToggleDraft;
      },
      handleTagChoose(item) {
        this.tagsArr = [];
        this.tagsArr.push(item)
        this.form.tag.push(item.id);
        this.saveDraft();
      },
      handleTitleChange() {
        this.saveDraft();
      },
      handleMarkdown(item) {
        console.log(item);
      },
      delTag() {
        this.tagsArr = [];
        this.form.tag = [];
        this.saveDraft();
      },
      saveDraft() {
        if(this.form.title) {
          this.handleSaveDraft();
        }
      },
      //防抖函数
      handleInputChange: debounce(function() {
        this.getTags();
      }, 1000),
      handleSaveDraft: debounce(function() {
        this.isSaveFlag = true;
        if(this.form.id) {
          this.editDraft(this.form);
        } else {
          this.addDraft(this.form);
        }
      }, 3000),
    },
    data() {
      return {
        isLoading: false,
        tagName: '',
        categorysList: [],
        tagsList: [],
        tagsArr: [],
        isToggleDraft: false,
        draftTime: '',
        isSaveFlag: false,
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
    input {
      margin: 0;
      padding: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: #000;
      border: none;
      outline: none;
      flex: 1 1 auto;
      height: 100%;
      &:focus {
        outline: none;
        box-shadow: none;
      }
    }
    .right-box {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      > div {
        padding: 0 1rem;
      }
      .status-text {
        font-size: 1rem;
        white-space: nowrap;
        color: #ddd;
        cursor: default;
        user-select: none;
        a {
          margin: 0 0 0 .4rem;
          padding: .2rem .4rem;
          color: inherit;
          text-decoration: none;
          border: 1px solid currentColor;
          border-radius: 2px;
          &:hover {
            color: #ccc;
          }
        }
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
          padding: 1.5rem;
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
          .category-box, .tag-box {
            margin-bottom: 1rem;
            .sub-title {
              margin-bottom: 0.75rem;
              font-size: 1rem;
            }
            > ul li {
              display: inline-block;
              margin: 0 .45rem .6rem 0;
              padding: .35rem .5rem;
              font-size: .875rem;
              white-space: nowrap;
              border: 1px solid #f1f1f1;
              border-radius: 2px;
              cursor: pointer;
              &:hover, &.active {
                color: #007fff;
                border-color: rgba(0,127,255,.15);
                background-color: rgba(0,127,255,.05);
              }
            }
            .tag-input {
              position: relative;
              input {
                padding: .2rem 0;
                width: 100%;
                font-size: .85rem;
                border: none;
                border-bottom: 1px solid #f1f1f1;
                border-radius: 0;
                outline: none;
                &:focus {
                  outline: none;
                  box-shadow: none;
                }
              }
              > ul {
                position: absolute;
                background: #fff;
                border: 1px solid #ddd;
                width: 8rem;
                margin-top: 1px;
                li {
                  display: block;
                  padding: .3rem .7rem;
                  cursor: pointer;
                  width: 100%;
                  font-size: 1rem;
                  &:hover {
                    color: #2b85e4;
                  }
                }
              }
            }
            .tag-li {
              margin: 0 .45rem 0 0;
            }
          }
          > button[type="button"] {
            display: block;
            color: #2b85e4;
            background-color: white;
            border-color: #2b85e4;
            margin: 0 auto;
            &:hover {
              color: #007fff;
              border-color: rgba(0,127,255,.15);
              background-color: rgba(0,127,255,.05);
            }
          }
        }
      }
    }
  }
  .ivu-message {
    z-index: 10001 !important;
    top: 45% !important;
  }
</style>
