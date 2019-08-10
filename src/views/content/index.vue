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
        <!-- <el-select v-model="reqParams.channel_id" clearable placeholder="请选择·">
          <el-option
            v-for="item in channelOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id "
          ></el-option>
        </el-select> -->
     <my-channel v-model="reqParams.channel_id"></my-channel>
      </el-form-item>
        <el-form-item label="日期：" >
          <el-date-picker
          @change="solar"
          value-format="yyyy-MM-dd"
            v-model="dataArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">筛选</el-button>
      </el-form-item>
    </el-form>
  </el-card>
<el-card>
<div slot="header">根据筛选条件共查询到 {{total}}条结果：</div>

      <el-table :data="tableData">
        <el-table-column  label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" fit='cover'  style="width:120px;height:80px">
               <div slot="error" class="image-slt">
              <img src="../../../public/images/error.gif" alt="" style="width:120px;height:80px">
            </div>
            </el-image>
          </template>

        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" >
          <template slot-scope="scope">
               <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
               <el-tag v-if="scope.row.status===1">待审核</el-tag>
               <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
               <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
               <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
        <template slot-scope="scope" >
         <el-button type="primary" icon="el-icon-edit" @click="edit(scope.row.id)" plain circle></el-button>
          <el-button type="danger" icon="el-icon-delete"  @click="del(scope.row.id)" plain circle></el-button>
        </template>
        </el-table-column>
      </el-table>
          <div style="text-align:center;margin-top:30px;">
<el-pagination background layout="prev, pager, next, total" :total="total" :page-size="reqParams.per_page" @current-change='changePager'></el-pagination>
      </div>
</el-card>
</div>
</template>

<script>
// import { async } from 'q'

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
      // channelOptions: [],
      dataArr: [],
      tableData: [],
      total: 0
    }
  },
  // watch: {
  // //   total (newVal, oldVal) {  }
  //   'reqParams.channel_id': function (newVal, oldVal) {
  //     if (newVal === '') {
  //       this.reqParams.channel_id = null
  //     }
  //   }
  // },
  created () {
  //   this.getChannelOptions()
    this.getArticles()
  },
  methods: {
    edit (id) {
      this.$router.push('/publish/?id' + id)
    },
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`articles/${id}`)
        this.$message.success('删除文件成功')
        this.getArticles()
      }).catch(() => {})
    },

    // 时间列表！
    solar (dataArr) {
      if (dataArr) {
        this.reqParams.begin_pubdate = dataArr[0]
        this.reqParams.end_pubdate = dataArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    search () {
      this.reqParams.page = 1
      this.getArticles()
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    // async getChannelOptions () {
    //   const { data: { data } } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },
    async  getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.tableData = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style lang=less>
</style>
