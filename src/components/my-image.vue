<template>
  <div class="my-image">
    <div class="img-btn" @click="openDialog">
      <img :src="value||defaultImage" alt />
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image" size="mini">
          <el-radio-group v-model="reqParams.collect" @change="changeCollect">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img-list">
            <div
              class="img-item"
              :class="{selected:selectedImageUrl===item.url}"
              @click="selectedImageUrl=item.url"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <el-pagination
            v-if="total > reqParams.per_page"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleSuccess"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import defaultImage from '../../public/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      defaultImage,
      images: [],
      total: 0,
      uploadImageUrl: null,
      selectedImageUrl: null,
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },

  methods: {
    confirmImage () {
      if (this.activeName === 'image') {
        // this.value = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
      } else {
        // this.value = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false
    },
    // 确认图片

    handleSuccess (res) {
      // console.log(res.data)
      this.uploadImageUrl = res.data.url
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    openDialog () {
      this.dialogVisible = true
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less">
.img-btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}
.img-list {
  margin-top: 10px;
  .img-item {
    width: 160px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 15px;
    margin-bottom: 10px;
    position: relative;
    &.selected {
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2) url(../../public/images/selected.png)
          no-repeat center / 50px 50px;
      }
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: contain;
    }
  }
}
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
