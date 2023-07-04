<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { trOn } from '@/common/store'

const route = useRoute()

const halfDurationTime = ref(550) 

const transitionEnter = ref(false)
const transitionLeave = ref(false)
watch(() => route.path, ()=> {
  if( (!transitionLeave.value && !transitionEnter.value) && trOn.value) {
    transitionEnter.value = true
    setTimeout(()=>{
      transitionEnter.value = false
      transitionLeave.value = true
    }, halfDurationTime.value)

    setTimeout(()=>{
      transitionLeave.value = false
    }, halfDurationTime.value*2)
  }
  trOn.value = true
})

watch(() => transitionLeave.value, () => {
  if(!transitionLeave.value) {
    isShowWipe.value = true
  }
})

const isShowWipe = ref(true)
onMounted(() => {
  window.addEventListener("popstate", function() { 
    isShowWipe.value = false
  }, false)
})
</script>

<template>
  <div v-if="isShowWipe"
    class="overlay"
    :class="{ 't-on': transitionEnter || transitionLeave,
              'enter': transitionEnter,
              'leave': transitionLeave }">
  </div>
</template>

<style scoped lang="scss">
.overlay {
  display: block;
  position:fixed;
  width: 100vw;
  height: 1vh;
  background-color: #070708;
  transform: translateY(-1vh);
  z-index: 8;
  @media (max-width: 600px) {
    display: none;
  }
}
.overlay.t-on {
  transform-origin: top;
  transition: transform .5s cubic-bezier(0.6, 0, 0.2, 1);
}
.overlay.t-on.enter {
  transform: translateY(0px) scaleY(101);
}
.overlay.t-on.leave {
  transform: translateY(101vh) scaleY(0);
}
</style>
