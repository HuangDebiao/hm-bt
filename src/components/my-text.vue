<template>
    <div class="container">
        <div class="header">header</div>
        <div class="content">
            <slot :msg='msg' a='10'></slot>
        </div>
        <div class="footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: 'my-test',
  data () {
    return {
      msg: '内部组件'
    }
  }

}
</script>

<style>

</style>
