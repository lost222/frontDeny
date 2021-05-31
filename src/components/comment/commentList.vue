<template>
<!--  <div>-->
<!--    <ul id="v-for-object" class="demo">-->
<!--      <li v-for="value in object" v-bind:key="value.id">-->
<!--        {{ value }}-->
<!--      </li>-->
<!--    </ul>-->
<!--  </div>-->

  <div>
    <a-table
      rowKey="ID"
      :columns="columns"
      :pagination=false
      :dataSource="Feeds"
      bordered
      @change="handleTableChange"
    >
    </a-table>
  </div>

</template>

<script>
import day from 'dayjs'

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    width: '20%',
    key: 'title',
    align: 'center',
  },
  {
    title: '更新日期',
    dataIndex: 'published',
    width: '10%',
    key: 'published',
    align: 'center',
    customRender: (val) => {
      return val ? day(val).format('YYYY年MM月DD日 HH:mm') : '暂无'
    },
  },
  {
    title: '内容描述',
    dataIndex: 'description',
    width: '60%',
    key: 'description',
    align: 'center',
  },
]
export default {
  props: ['id'],
  data() {
    return {
      columns,
      Feeds : [],
    }
  },
  created() {
    // this.getCateList()
    this.getFeed()
  },
  methods: {
    async getFeed() {
      console.log("getFeed")
      console.log(this.$route.params.id)
      const { data: res } = await this.$http.get('feed/info', {
        params: {
          // username: this.queryParam.username,
          feedid: this.$route.params.id
        },
      })
      console.log(res.status)

      if (res.status !== 200) {
        if (res.status === 1004 || 1005 || 1006 || 1007) {
          window.sessionStorage.clear()
          this.$router.push('/login')
        }
        this.$message.error(res.message)
      }
      this.Feeds = res.feed.items
      console.log(this.Feeds)
    },
    handleTableChange(pagination, filters, sorter) {
      var pager = { ...this.pagination }
      pager.current = pagination.current
      pager.pageSize = pagination.pageSize
      this.queryParam.pagesize = pagination.pageSize
      this.queryParam.pagenum = pagination.current

      if (pagination.pageSize !== this.pagination.pageSize) {
        this.queryParam.pagenum = 1
        pager.current = 1
      }
      this.pagination = pager
      this.getArtList()
    },
  },

}
</script>
