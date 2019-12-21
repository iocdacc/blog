<template>
  <div class="m-list clear" :class="type">
    <ul v-if="mType.list">
      <li>
        <span class="date">2019-10-09</span>
        <span class="title">
          <router-link to="/archive">Systemd Linux管理工具（守护进程，开机自启动）</router-link>
        </span>
      </li>
    </ul>
    <ul v-if="mType.list2">
      <li>
        <span class="title">
          <a href>vsPlayAudio</a>:
        </span>
        <span class="explain">美观的音乐播放器</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "mList",
  props: {
    type: String
  },
  data:function(){
    let mType = {
      list:false,
      list2:false,
    }
    switch (this.type) {
      case "m-list2":
        mType.list2 = true
        break;
    
      default:
        mType.list = true
        break;
    }

    return {
      mType
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 列表 */
.m-list ul li {
  line-height: 1.8rem;
}
.m-list ul li a {
  position: relative;
}
.m-list ul li a::after {
  content: "";
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1px;
  background-color: #c9cacc;
}
.m-list ul li a:hover {
  color: #2bbc8a;
}
.m-list ul li a:hover::after {
  background-color: #2bbc8a;
}
.m-list ul li .date {
  color: #666;
  font-size: 1.2rem;
}
.m-list ul li .title {
  font-size: 1.2rem;
  margin: 0 0 0 16px;
}
.m-list ul li .explain {
  font-size: 1.2rem;
  margin: 0 5px 0 0;
}
.m-list2 ul li .title {
  margin: 0 5px 0 0;
}
</style>