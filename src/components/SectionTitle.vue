<script setup lang="ts">
import { onMounted } from 'vue'
defineProps<{
  cn: string,
  en: string
}>()

onMounted(() => {
  const sectionTitles = document.querySelectorAll('.section-title')
  const cb = function (entries: any) {
    entries.forEach( (entry:any) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('inview')
      }
    })
  }
  /** 观察器，用于观察元素是否进入显示区域
   * {threshold: 0.8} - 表示 进入 80% 时触发回调函数
   */
  const observer = new IntersectionObserver(cb, { threshold: .8 })
  // 把所有标题加入观察器中
  sectionTitles.forEach(item => {
    observer.observe(item)
  })
})
</script>

<template>
  <div class="sec-title-appear global-padding section-title">
    <h2 class="section-title-cn serif">{{ cn }}</h2>
    <h2 class="section-title-en">{{ en }}</h2>
  </div>
</template>
