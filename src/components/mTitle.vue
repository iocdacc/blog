<template>
  <div class="m-title" :class="type">
    <h1 v-if="mType.title" class="title">{{text}}</h1>
    <h1 v-if="mType.titleList" class="title"><a href="">{{text}}</a></h1>
  </div>
</template>

<script>
export default {
  name: "mTitle",
  props: {
    text: String,
    type: String
  },
  data:function(){
    let mType = {
      titleList:false,
      title:false,
    }
    switch (this.type) {
      case "m-titleList":
        mType.titleList = true
        break;

      case "m-titleArchives":
        mType.titleList = true
        break;
    
      default:
        mType.title = true
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
.m-title {
  float: left;
  width: 490px;
  margin-left: 20px;
}
.m-title .title {
  font-size: 2rem;
  color: #c9cacc;
  height: 32px;
  line-height: 32px;
}
.m-titleList {
  margin: 48px 0 16px 0;
  width: 100%;
  float: none;
}
.m-titleList .title a {
  color: #2bbc8a;
  font-weight: bold;
  font-size: 1.8rem;
}
.m-titleArchives {
  margin: 48px 0 16px 0;
  width: 100%;
  float: none;
}
.m-titleArchives .title a {
  color: #eee;
  font-weight: bold;
  font-size: 1.4rem;
}
</style>