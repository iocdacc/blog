<template>
  <div id="app">
    <div class="g-main g-mainHead clear" v-if="pathShow">
      <mLogo />
      <mTitle text="Iocdacc" />
      <mMenu />
    </div>
    <router-view />
    <div class="g-main g-mainFoot clear">
      <mMenu type="m-menuFoot" />
    </div>
  </div>
</template>

<script>
import mLogo from "./components/mLogo";
import mTitle from "./components/mTitle";
import mMenu from "./components/mMenu";

export default {
  name: "App",
  components: {
    mLogo,
    mTitle,
    mMenu
  },
  data: function() {
    return {
      pathShow:true
    };
  },
  watch: {
    $route(to) {
      switch (to.path) {
        case "/archive":
          this.pathShow = false
          break;
      
        default:
          this.pathShow = true
          break;
      }
    }
  }
};
</script>

<style>
body {
  background-color: #1d1f21;
}
.g-main {
  width: 560px;
  margin: 0 auto;
}
.g-mainHead {
  padding: 64px 0 0 0;
}
.g-mainFoot {
  margin: 128px auto 8px auto;
}
.g-topRightFixed {
  position: fixed;
  top: 30px;
  right: 30px;
}
</style>
