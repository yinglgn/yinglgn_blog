<template>
  <div>
    <Card>
      <Form :model="formItem" :label-width="100">
        <Row :gutter="10">
          <Col span="24" >
            <Col span="5">
              <FormItem label="名称" >
                <Input v-model="formItem.name" placeholder="请输入名称"></Input>
              </FormItem>
            </Col>
            <Button type="primary" style="margin-left: 8px" @click="search">查询</Button>
            <Button type="info" style="margin-left: 8px" @click="showModal">新增</Button>
            <Button style="margin-left: 8px" @click="reset">重置</Button>
          </Col>
        </Row>
      </Form>
      <Table ref="table" highlight-row :loading="loading" :height="contentHeight" border :columns="columns" :data="tableData" style="margin-bottom: 20px"/></Table>
      <pages :total="total" :currentPage="currentPage" :pageSize="pageSize" @on-change="search" @on-page-size-change="search"></pages>
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>
    <Modals :apiType="apiType"></Modals>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getTagData, delTag } from '../api/tags'
import Pages from '@/components/pages'
import Modals from '../components/modal';
export default {
  components: {
    Tables, Pages, Modals
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
      if(this.formItem.name) {
        url += `&name=${encodeURI(this.formItem.name)}`
      }
      getTagData(url).then(res => {
        this.tableData = res.data.data
        this.total = res.data.count
      })
    },
    reset (params) {
      console.log(params)
    },
    close() {
      this.modal1 = false;
    },
    showModal(flag = false) {
      this.modal1 = true;
      this.apiType = flag
    },
    delFunc(id) {
      delTag(id).then(res => {
        this.$Notice.success({
          title: '删除标签成功！'
        })
        this.search();
      })
    }
  },
  data () {
    return {
      columns: [
        {
          title: '序号',
          width: 50,
          type: 'index'
        },
        {title: '名称', key: 'name'},
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
                  this.delFunc(params.row.id);
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
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                }
              }, [
                h('Icon', {
                  props: {
                    type: 'md-create',
                    size: 18,
                    color: '#000000'
                  }
                })
              ])
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
      pageSize: 20,
      modal1: false,
      apiType: null
    }
  }
}
</script>
