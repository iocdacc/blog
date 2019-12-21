<template>
  <div class="m-logo">
    <img src="../assets/images/logo.png" alt />
  </div>
</template>

<script>
export default {
  name: "mLogo",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-logo {
  height: 50px;
  width: 50px;
  float: left;
}
</style>
