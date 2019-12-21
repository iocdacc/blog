<template>
  <div>
    <div class="g-main">
      <mTag />
      <mTitle type="m-titleArchives" text="2019" />
      <mList />
    </div>
  </div>
</template>

<script>
import mTag from '@/components/mTag'
import mTitle from '@/components/mTitle'
import mList from '@/components/mList'

export default {
  name: "archives",
  components: {
    mTag,
    mTitle,
    mList,
  }
};
</script>
