<template>
  <div>
    <div class="g-main">
      <mArticle />
    </div>
    <div class="g-topRightFixed">
        <mIcon />
        <mMenu type="m-menuIcon" />
    </div>
  </div>
</template>

<script>
import mIcon from '@/components/mIcon'
import mMenu from '@/components/mMenu'
import mArticle from '@/components/mArticle'

export default {
  name: "archive",
  components: {
    mIcon,
    mMenu,
    mArticle,
  }
};
</script>
