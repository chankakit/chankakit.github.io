<script setup lang="ts">
interface MiscItem {
  type: string;
  cover: string;
  title: string;
  subtitle: string;
}
defineProps<{ 
  item: MiscItem 
}>()

</script>

<template>
  <div class="misc-item">
    <picture>
      <source :srcset="item.cover + '.webp'" type="image/webp">
      <img v-if="item.type == 'image'" :src="item.cover + '.jpg'" alt="misc_cover" />
    </picture>
    <video v-if="item.type == 'video'" :src="item.cover + '.mp4'" :poster="item.cover + '.gif'"
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
