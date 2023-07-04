<!-- 首页项目 item -->
<script setup lang="ts">
const workCoverDir = '/images/work-covers/small/'

interface WorkItem {
  id: string
  name: string
  platform: string[]
  category: string[]
}

withDefaults(defineProps<{
  item: WorkItem
  pageStyle?: string
}>(), {
  pageStyle: 'hp'
})
</script>

<template>
  <li class="work-item">
    <router-link :to="{ name: 'work.detail', params: {id: item.id} }">
      <div class="work-cover" :class="{ 'work-cover-hp': (pageStyle==='hp') }">
        <div class="high-light"></div>
        <picture>
          <source :srcset="workCoverDir + item.id + '.webp'" type="image/webp">
          <img :src="workCoverDir + item.id + '.jpg'" alt="work_cover" class="work-cover-image">
        </picture>
      </div>
      <div class="flex flex-col justify-end work-detail serif">
        <div class="work-title">{{ item.name }}</div>
        <div class="work-desc">
          <span class="work-platform-wrap">
            <span class="work-platform after-comma" v-for="p in item.platform">{{ p }}</span>
          </span>
          <span class="work-tag after-comma" v-for="c in item.category">{{ c }}</span>
        </div>
      </div>
    </router-link>
  </li>
</template>

<style scoped lang="scss">
$workCoverWidth: 28vw;
$workCoverMaxWidth: 360px;
$workCoverMaxHeight: 280px;

.work-item {
  cursor: pointer;
  .work-cover-image {
    transition: all .7s cubic-bezier(.3, 0, .2, 1);
  }

  .work-cover {
    position: relative;
    overflow: hidden;
  }
  .work-cover-hp {
    width: $workCoverWidth;
    max-width: $workCoverMaxWidth;
    @media (max-width: 740px) {
      width: $workCoverWidth * 1.5;
    }
    @media (max-width: 490px) {
      width: $workCoverWidth * 2.1;
    }
  }
  .work-detail {
    margin-top: 16px;
    width: 100%;

    .work-title {
      font-size: 18px;
      font-weight: 600;
    }

    .work-desc {
      width: 100%;
      font-size: 13px;
      opacity: .7;
    }

    .work-platform-wrap::after {
      content: '|';
      opacity: 0.5;
      margin: 0 4px;
      @media (max-width: 490px) {
        content: '\A';
        white-space: pre;
      }
    }
    @media (max-width: 490px) {
      .work-title {
        font-size: 16px;
      }

      .work-desc {
        font-size: 12px;
      }
    }
  }

  &:hover {
    .high-light {
      opacity: 1;
      transform: translate(0, 0);
    }
    .work-cover-image {
      transform: scale3d(1.05, 1.05, 1);
      transform-style: preserve-3d;
    }
  }
}
</style>
