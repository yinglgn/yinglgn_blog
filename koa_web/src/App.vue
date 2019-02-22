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
  @import '@/assets/scss/public.scss'
</style>
