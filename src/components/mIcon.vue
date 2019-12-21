<template>
  <div class="m-icon">123</div>
</template>

<script>
export default {
  name: "mIcon",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 图标 */
.m-icon{
    float: right;
    font-size: 1.1rem;
}
</style>