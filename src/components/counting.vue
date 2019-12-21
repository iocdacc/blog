<template>
  <div class="m-counting">
    <ul class="clear">
      <li>555555</li>
      <li>Find me on .</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "counting",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 计数 */
.m-counting ul li {
  float: left;
  font-size: 1.1rem;
  margin-right: 20px;
  position: relative;
}
.m-counting ul li::before {
  content: "|";
  position: absolute;
  left: -14px;
  top: -1px;
  display: block;
  width: 1px;
  height: 12px;
}
.m-counting ul li:first-child::before {
  display: none;
}
.m-counting {
}
</style>