<template>
  <div id="yinglgn" class="container">
    <header-nav></header-nav>
    <router-view/>
  </div>
</template>

<script>
  import HeaderNav from "@/modules/header/views/index";

  export default {
    components: {
      HeaderNav
    },
  };
</script>

<style lang="scss">
  html {
    font-size: 12px;
    font-family: -apple-system,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Arial,sans-serif;
    text-rendering: optimizeLegibility;
    color: #333;
    background-color: #f4f5f5;
  }
</style>
