<template>
  <div class="m-showText"></div>
</template>

<script>
export default {
  name: "showText",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 演示文字 */
.m-showText {
  min-height: 105px;
}
</style>