<script setup lang="ts">
import GlobalFooter from '../components/GlobalFooter.vue'
import SectionTitle from '../components/SectionTitle.vue'
import AboutInfo from '@/components/About-Info.vue'
</script>
<template>
  <section class="serif">
    <section-title cn="历" en="about" class="title"/>
    <about-info class="about-info animate__animated">
      <div class="info-item">
        <div class="flex items-end info-subtitle">
          <div class="info-subtitle-cn">技能</div>
          <div class="info-subtitle-en">skills</div>
        </div>
        <div class="info-detail">
          <div class="flex info-detail-item">
            <span class="desc-text">还行</span>
            <div class="main-text">Figma, Sketch, After Effects</div>
          </div>
          <div class="flex info-detail-item">
            <span class="desc-text">碰过</span>
            <div class="main-text">Blender, Cinema 4D</div>
          </div>
        </div>
      </div>
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