<template>
  <div>
    <div class="g-main">
      <showText />
      <counting />
      <mTitle text="Archives" type="m-titleList" />
      <mList />
      <mTitle text="Projects" type="m-titleList" />
      <mList type="m-list2" />
    </div>
  </div>
</template>

<script>
import showText from "@/components/showText";
import counting from "@/components/counting";
import mTitle from "@/components/mTitle";
import mList from "@/components/mList";

export default {
  name: "home",
  components: {
    showText,
    counting,
    mTitle,
    mList
  }
};
</script>
