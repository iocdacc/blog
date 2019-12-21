<template>
  <div class="m-menu" :class="type">
    <ul class="clear">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/archives">Archives</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li>
        <a href="https://baidu.com">Github</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "mMenu",
  props: {
    type: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-menu {
  float: left;
  width: 490px;
  margin: 0 0 0 20px;
}
.m-menu ul li {
  float: left;
  font-size: 1.1rem;
  margin-right: 30px;
  position: relative;
}
.m-menu ul li::before {
  content: "";
  border-right: #2bbc8a 1px dotted;
  position: absolute;
  left: -16px;
  top: 3px;
  display: block;
  width: 1px;
  height: 12px;
}
.m-menu ul li:first-child::before {
  display: none;
}
.m-menu ul li a {
  color: #2bbc8a;
}
.m-menuFoot {
  float: right;
  width: auto;
  margin: 0;
}
.m-menuFoot ul li a {
  color: #666;
}
.m-menuFoot ul li::before {
  border-right: #666 1px dotted;
}
.m-menuIcon {
  float: right;
  width: auto;
  margin: 0;
}
</style>