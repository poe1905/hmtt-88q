<template>
<div>
    <p>你好青春</p>
    <slot :msg='msg'>啦啦啦啦啦</slot>
</div>
</template>

<script>
export default {
  data () {
    return {
      msg: '四川成都'
    }
  }

}
</script>

<style>

</style>
