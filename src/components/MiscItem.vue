<script setup lang="ts">
interface MiscItem {
  type: string,
  cover_webp: string,
  cover_jpg: string,
  video: string,
  v_cover: string
}
defineProps<{ 
  item: MiscItem 
}>()

</script>

<template>
  <div class="misc-item">
    <picture v-if="item.type == 'image'">
      <source :srcset="item.cover_webp" type="image/webp">
      <img :src="item.cover_jpg" alt="misc_cover" />
    </picture>
    <video v-if="item.type == 'video'" :src="item.video" :poster="item.v_cover"
      autoplay loop muted playsinline x5-playsinline preload="auto" />
  </div>
</template>

<style scoped lang="scss">
$miscCoverWidth: 28vw;
$miscCoverMaxWidth: 480px;
.misc-item {
  width: $miscCoverWidth;
  // height: calc($miscCoverWidth * 3 / 4);
  max-width: $miscCoverMaxWidth;
  max-height: calc($miscCoverMaxWidth * 3 /4);
  @media (max-width: 640px) {
    width: $miscCoverWidth * 1.6;
  }
}
</style>
