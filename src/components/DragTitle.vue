<script setup lang="ts">
import { onMounted } from 'vue'
import isMobile from '@/common/is-mobile'
// import interact from 'interactjs'

defineProps<{ msg: string }>()

onMounted(async () => {
  if(!isMobile) {
    const interact = (await import('interactjs')).default
    interact('.resize-drag')
    .resizable({
      // resize from all edges and corners
      edges: { left: true, right: true, bottom: true, top: true },

      listeners: {
        move (event) {
          let target = event.target
          let x = (parseFloat(target.getAttribute('data-x')) || 0)
          let y = (parseFloat(target.getAttribute('data-y')) || 0)

          // update the element's style
          target.style.width = event.rect.width + 'px'
          target.style.height = event.rect.height + 'px'

          // translate when resizing from top or left edges
          x += event.deltaRect.left
          y += event.deltaRect.top

          target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)
        }
      },
      modifiers: [
        // keep the edges inside the parent
        interact.modifiers.restrictEdges({
          outer: 'parent'
        }),

        // minimum size
        interact.modifiers.restrictSize({
          min: { width: 100, height: 50 }
        })
      ],

      inertia: true
    })
    .draggable({
      listeners: {
        move (event) {
          let target = event.target
          // keep the dragged position in the data-x/data-y attributes
          let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
          let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

          // translate the element
          target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

          // update the posiion attributes
          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)
        }
      },
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true
        })
      ]
    })
  }
})

</script>

<template>
  <div class="flex items-center justify-center drag-title-wrap resize-drag animate__animated">
    <div class="drag-point-wrap" 
      style="top: -11px;left: -11px;cursor: nwse-resize;">
      <div class="drag-point"></div>
    </div>
    <div class="drag-point-wrap" 
      style="top: -11px;right: -11px;cursor: nesw-resize">
      <div class="drag-point"></div>
    </div>
    <div class="drag-point-wrap" 
      style="bottom: -11px;left: -11px;cursor: nesw-resize">
      <div class="drag-point"></div>
    </div>
    <div class="drag-point-wrap"
      style="bottom: -11px;right: -11px;cursor: nwse-resize;">
      <div class="drag-point"></div>
    </div>
    <div style="width: 100%; overflow: hidden;">
      <h1 class="serif drag-title">{{ msg }}</h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
$drag-point-size: 6px;

.drag-title-wrap {
  padding: 12px;
  position: relative;
  margin-top: 32px;
  width: 180px;
  border: 1px solid rgba($color: #fff, $alpha: 0.6);
  cursor: move;
  animation-delay: 1.2s;
  animation-name: title_expand;
  animation-duration: 1.5s;
  animation-timing-function: cubic-bezier(.6, 0, 0.4, 1);
  @media (max-width: 600px) {
    margin-top: 16px;
    transform: scale(.8);
  }
}
@keyframes title_expand {
  from {
    opacity: 0;
    width: 24px;
  }

  to {
    opacity: 1;
  }
}

.drag-point-wrap {
  position: absolute;
  padding: 8px;
  transition: transform 0.4s cubic-bezier(.6,0,.4,1);
  &:hover {
    transform: scale(2);
  }
}
.drag-point {
  width: $drag-point-size;
  height: $drag-point-size;
  background-color: white;
}
.drag-title {
  font-size: 20px;
  letter-spacing: 12px;
  margin-right: -12px;
  text-align: center;
  user-select: none;
  white-space: nowrap;
}
</style>
