<script setup lang="ts">
import GlobalFooter from '../components/GlobalFooter.vue'
import SectionTitle from '../components/SectionTitle.vue'
import AboutInfo from '@/components/About-Info.vue'
</script>
<template>
  <section class="serif">
    <section-title cn="历" en="about" class="title"/>
    <about-info class="about-info animate__animated">

    </about-info>
    <global-footer class="gf" />
  </section>
</template>

<style scoped lang="scss">
section {
  padding-top: 48px;
}
.title {
  margin: 96px 0;
}
.about-info {
  margin-bottom: 96px;
  animation: show_up;
  animation-duration: 1.2s;
}
@keyframes show_up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {

  }
}
</style>