<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue"
import { inject } from '@vercel/analytics'
import WipeOverlay from '@/components/WipeOverlay.vue'
import GlobalHeader from '@/components/GlobalHeader.vue'
import { worksList, miscList } from '@/common/store'

// 载入 Works 数据
fetch('/data/works.json')
  .then((response) => response.json())
  .then((json) => worksList.value = json)

// 载入 Misc 数据
fetch('/data/misc.json')
  .then((response) => response.json())
  .then((json) => miscList.value = json)

inject()
</script>

<template>
  <SpeedInsights />
  <global-header />
  <wipe-overlay />
  <router-view v-slot="{Component}">
    <transition name="page-fade" mode="out-in">
      <component :is="Component" :key="$route.fullPath"></component>
    </transition>
  </router-view>
</template>

<style lang="scss">
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity .5s ease-in-out;
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

</style>
