<template>
  <detail-list :id="id"></detail-list>
</template>

<script>
// @ is an alias to /src
import DetailList from "../components/detail";

export default {
  components: {
    DetailList
  },
  data() {
    return {
      id: this.$route.params.id
    }
  },
};
</script>
