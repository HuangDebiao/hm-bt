<template>
<div>
  <el-card>
    <div slot="header" class="clearfix">
  <my-bard>内容管理</my-bard>
    </div>
    <el-form label-width="80px" size="small">
      <el-form-item label="状态:">
        <el-radio-group v-model="reqParams.status">
          <el-radio :label="null">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道:">
        <el-select v-model="reqParams.channel_id" placeholder="请选择·">
          <el-option
            v-for="item in changeArr"
            :key="item.id"
            :label="item.name"
            :value="item.id "
          ></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dataArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      <el-form-item>
        <el-button type="primary">筛选</el-button>
      </el-form-item>
    </el-form>
  </el-card>
<el-card>
<div slot="header">根据筛选条件共查询到 0 条结果：</div>

      <el-table :data="tableData">
        <el-table-column  label="封面">
          <template slot-scope="scope">
            <img :src="scope.row.cover.images[0]" alt="">
          </template>
        </el-table-column>
      </el-table>
          <div style="text-align:center;margin-top:30px;">
        <el-pagination background layout="prev, pager, next, total" :total="1000"></el-pagination>
      </div>
</el-card>
</div>
</template>

<script>
// import MyBard from '@/components/my-bard'
export default {
  // components: { MyBard },
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      changeArr: [],
      dataArr: [],
      tableData: []
    }
  },
  created () {
    this.down()
    this.getArticles()
  },
  methods: {
    async down () {
      const { data: { data } } = await this.$http.get('channels')
      this.changeArr = data.channels
    },
    async  getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.tableData = data.results
    }
  }
}
</script>

<style lang=less>
</style>
