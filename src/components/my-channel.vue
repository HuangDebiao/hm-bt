<template>
  <el-select :value="value" clearable placeholder="请选择" @change="fn">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    // 获取频道下拉选项数据
    this.getChannelOptions()
  },
  methods: {
    fn (val) {
      // 后端不支持空字符问题
      if (val === '') val = null
      // 提交给父组件
      this.$emit('input', val)
    },
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style>

</style>
