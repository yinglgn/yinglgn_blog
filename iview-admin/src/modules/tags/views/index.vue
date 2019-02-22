<template>
  <div>
    <Card>
      <Form :model="formItem" :label-width="100">
        <Row :gutter="10">
          <Col span="24" >
            <Col span="5">
              <FormItem label="公众号名称" >
                <Input v-model="formItem.wxName" placeholder="请输入公众号名称"></Input>
              </FormItem>
            </Col>
            <Button type="primary" style="margin-left: 8px" @click="search">查询</Button>
            <Button type="info" style="margin-left: 8px" @click="goUrl('articles_add')">新增</Button>
            <Button style="margin-left: 8px" @click="reset">重置</Button>
          </Col>
        </Row>
      </Form>
      <Table ref="table" highlight-row :loading="loading" :height="contentHeight" border :columns="columns" :data="tableData" style="margin-bottom: 20px"/></Table>
      <pages :total="total" :currentPage="currentPage" :pageSize="pageSize" @on-change="search" @on-page-size-change="search"></pages>
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getArticleData } from '../api/articles'
import Pages from '@/components/pages'
export default {
  name: 'articles',
  components: {
    Tables, Pages
  },
  created () {
    this.contentHeight = document.documentElement.clientHeight - 300;
  },
  mounted () {
    this.search();
  },
  methods: {
    search({ currentPage = 1, pageSize = 20 } = {}) {
      this.currentPage = currentPage;
      this.pageSize = pageSize;
      let url = `?page=${currentPage}&size=${pageSize}`
      getArticleData(url).then(res => {
        this.tableData = res.data.data
        this.total = res.data.count
      })
    },
    reset (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  data () {
    return {
      columns: [
        {title: 'title', key: 'title', sortable: true},
        {title: 'subtitle', key: 'subtitle'},
        {title: 'metaDescription', key: 'metaDescription'},
        {title: 'content', key: 'content'},
        {
          title: 'Handle',
          key: 'handle',
          render: (h, params, vm) => {
            return h('Poptip', {
              props: {
                confirm: true,
                title: '你确定要删除吗?'
              },
              on: {
                'on-ok': () => {
                  vm.$emit('on-delete', params)
                  vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                }
              }
            }, [
              h('Button', {
                props: {
                  type: 'text',
                  ghost: true
                }
              }, [
                h('Icon', {
                  props: {
                    type: 'md-trash',
                    size: 18,
                    color: '#000000'
                  }
                })
              ]),
              h('Button', '自定义删除')
            ])
          }
        }
      ],
      tableData: [],
      loading: false,
      formItem: {},
      contentHeight: '',
      total: 0,
      currentPage: 1,
      pageSize: 20
    }
  }
}
</script>
